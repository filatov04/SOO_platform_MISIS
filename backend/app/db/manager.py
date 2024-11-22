import asyncio
import json
import string
from datetime import datetime
from os import getenv
from time import sleep, mktime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, desc, and_, func
from typing import List, Union, Optional, Dict
from sqlalchemy.exc import OperationalError as sqlalchemyOpError
from psycopg2 import OperationalError as psycopg2OpError
from passlib.hash import bcrypt
from shared.settings import app_settings

from schemas.models import (
    UserSchema,
    ViolationSchema,
    NoteSchema,
    UserRegisterSchema
)

from db.models import *

class DBManager:
    def __init__(self, log):
        # self.pg_user = getenv("PG_USER")
        # self.pg_pass = getenv("PG_PASS")
        # self.pg_host = getenv("PG_HOST")
        # self.pg_port = getenv("PG_PORT")
        # self.pg_db = getenv("PG_DB")
        self.pg_user = "postgres"
        self.pg_pass = "00000000"
        self.pg_host = "localhost"
        self.pg_port = 5432
        self.pg_db = "Misis_Kitties"
        
        self.log = log
        connected = False
        while not connected:
            try:
                self._connect()
            except (sqlalchemyOpError, psycopg2OpError):
                sleep(2)
            else:
                connected = True
        self._update_db()

    def __del__(self):
        """Close the database connection when the object is destroyed"""
        self._close()

    # region Connection setup
    def _connect(self) -> None:
        """Connect to the postgresql database"""
        self.engine = create_engine(
            f"postgresql+psycopg2://{self.pg_user}:{self.pg_pass}@{self.pg_host}:{self.pg_port}/{self.pg_db}",
            pool_pre_ping=True,
        )
        Base.metadata.bind = self.engine
        db_session = sessionmaker(bind=self.engine)
        self.session = db_session()

    def _close(self) -> None:
        """Closes the database connection"""
        self.session.close_all()

    def _recreate_tables(self) -> None:
        """Recreate tables in DB"""
        Base.metadata.drop_all(self.engine)
        Base.metadata.create_all(self.engine)

        self.session.add(Dorm(dorm_id = 1, name="Горняк-2", address="просп. 60-летия Октября, 11, Москва")) #TODO: вынести в init.sql
        self.session.commit()
        
        self.session.add_all([Room(dorm_id = 1, block_number = 808, room_number = 3), Room(dorm_id = 1, block_number = 810, room_number = 2)])
        self.session.commit()
        
        self.session.add(User(
                        first_name = "Ivan",
                        second_name = "Ivanov",
                        phone = "78005553535",
                        dorm_id = 1,
                        role = "soo_leader",
                        hashed_password = bcrypt.hash("example")
                    ))
        self.session.commit()
        

    def _update_db(self) -> None:
        """Create the database structure if it doesn't exist (update)"""
        # Create the tables if they don't exist
        Base.metadata.create_all(self.engine)

    # endregion ------------
    
    def user_exists(self, phone: str) -> bool:
        """Get user by email from the database"""
        return self.session.query(User).filter_by(phone=phone).first() is not None
    
    def add_user(self, data: UserRegisterSchema) -> bool:
        if self.user_exists(data.number):
            return False
        
        user = User(**data.dict(), created_at=datetime.now())
        self.session.add(user)
        self.session.commit()
        return True
    
    def get_user_by_phone(self, phone: str) -> Optional[User]:
        return self.session.query(User).filter_by(phone=phone).first()
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        return self.session.query(User).filter_by(user_id=user_id).first()
    
    def get_user_dorm(self, user_id: int) -> Optional[int]:
        user = self.session.query(User).filter_by(user_id=user_id).first()
        if user: 
            return user.dorm_id
        return None
    
    def add_violation(self, user_id: int, data: ViolationSchema):
        violation = Violation(
            user_id=user_id,
            **data.dict(),
            created_at=datetime.now()
        )
        self.session.add(violation)
        self.session.commit()
        
    def get_violations(self, dorm_id: int, floor: int): # TODO: add active param
        data = self.session.query(Violation, Room).join(Room, Violation.room_id == Room.room_id).filter(
            and_(Room.dorm_id == dorm_id, func.floor(Room.block_number / 100) == floor, Violation.deleted_at == None)).all()
        
        for el in data:
            print(el)
        return data
    
    def add_note(self, user_id: int, data: NoteSchema):
        note = Note(
            user_id=user_id,
            **data.dict(),
            created_at=datetime.now()
        )
        self.session.add(note)
        self.session.commit()
        
    def get_notes(self, dorm_id: int) -> Optional[List]: # TODO: add active param
        data = self.session.query(Note).filter(and_(Note.dorm_id == dorm_id, Note.deleted_at == None)).order_by(Note.created_at.desc()).all()
        return [{
            "room": note.room,
            "description": note.description,
            }
        for note in data
        ]
        
    def get_room_number(self, room_id: int) -> Optional[int]: #TODO: ???
        room = self.session.query(Room).filter_by(room_id=room_id).first()
        if room: 
            return room.room_number
        return None
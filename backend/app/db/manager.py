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
from sqlalchemy.schema import CreateTable
from psycopg2 import OperationalError as psycopg2OpError
from passlib.hash import bcrypt
from shared.settings import app_settings

from schemas.models import (
    UserSchema,
    ViolationSchema,
    NoteSchema,
    UserRegisterSchema,
    RoomSchema,
    FloorSchema,
    UnvalibalDutySchema
)

from db.models import *

class DBManager:
    def __init__(self, log):
        # self.pg_user = getenv("PG_USER")
        # self.pg_pass = getenv("PG_PASS")
        # self.pg_host = getenv("PG_HOST")
        # self.pg_port = getenv("PG_PORT")
        # self.pg_db = getenv("PG_DB")
        self.pg_user = "sso_user"
        self.pg_pass = "password"
        self.pg_host = "postgres"
        self.pg_port = 5432
        self.pg_db = "Misis_Kitties"
        # self.pg_user = "postgres"
        # self.pg_pass = "00000000"
        # self.pg_host = "localhost"
        # self.pg_port = 5432
        # self.pg_db = "Misis_Kitties"
        self.duty_limit = 8
        
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
        
        # for table in Base.metadata.sorted_tables:
        #     print(CreateTable(table).compile(self.engine))
        #     print()

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
        
        self.session.add(Dorms(name="Горняк-2", address="просп. 60-летия Октября, 11, Москва"))
        self.session.commit()
        
        self.session.add(Users(
                        first_name = "Ivan",
                        second_name = "Ivanov",
                        phone = "78005553535",
                        dorm_id = 1,
                        role = "soo_leader",
                        password = bcrypt.hash("example")
                    ))
        self.session.commit()
        
        self.session.add(Floors(dorm_id = 1, owner_id = 1, floor_number = 8))
        self.session.commit()
        
        self.session.add_all([Rooms(floor_id = 1, block_number = 808, room_number = 3), Rooms(floor_id = 1, block_number = 810, room_number = 2)])
        self.session.commit()     

    def _update_db(self) -> None:
        """Create the database structure if it doesn't exist (update)"""
        # Create the tables if they don't exist
        Base.metadata.create_all(self.engine)

    # endregion ------------
    
    def user_exists(self, phone: str) -> bool:
        return self.session.query(Users).filter(and_(Users.phone == phone, Users.deleted_at == None)).first() is not None
    
    def add_user(self, data: UserRegisterSchema) -> bool: # TODO: check deleted???
        user_in_db = self.session.query(Users).filter(and_(Users.phone == data.phone, Users.deleted_at == None)).first()
        if user_in_db is not None:
            return False
        user = Users(**data.dict())
        self.session.add(user)
        self.session.commit()
        return True
    
    def delete_user(self, user_number: str) -> bool:
        user = self.get_user_by_phone(user_number)
        if user is None:
            return False
        user.deleted_at = datetime.now()
        self.session.commit()
        return True
    
    def get_user_by_phone(self, phone: str) -> Optional[Users]:
        return self.session.query(Users).filter(and_(Users.phone == phone, Users.deleted_at == None)).first()
    
    def get_user_by_id(self, user_id: int) -> Optional[Users]:
        return self.session.query(Users).filter_by(user_id=user_id).first()
    
    def get_users_by_role(self, role: Role, dorm_id: int) -> List[UserSchema]:
        return [
            UserSchema(**user.__dict__)
            for user in self.session.query(Users).filter(and_(Users.role == role, Users.deleted_at == None, Users.dorm_id == dorm_id)).all()
        ]
        
    def get_user_dorm(self, user_id: int) -> Optional[int]:
        user = self.session.query(Users).filter_by(user_id=user_id).first()
        if user: 
            return user.dorm_id
        return None

    def get_floors(self, dorm_id: int) -> List[FloorSchema]:
        data = self.session.query(Floors, Users).join(Users, Floors.owner_id == Users.user_id).filter(Floors.dorm_id == dorm_id).order_by(Floors.floor_number).all()
        return [
            FloorSchema(
                **floor.__dict__,
                owner_first_name=user.first_name,
                owner_second_name=user.second_name,
                owner_third_name=user.third_name,
                owner_tg=user.tg,
                owner_phone=user.phone
            )
        for floor, user in data
        ]

    def get_rooms_with_violations(self, floor_id: int) -> List[RoomSchema]:
        rooms = self.session.query(Rooms).filter_by(floor_id=floor_id).order_by(Rooms.block_number).all()
        data = []
        for room in rooms:
            obj_room = RoomSchema(**room.__dict__)
            obj_room.violations = self.session.query(Violations).filter_by(room_id=room.room_id).order_by(Violations.created_at.desc()).all()
            data.append(obj_room)
            
        return data
    
    def add_violation(self, user_id: int, data: ViolationSchema):
        violation = Violations(
            user_id=user_id,
            **data.dict(),
        )
        self.session.add(violation)
        self.session.commit()
    
    def get_last_violations(self, dorm_id: int, limit: int) -> List[ViolationSchema]:
        data = self.session.query(Violations).filter(and_(Violations.dorm_id == dorm_id, Violations.deleted_at == None)).order_by(Violations.created_at.desc()).limit(limit).all()
        return [ViolationSchema(**violation.__dict__) for violation in data]
    
    def add_note(self, user_id: int, data: NoteSchema):
        note = Notes(
            user_id=user_id,
            **data.dict(),
            created_at=datetime.now()
        )
        self.session.add(note)
        self.session.commit()
        
    def get_notes(self, dorm_id: int) -> List: # TODO: add active param
        data = self.session.query(Notes).filter(and_(Notes.dorm_id == dorm_id, Notes.deleted_at == None)).order_by(Notes.created_at.desc()).all()
        return [{
            "note_id": note.note_id,
            "room": note.room,
            "description": note.description,
            "created_at": note.created_at
            }
        for note in data
        ]
    
    def add_duty(self, dorm_id: int, data: UnvalibalDutySchema) -> bool:
        check_user_duty = self.session.query(UnvalibalDuties).filter(and_(UnvalibalDuties.user_id == data.user_id, UnvalibalDuties.dorm_id == dorm_id)).first()
        if check_user_duty is not None:
            return False
        
        for date in data.dates:
            count_duty = self.session.query(UnvalibalDuties).filter(and_(UnvalibalDuties.dorm_id == dorm_id, UnvalibalDuties.duty_date == date)).count()  
            if count_duty > self.duty_limit:
                return False
        
            duty = UnvalibalDuties(
                user_id = data.user_id,
                dorm_id = dorm_id,
                duty_date = date,
                created_at = datetime.now()
            )
            self.session.add(duty)
            
        self.session.commit()
        return True
    
    def get_duty(self, dorm_id: int): # TODO: test
        data = self.session.query(UnvalibalDuties).filter_by(dorm_id = dorm_id).order_by(UnvalibalDuties.duty_date).all()
        return [
            {
                "user_id": duty.user_id,
                "dorm_id": duty.dorm_id,
                "duty_date": duty.duty_date,
                "created_at": duty.created_at
            }
            for duty in data
        ]
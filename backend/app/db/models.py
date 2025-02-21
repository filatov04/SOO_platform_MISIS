from sqlalchemy import (
    Column,
    Text,
    BigInteger,
    MetaData,
    DateTime,
    Numeric,
    String,
    JSON,
    Enum,
    ForeignKey,
    Boolean,
    UniqueConstraint
)
from sqlalchemy.orm import declarative_base, relationship
import enum


Base = declarative_base()
# Base.metadata = MetaData(schema="Kokoc")

class ViolationType(enum.Enum):
    drink_alcohol: str = 'drink_alcohol'
    passage_alcohol: str = 'passage_alcohol'
    keeping_alcohol: str = 'keeping_alcohol'
    fire_security: str = 'fire_security'
    electrical_security: str = 'electrical_security'
    noise_mode: str = 'noise_mode'
    guest_mode: str = 'guest_mode'
    unsanitation_block: str = 'unsanitation_block'
    unsanitation_room: str = 'unsanitation_room'
    unsanitation_general_place: str = 'unsanitation_general_place'
    break_mode: str = 'break_mode'
    block_thing: str = 'block_thing'

    
class DocumentType(enum.Enum):
    act: str = "act"
    warning: str = "warning"
    
class Role(enum.Enum):
    headman: str = "headman"
    operative: str = "operative"
    admin: str = "admin"
    soo_leader: str = "soo_leader"
    spectator: str = "spectator"
    
    
class Dorms(Base):
    __tablename__ = "Dorms"
    
    dorm_id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    
    user_dorm_rel = relationship("Users")
    floor_dorm_rel = relationship("Floors")
    note_dorm_rel = relationship("Notes")
    violation_dorm_rel = relationship("Violations")
    unvalibal_duties_dorm_rel = relationship("UnvalibalDuties")
    duties_dorm_rel = relationship("Duty")
    
    
class Floors(Base):
    __tablename__ = "Floors"
    
    floor_id = Column(BigInteger, primary_key=True, autoincrement=True)
    dorm_id = Column(BigInteger, ForeignKey("Dorms.dorm_id"), nullable=False)
    owner_id = Column(BigInteger, ForeignKey("Users.user_id"), nullable=False)
    floor_number = Column(BigInteger, nullable=False)
    renovated_date = Column(DateTime(), nullable=True, default=None)
   
    
class Rooms(Base):
    __tablename__ = "Rooms"
    
    room_id = Column(BigInteger, primary_key=True, autoincrement=True)
    floor_id = Column(BigInteger, ForeignKey("Floors.floor_id"), nullable=False)
    block_number = Column(BigInteger, nullable=False)
    room_number = Column(BigInteger, nullable=True, default=None)
    
    violation_room_rel = relationship("Violations")

    
class Users(Base):
    __tablename__ = "Users"

    user_id = Column(BigInteger, primary_key=True, autoincrement=True)
    first_name = Column(String(255), nullable=False)
    second_name = Column(String(255), nullable=False)
    third_name = Column(String(255), nullable=True)
    phone = Column(String(25), nullable=False)
    tg = Column(String(50), nullable=True)
    role = Column(Enum(Role), nullable=False)
    dorm_id = Column(BigInteger, ForeignKey("Dorms.dorm_id"), nullable=False)
    password = Column(String(255), nullable=False)
    deleted_at = Column(DateTime(), nullable=True, default=None)
    
    violation_user_rel = relationship("Violations")
    note_user_rel = relationship("Notes")
    floor_user_rel = relationship("Floors")
    unvalibal_duties_user_rel = relationship("UnvalibalDuties")
    duties_user_rel = relationship("Duty")


class Violations(Base):
    __tablename__ = "Violations"
    
    violation_id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey("Users.user_id"), nullable=False)
    document_type = Column(Enum(DocumentType), nullable=False)
    violator_name = Column(String(255), nullable=False)
    violation_type = Column(Enum(ViolationType), nullable=False)
    description = Column(Text, nullable=False)
    room_id = Column(BigInteger, ForeignKey("Rooms.room_id"), nullable=False)
    dorm_id = Column(BigInteger, ForeignKey("Dorms.dorm_id"), nullable=False)
    witness = Column(String(255), nullable=False)
    created_at = Column(DateTime(), nullable=False)
    deleted_at = Column(DateTime(), nullable=True, default=None)
    
    
class Notes(Base):
    __tablename__ = "Notes"
    
    note_id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey("Users.user_id"), nullable=False)
    dorm_id = Column(BigInteger, ForeignKey("Dorms.dorm_id"), nullable=False)
    room = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime(), nullable=False)
    deleted_at = Column(DateTime(), nullable=True, default=None) # TODO: подумать над автоматическим удалением

class Schedules(Base):
    __tablename__ = "Schedules"
    schedule_id = Column(BigInteger, primary_key=True, autoincrement=True)
    year = Column(BigInteger, nullable=False)
    month = Column(BigInteger, nullable=False)
    UniqueConstraint(year, month)
    duty_ref = relationship("Duty")
    
class UnvalibalDuties(Base):
    __tablename__ = "UnvalibalDuties"
    
    duty_id = Column(BigInteger, primary_key=True, autoincrement=True) # TODO: refs
    user_id = Column(BigInteger, ForeignKey("Users.user_id"), nullable=False)
    dorm_id = Column(BigInteger, ForeignKey("Dorms.dorm_id"), nullable=False)
    duty_date = Column(DateTime(), nullable=False) # TODO: fix fix fix with schedule
    created_at = Column(DateTime(), nullable=False)

class Duty(Base):
    __tablename__ = "Duty"
    
    duty_id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey("Users.user_id"), nullable=False)
    dorm_id = Column(BigInteger, ForeignKey("Dorms.dorm_id"), nullable=False)
    schedule_id = Column(BigInteger, ForeignKey("Schedules.schedule_id"), nullable=False)
    duty_day = Column(BigInteger, nullable=False)
    created_at = Column(DateTime(), nullable=False)

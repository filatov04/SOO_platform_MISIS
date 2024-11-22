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
)
from sqlalchemy.orm import declarative_base, relationship
import enum


Base = declarative_base()
# Base.metadata = MetaData(schema="Kokoc")

class ViolationType(enum.Enum):
    unsanitation: str = "unsanitation"
    alcohol_mode: str = "alcohol_mode"
    fire_security: str = "fire_security"
    electrical_security: str = "electrical_security"
    noise_mode: str = "noise_mode"
    guest_mode: str = "guest_mode"
    break_mode: str = "break_mode"
    block_thing: str = "block_thing"

    
class DocumentType(enum.Enum):
    act: str = "act"
    warning: str = "warning"
    
class Role(enum.Enum):
    headman: str = "headman"
    operative: str = "operative"
    admin: str = "admin"
    soo_leader: str = "soo_leader"
    spectator: str = "spectator"
    
class Dorm(Base):
    __tablename__ = "Dorm"
    
    dorm_id = Column(BigInteger, primary_key=True)
    name = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    
    user_dorm_rel = relationship("User")
    room_dorm_rel = relationship("Room")
    note_dorm_rel = relationship("Note")
    

class Room(Base):
    __tablename__ = "Room"
    
    room_id = Column(BigInteger, primary_key=True)
    dorm_id = Column(BigInteger, ForeignKey("Dorm.dorm_id"), nullable=False)
    block_number = Column(BigInteger, nullable=False)
    room_number = Column(BigInteger, nullable=True, default=None)
    
    violation_room_rel = relationship("Violation")

    
class User(Base):
    __tablename__ = "User"

    user_id = Column(BigInteger, primary_key=True)
    first_name = Column(String(255), nullable=False)
    second_name = Column(String(255), nullable=False)
    third_name = Column(String(255), nullable=True)
    phone = Column(String(25), nullable=False, unique=True)
    tg = Column(String(50), nullable=True)
    role = Column(Enum(Role), nullable=False)
    dorm_id = Column(BigInteger, ForeignKey("Dorm.dorm_id"), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    deleted_at = Column(DateTime(), nullable=True, default=None)
    
    violation_user_rel = relationship("Violation")
    note_user_rel = relationship("Note")
    

class Violation(Base):
    __tablename__ = "Violation"
    
    violation_id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey("User.user_id"), nullable=False)
    document_type = Column(Enum(DocumentType), nullable=False)
    violator_name = Column(String(255), nullable=False)
    violation_type = Column(Enum(ViolationType), nullable=False)
    description = Column(Text, nullable=False)
    room_id = Column(BigInteger, ForeignKey("Room.room_id"), nullable=False)
    witness = Column(String(255), nullable=False) # TODO: свидетель блять
    created_at = Column(DateTime(), nullable=False)
    deleted_at = Column(DateTime(), nullable=True, default=None)
    
    
class Note(Base):
    __tablename__ = "Note"
    
    note_id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey("User.user_id"), nullable=False)
    dorm_id = Column(BigInteger, ForeignKey("Dorm.dorm_id"), nullable=False)
    room = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime(), nullable=False)
    deleted_at = Column(DateTime(), nullable=True) # TODO: подумать над автоматическим удалением
    
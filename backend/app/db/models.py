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

class ViolationType(enum.Enum): # TODO: UPDATE
    smoke: str = "smoke"
    unsanitation: str = "unsanitation"
    alcohol: str = "alcohol"
    fire_security: str = "fire_security"
    ...
    
class DocumentType(enum.Enum):
    act: str = "act"
    warning: str = "warning"
    
    
class User(Base):
    __tablename__ = "user"

    user_id = Column(BigInteger, primary_key=True)
    name = Column(String(255), nullable=False)
    surname = Column(String(255), nullable=False)
    third_name = Column(String(255), nullable=True)
    number = Column(String(255), nullable=False, unique=True) # TODO: почта или номер тф
    tg = Column(String(255), nullable=True)
    login = Column(String(255), nullable=False, unique=True)
    hashed_password = Column(String(255), nullable=False)
    deleted_at = Column(DateTime(), nullable=True, default=None)
    
    violation_user_rel = relationship("Violation")
    note_user_rel = relationship("Note")
    
    

class Violation(Base):
    __tablename__ = "violation"
    
    violation_id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey("user.user_id"), nullable=False)
    document_type = Column(Enum(DocumentType), nullable=False)
    violators_name = Column(String(255), nullable=False) # TODO: нужно ли
    violation_type = Column(Enum(ViolationType), nullable=False)
    description = Column(Text, nullable=False)
    room = Column(String(255), nullable=False)
    created_at = Column(DateTime(), nullable=False)
    deleted_at = Column(DateTime(), nullable=True)
    

class Note(Base): # TODO: что содержат заметки?
    __tablename__ = "note"
    
    note_id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey("user.user_id"), nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime(), nullable=False)
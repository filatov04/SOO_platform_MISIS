import multiprocessing as mp

from pydantic import BaseSettings


class AppSettings(BaseSettings):
    pg_database: str = "db_misis"
    pg_host: str = "localhost"
    pg_port: int = 5432
    pg_username: str = "db_misis"
    pg_password: str = "db_misis"

    uvicorn_host: str = "localhost"
    uvicorn_port: int = 8000
    uvicorn_workers: int = 1 # mp.cpu_count() * 2
    uvicorn_log_level: str = "WARNING"
    
    jwt_secret: str = "secret"
    jwt_algorithm: str = "HS256"

    jwt_refresh_expire_time: int = 3600 * 48  # in seconds
    jwt_access_expire_time: int = 7200  # in seconds

    class Config:
        env_prefix = "misis_"
        env_file = ".env"


app_settings = AppSettings()

import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres123@localhost:5432/resume_analyzer"
)

engine = None
try:
    temp_engine = create_engine(DATABASE_URL)
    with temp_engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    engine = temp_engine
    print("Connected to PostgreSQL database successfully.")
except Exception as e:
    print(f"PostgreSQL connection failed ({e}). Falling back to SQLite database...")
    sqlite_url = "sqlite:///./resume_analyzer.db"
    engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
from app.database import engine
from app.models.resume import Base

Base.metadata.create_all(bind=engine)

print("Tables Created Successfully")
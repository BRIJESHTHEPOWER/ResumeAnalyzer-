from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from app.database import SessionLocal
from app.models.resume import Resume

from app.services.resume_parser import (
    extract_pdf_text,
    extract_docx_text
)

from app.services.extractor import (
    extract_email,
    extract_phone,
    extract_skills,
    extract_education,
    extract_experience,
    generate_suggestions
)

from app.services.ats import (
    calculate_ats_score
)

from app.services.resume_reviewer import (
    review_resume
)

from app.services.strengths import (
    detect_strengths
)

import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "app/uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@app.get("/")
def home():
    return {
        "message": "Backend Running"
    }


@app.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):

    # Save File
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as f:
        f.write(
            await file.read()
        )

    # Extract Text
    text = ""

    if file.filename.lower().endswith(".pdf"):
        text = extract_pdf_text(
            file_path
        )

    elif file.filename.lower().endswith(".docx"):
        text = extract_docx_text(
            file_path
        )

    else:
        return {
            "message": "Only PDF and DOCX files are supported"
        }

    # Extract Resume Information
    email = extract_email(text)

    phone = extract_phone(text)

    skills = extract_skills(text)

    education = extract_education(text)

    experience = extract_experience(text)

    suggestions = generate_suggestions(
        skills
    )

    # Professional ATS Score
    ats_score = calculate_ats_score(
        skills,
        education,
        experience,
        text
    )

    # Resume Review
    issues = review_resume(
        text
    )

    strengths = detect_strengths(
        skills,
        education,
        experience
    )

    # Save To PostgreSQL
    db = SessionLocal()

    new_resume = Resume(
        filename=file.filename,
        email=email,
        phone=phone,
        ats_score=ats_score
    )

    db.add(
        new_resume
    )

    db.commit()

    db.close()

    # Response
    return {
        "filename": file.filename,

        "message":
        "Resume Uploaded Successfully",

        "email": email,

        "phone": phone,

        "skills": skills,

        "skills_found":
        len(skills),

        "education":
        education,

        "experience":
        experience,

        "ats_score":
        ats_score,

        "strengths":
        strengths,

        "issues":
        issues,

        "suggestions":
        suggestions,

        "text":
        text[:1000]
    }
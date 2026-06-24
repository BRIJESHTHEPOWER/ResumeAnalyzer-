# ResumeAnalyzer — AI-Powered Resume Analysis System

A full-stack AI resume analysis application with a **FastAPI** backend and **React + Vite** frontend. Upload a PDF or DOCX resume and instantly get an ATS score, extracted skills, education, experience level, strengths, improvement suggestions, and a skills chart — all stored in PostgreSQL.

---

## Features

- **Resume Upload** — Supports PDF (pdfplumber) and DOCX (python-docx) file formats
- **ATS Score (0–100)** — Algorithmic scoring across skills, education, experience, projects, and contact info
- **Skills Extraction** — Detects 22 technical skills from resume text using keyword matching
- **Contact Extraction** — Regex-based email and phone number extraction
- **Education Detection** — Identifies degrees (BCA, MCA, B.Tech, MBA, PhD, etc.)
- **Experience Level** — Classifies as Fresher / Internship / Experienced
- **Resume Review** — Flags missing LinkedIn, GitHub, certifications, and short content
- **Strengths Detection** — Highlights strong skill set, education, and experience presence
- **AI Suggestions** — Recommends adding AWS, Docker, Git if missing; flags thin skill sets
- **Skills Chart** — Interactive Chart.js bar chart of detected skills in the React UI
- **PostgreSQL Storage** — Every uploaded resume is saved with filename, email, phone, ATS score
- **Swagger UI** — FastAPI auto-generates interactive API docs at `/docs`

---

## Project Structure

```
ResumeAnalyzer/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app — upload endpoint, orchestrates all services
│   │   ├── database.py          # SQLAlchemy engine + session (PostgreSQL)
│   │   ├── models/
│   │   │   └── resume.py        # Resume SQLAlchemy model (id, filename, email, phone, ats_score)
│   │   └── services/
│   │       ├── resume_parser.py # PDF (pdfplumber) and DOCX (python-docx) text extraction
│   │       ├── extractor.py     # Regex + keyword extraction: email, phone, skills, education, experience
│   │       ├── skills.py        # Master skills keyword list (22 technologies)
│   │       ├── ats.py           # ATS scoring algorithm (0–100)
│   │       ├── resume_reviewer.py # Issues checker: LinkedIn, GitHub, certs, content length
│   │       └── strengths.py     # Strengths detector based on skills, education, experience
│   └── create_tables.py         # Creates PostgreSQL tables via SQLAlchemy
└── frontend/
    ├── src/
    │   ├── App.jsx              # React Router — Home + ResumeUpload routes
    │   ├── pages/
    │   │   ├── Home.jsx         # Landing page
    │   │   ├── Resumeupload.jsx # Upload form + full analysis results dashboard
    │   │   ├── Dashboard.jsx    # Dashboard page
    │   │   ├── Analysis.jsx     # Analysis page
    │   │   └── Chatassistant.jsx # Chat assistant page
    │   ├── components/
    │   │   ├── Navbar.jsx       # Navigation bar
    │   │   ├── Hero.jsx         # Hero section
    │   │   ├── Features.jsx     # Features section
    │   │   ├── Footer.jsx       # Footer
    │   │   └── SkillChart.jsx   # Chart.js skills bar chart
    │   └── services/
    │       └── api.js           # Axios instance pointing to FastAPI backend
    ├── package.json
    └── vite.config.js
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, FastAPI |
| Database | PostgreSQL + SQLAlchemy |
| PDF Parsing | pdfplumber |
| DOCX Parsing | python-docx |
| Frontend | React 19, Vite, Tailwind CSS |
| Charts | Chart.js + react-chartjs-2 |
| HTTP Client | Axios |
| Routing | React Router DOM v7 |

---

## ATS Scoring Breakdown

| Category | Max Points | Condition |
|----------|-----------|-----------|
| Skills | 30 | 2 points per detected skill (capped at 30) |
| Education | 15 | Any recognized degree found |
| Experience | 20 | Any experience section detected |
| Projects | 20 | Keywords: project, developed, built, implemented, created, designed (3 pts each, max 20) |
| Contact Info | 15 | Email (7 pts) + phone number (8 pts) |
| **Total** | **100** | |

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- PostgreSQL running locally

---

### Backend Setup

#### 1. Navigate to backend

```bash
cd backend
```

#### 2. Create virtual environment and install dependencies

```bash
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install fastapi uvicorn sqlalchemy psycopg2-binary pdfplumber python-docx
```

#### 3. Configure database

Edit `app/database.py` and update the connection string:

```python
DATABASE_URL = "postgresql://your_user:your_password@localhost:5432/resume_analyzer"
```

Create the database in PostgreSQL:

```sql
CREATE DATABASE resume_analyzer;
```

#### 4. Create tables

```bash
python create_tables.py
```

#### 5. Start the backend

```bash
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000` — visit `http://localhost:8000/docs` for Swagger UI.

---

### Frontend Setup

#### 1. Navigate to frontend

```bash
cd frontend
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start the dev server

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API Reference

### `POST /upload`

Upload a resume file (PDF or DOCX) for analysis.

**Request:** `multipart/form-data` with field `file`

**Response:**
```json
{
  "filename": "resume.pdf",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "skills": ["Python", "React", "SQL", "Git"],
  "skills_found": 4,
  "education": ["B.Tech"],
  "experience": "Internship",
  "ats_score": 72,
  "strengths": ["Education section present", "Experience section present"],
  "issues": ["Missing LinkedIn profile", "No certifications found"],
  "suggestions": ["Consider learning AWS", "Consider learning Docker"],
  "text": "Resume preview (first 1000 chars)..."
}
```

---

## Backend Requirements

```
fastapi
uvicorn
sqlalchemy
psycopg2-binary
pdfplumber
python-docx
```

## Frontend Requirements

```
react
react-dom
react-router-dom
axios
tailwindcss
chart.js
react-chartjs-2
vite
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).

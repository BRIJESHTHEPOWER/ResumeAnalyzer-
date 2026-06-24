import re
from app.services.skills import SKILLS


# Extract Email
def extract_email(text):

    pattern = r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'

    match = re.search(pattern, text)

    return match.group() if match else "Not Found"


# Extract Phone Number
def extract_phone(text):

    pattern = r'\+?\d[\d\s\-]{8,15}'

    match = re.search(pattern, text)

    return match.group().strip() if match else "Not Found"


# Extract Skills
def extract_skills(text):

    found_skills = []

    text_lower = text.lower()

    for skill in SKILLS:

        if skill.lower() in text_lower:
            found_skills.append(skill)

    return list(set(found_skills))


# Extract Education
def extract_education(text):

    education_keywords = [
        "MCA",
        "BCA",
        "B.Tech",
        "BE",
        "B.E",
        "M.Tech",
        "MBA",
        "BSc",
        "MSc",
        "B.Com",
        "M.Com",
        "PhD"
    ]

    found = []

    text_upper = text.upper()

    for edu in education_keywords:

        if edu.upper() in text_upper:
            found.append(edu)

    return list(set(found))


# Extract Experience Level
def extract_experience(text):

    text_lower = text.lower()

    if "intern" in text_lower:
        return "Internship"

    if "years" in text_lower:
        return "Experienced"

    return "Fresher"


# Generate Suggestions
def generate_suggestions(skills):

    suggestions = []

    if "AWS" not in skills:
        suggestions.append("Consider learning AWS")

    if "Docker" not in skills:
        suggestions.append("Consider learning Docker")

    if "Git" not in skills:
        suggestions.append("Add Git version control skills")

    if len(skills) < 5:
        suggestions.append("Add more technical skills")

    return suggestions
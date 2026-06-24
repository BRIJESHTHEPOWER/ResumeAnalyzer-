def calculate_ats_score(
    skills,
    education,
    experience,
    text
):
    score = 0

    # Skills Score (30)
    skill_score = min(len(skills) * 2, 30)
    score += skill_score

    # Education Score (15)
    if education:
        score += 15

    # Experience Score (20)
    if experience:
        score += 20

    # Projects Score (20)
    project_keywords = [
        "project",
        "developed",
        "built",
        "implemented",
        "created",
        "designed"
    ]

    project_score = 0

    text_lower = text.lower()

    for keyword in project_keywords:
        if keyword in text_lower:
            project_score += 3

    score += min(project_score, 20)

    # Contact Information Score (15)
    if "@" in text:
        score += 7

    if any(char.isdigit() for char in text):
        score += 8

    return min(score, 100)
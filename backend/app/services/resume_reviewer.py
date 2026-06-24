def review_resume(text):

    issues = []

    text_lower = text.lower()

    if "linkedin.com" not in text_lower:
        issues.append(
            "Missing LinkedIn profile"
        )

    if "github.com" not in text_lower:
        issues.append(
            "Missing GitHub profile"
        )

    if "certification" not in text_lower:
        issues.append(
            "No certifications found"
        )

    if "internship" not in text_lower:
        issues.append(
            "No internship experience found"
        )

    if len(text) < 1500:
        issues.append(
            "Resume content is too short"
        )

    return issues
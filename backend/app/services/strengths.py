def detect_strengths(
    skills,
    education,
    experience
):

    strengths = []

    if len(skills) >= 8:
        strengths.append(
            "Strong technical skill set"
        )

    if education:
        strengths.append(
            "Education section present"
        )

    if experience:
        strengths.append(
            "Experience section present"
        )

    return strengths
from backend.ai_analyzer import ResumeAnalysis


def validate_analysis(analysis):

    if not isinstance(analysis, ResumeAnalysis):
        return False

    if not 0 <= analysis.score <= 100:
        return False

    if not analysis.profile_summary:
        return False

    if not isinstance(analysis.strengths, list):
        return False

    if not isinstance(analysis.areas_for_improvement, list):
        return False

    if not isinstance(analysis.missing_skills_or_sections, list):
        return False

    if not isinstance(analysis.suggestions, list):
        return False

    return True
import os
from typing import List

from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel, Field


load_dotenv()


class ResumeAnalysis(BaseModel):
    score: int = Field(ge=0, le=100)
    profile_summary: str
    strengths: List[str]
    areas_for_improvement: List[str]
    missing_skills_or_sections: List[str]
    suggestions: List[str]


api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


def analyze_resume(resume_text):

    prompt = f"""
Analyze the following resume.

IMPORTANT RULES:
- Analyze ONLY information available in the resume.
- Do not invent or assume candidate information.
- Do not add skills, experience, education, achievements,
  certifications, or qualifications that are not present.
- Give constructive and realistic feedback.

Resume:

{resume_text}
"""

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": ResumeAnalysis.model_json_schema()
        }
    )

    analysis = ResumeAnalysis.model_validate_json(
        interaction.output_text
    )

    return analysis
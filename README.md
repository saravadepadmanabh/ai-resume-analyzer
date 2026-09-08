# AI Resume Analyzer

An AI-powered web application that analyzes a user's resume and provides structured feedback, including a resume score, candidate summary, strengths, areas for improvement, missing skills or sections, and suggestions.

## Features

* Upload resumes in PDF and DOCX formats.
* Extract readable text from the uploaded resume.
* Analyze the resume using the Gemini AI API.
* Generate a resume score out of 100.
* Provide candidate profile summary.
* Identify key strengths.
* Identify areas for improvement.
* Identify missing skills or resume sections.
* Provide suggestions to improve the resume.
* Validate the AI response before displaying the results.
* Handle invalid files, unreadable files, API quota errors, and unexpected errors.

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Python
* FastAPI
* Uvicorn

### Resume Text Extraction

* PyMuPDF for PDF files
* python-docx for DOCX files

### AI

* Google Gemini API
* Google GenAI Python SDK
* Pydantic for structured AI response validation

## Project Structure

```text
ai-resume-analyzer/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── main.py
│   ├── pdf_parser.py
│   ├── docx_parser.py
│   ├── ai_analyzer.py
│   ├── validator.py
│   ├── test_gemini.py
│   ├── test_validator.py
│   └── requirements.txt
│
├── .env
├── .gitignore
└── README.md
```

## Project Setup and Installation

### 1. Clone the repository


git clone <your-github-repository-url>
cd ai-resume-analyzer


### 2. Create and activate a virtual environment

python -m venv venv


Windows:
venv\Scripts\activate


### 3. Install dependencies

pip install -r backend/requirements.txt


### 4. Configure the Gemini API key

Create a `.env` file in the project root:
GEMINI_API_KEY=your_api_key_here


The `.env` file is excluded from Git using `.gitignore`.

### 5. Start the backend

From the project root:
uvicorn backend.main:app --reload


The backend runs at:
http://127.0.0.1:8000


### 6. Run the frontend

Open `frontend/index.html` using a local web server.

## Application Architecture / Flow

The application consists of a simple frontend, FastAPI backend, resume text extraction modules, AI analysis module, and response validation.


Frontend
   ↓
Upload Resume
   ↓
FastAPI Backend
   ↓
Validate File Type
   ↓
Extract Resume Text
   ├── PDF  → PyMuPDF
   └── DOCX → python-docx
   ↓
Send Extracted Text to Gemini AI
   ↓
Validate AI Response
   ↓
Return Structured Analysis
   ↓
Display Results in Frontend


## AI Model Used

The application uses **Gemini 3.6 Flash** through the Google GenAI Python SDK.

The AI response is requested in a structured JSON format containing:

* Score
* Profile summary
* Strengths
* Areas for improvement
* Missing skills or sections
* Suggestions

Pydantic is used to validate the structure and score range of the AI response.

## Main Prompt Used

The main prompt instructs the AI to analyze only the information available in the uploaded resume.


Analyze the following resume.

IMPORTANT RULES:
- Analyze ONLY information available in the resume.
- Do not invent or assume candidate information.
- Do not add skills, experience, education, achievements,
  certifications, or qualifications that are not present.
- Give constructive and realistic feedback.

Resume:

{resume_text}


The application also defines a structured response schema so that the AI returns the required fields.

## AI Tools Used During Development

AI tools were used as development assistance:

* **ChatGPT:** Used for approach planning, project structure and hierarchy, implementation guidance, code building, debugging, and understanding the implementation.
* **Claude.ai:** Used mainly for frontend development and UI code building.
* **Cursor AI:** Used for code development and additional feature implementation.

AI-generated code and suggestions were manually reviewed rather than being used without verification.

## Manual Verification and Corrections

The implementation was manually reviewed and tested during development.

The following areas were verified or corrected manually:

* PDF text extraction.
* DOCX text extraction.
* File type validation.
* Gemini API integration.
* Structured AI response.
* AI response validation.
* Resume score range validation.
* Frontend result display.
* Loading state during analysis.
* Handling of unreadable resume files.
* Handling of Gemini API quota/rate-limit errors.
* Handling of unexpected backend errors.
* Frontend error alerts.
* PDF and DOCX upload functionality.

## Limitations

* The application depends on the Gemini API for AI analysis.
* API quota or rate limits can prevent analysis.
* Image-based or scanned resumes may not produce readable text without OCR.
* The quality of feedback depends on the quality and completeness of the resume text extracted.
* The current application does not provide job-description matching.

## Testing

The application was tested with:

* Valid PDF resumes.
* Valid DOCX resumes.
* No file selected.
* Unsupported file types.
* Unreadable files.
* Gemini API quota errors.
* Backend connection errors.
* AI response validation.

The complete application flow was verified:

**Upload Resume → Extract Text → Send to AI → Validate Response → Display Results**

## Live Demo

**Live Application:** [https://ai-resume-analyzer-1-2idy.onrender.com/]

> **Note:** The application uses the Gemini API for resume analysis. The API may have usage or quota limits. If the application stops generating analysis because the API quota has been reached, please contact **[padmanabhsaravade@gmail.com](mailto:padmanabhsaravade@gmail.com)** to request a new API key and continue using the application.


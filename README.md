# Veda AI – Automated Answer Sheet Evaluation System

An AI-powered web application that automatically evaluates student answer sheets by extracting questions from a question paper, mapping answers from a handwritten or typed answer sheet, and generating scores with feedback using Google's Gemini AI.

## Live Demo

### Frontend
[Add your Vercel URL here]

### Backend API
https://veda-ai-assignment-m87u.onrender.com

---

## Features

### Question Paper Analysis
- Extracts text from uploaded PDF question papers
- Automatically identifies and extracts questions
- Preserves question numbering and structure
- Supports sub-questions such as 11(a), 11(b), etc.

### Answer Sheet Processing
- Extracts text from student answer sheets
- Maps answers to corresponding questions
- Handles answers written out of order
- Detects unanswered questions

### AI Evaluation
- Evaluates each answer using Gemini AI
- Generates:
  - Score
  - Maximum score
  - Detailed feedback
- Calculates:
  - Total score
  - Average score
  - Final grade

### Visual Review
- PDF preview support
- Answer sheet page rendering
- Question-wise answer navigation

---

## Tech Stack

### Frontend
- Next.js
- TypeScript
- React
- Tailwind CSS

### Backend
- FastAPI
- Python

### AI
- Google Gemini API

### PDF Processing
- PyMuPDF

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## System Architecture

```text
Question Paper PDF
          |
          v
   Text Extraction
          |
          v
 Gemini Question Parser
          |
          v
   Extract Questions
          |
          v

Answer Sheet PDF
          |
          v
   Text Extraction
          |
          v
 Gemini Answer Mapper
          |
          v
 Match Answers
          |
          v
 Gemini Evaluator
          |
          v
 Score + Feedback
          |
          v
 Frontend Dashboard
```

---

## Project Structure

```text
veda-ai-assignment/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── uploads/
│   └── services/
│       ├── extractor.py
│       ├── gemini_service.py
│       ├── evaluator.py
│       ├── answer_mapper.py
│       ├── pdf_to_images.py
│       └── question_extractor.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/vikas1512/veda-ai-assignment.git
cd veda-ai-assignment
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

## API Endpoints

### Health Check

```http
GET /
```

Response:

```json
{
  "status": "working"
}
```

---

### Upload Files

```http
POST /upload
```

Form Data:

```text
question : PDF File
answer   : PDF File
```

Response:

```json
{
  "mapped_answers": [],
  "page_images": [],
  "answer_pdf_url": "",
  "total_score": 0,
  "max_score": 0,
  "average_score": 0,
  "grade": "A"
}
```

---

## Evaluation Workflow

1. Upload Question Paper PDF
2. Upload Answer Sheet PDF
3. Extract text from both documents
4. Identify questions using Gemini
5. Map answers to questions
6. Evaluate each answer
7. Generate scores and feedback
8. Display results in dashboard

---

## Future Improvements

- OCR support for handwritten answer sheets
- Multi-student batch evaluation
- Teacher dashboard
- Export results to Excel/PDF
- Authentication and user management
- Rubric-based grading
- Analytics and performance tracking

---

## Challenges Solved

- PDF text extraction
- AI-based question detection
- Question-answer mapping
- Automated grading
- PDF rendering and preview
- Full-stack deployment
- Frontend-backend integration

---

## Author

**Yuvapriya N**

GitHub: https://github.com/vikas1512

---

## License

This project was developed as part of an AI assignment and is intended for educational and demonstration purposes.

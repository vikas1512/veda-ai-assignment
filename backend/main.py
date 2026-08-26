from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from services.extractor import extract_text_from_pdf
from services.gemini_service import (
    extract_questions_with_gemini,
    map_answers_with_gemini
)
from services.pdf_to_images import pdf_to_images
from services.answer_mapper import map_answers
from services.evaluator import evaluate_answer

import os
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app = FastAPI()

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)
# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "status": "working"
    }


@app.get("/test-gemini")
def test_gemini():

    sample_text = """
    1. What is Artificial Intelligence?

    2. Explain Machine Learning.

    11(a). Explain DNS.

    11(b). Explain DHCP.
    """

    questions = extract_questions_with_gemini(
        sample_text
    )

    return {
        "questions": questions
    }


@app.get("/test-pdf")
def test_pdf():

    text = extract_text_from_pdf(
        "uploads/question_paper.pdf"
    )

    return {
        "text": text[:3000]
    }


@app.post("/upload")
async def upload_files(
    question: UploadFile = File(...),
    answer: UploadFile = File(...)
):

    # Save Question Paper
    question_path = os.path.join(
        UPLOAD_DIR,
        question.filename
    )

    with open(question_path, "wb") as f:
        f.write(await question.read())

    # Save Answer Sheet
    answer_path = os.path.join(
        UPLOAD_DIR,
        answer.filename
    )

    with open(answer_path, "wb") as f:
        f.write(await answer.read())

    print("✅ Files saved")

    # Extract Question Paper Text
    question_text = extract_text_from_pdf(
        question_path
    )

    # Extract Answer Sheet Text
    answer_text = extract_text_from_pdf(
        answer_path
    )

    print("✅ Text extraction complete")

    # Extract Questions
    questions = extract_questions_with_gemini(
        question_text
    )

    print(
        f"✅ {len(questions)} questions extracted"
    )

    # Map Answers
    mapped_answers = map_answers_with_gemini(
        questions,
        answer_text
    )
    evaluated_results = []

    for item in mapped_answers:

        evaluation = evaluate_answer(
            item["question_text"],
            item["answer_text"]
        )

        item["score"] = evaluation["score"]
        item["max_score"] = evaluation["max_score"]
        item["feedback"] = evaluation["feedback"]

        evaluated_results.append(item)

    total_score = sum(
    item["score"] for item in mapped_answers)

    max_score = sum(
            item["max_score"]
            for item in mapped_answers
        )

    average_score = (
    round(total_score / len(mapped_answers), 2)
    if mapped_answers
    else 0
)

    print(
        f"✅ {len(mapped_answers)} answers mapped"
    )
    if average_score >= 9:
        grade = "A+"
    elif average_score >= 8:
        grade = "A"
    elif average_score >= 7:
        grade = "B"
    elif average_score >= 6:
        grade = "C"
    else:
        grade = "Needs Improvement"

    page_images = pdf_to_images(answer_path)

    page_images = [
    path.replace("\\", "/") for path in page_images
    ]
    answer_pdf_url = f"/uploads/{answer.filename}"
    return {
    "mapped_answers": evaluated_results,
    "page_images": page_images,
    "answer_pdf_url": f"/uploads/{answer.filename}",
    "total_score": total_score,
    "max_score": max_score,
    "average_score": average_score,
    "grade": grade
}


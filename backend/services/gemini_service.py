import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def extract_questions_with_gemini(text):

    prompt = f"""
You are an exam paper parser.

Extract all questions from the question paper.

Rules:
1. Preserve question numbering exactly.
2. Preserve original order.
3. Treat 11(a) and 11(b) as separate questions.
4. Return ONLY valid JSON.
5. No markdown.
6. No explanation.

Format:

[
  {{
    "question_number": "1",
    "question_text": "What is AI?"
  }}
]

Question Paper:

{text}
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    result = response.text.strip()

    result = result.replace(
        "```json",
        ""
    )

    result = result.replace(
        "```",
        ""
    )

    result = result.strip()

    try:
        return json.loads(result)
    except Exception:
        return []

def map_answers_with_gemini(
    questions,
    answer_text
):

    prompt = f"""
You are an answer sheet parser.

Questions:

{json.dumps(questions, indent=2)}

Student Answer Sheet:

{answer_text}

Task:

For each question:

1. Find the student's answer.
2. Match answers even if written out of order.
3. Match subquestions like 11(a), 11(b).
4. If unanswered, return empty string.
5. Return ONLY valid JSON.

Format:

[
  {{
    "question_number":"1",
    "question_text":"...",
    "answer_text":"..."
  }}
]
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    result = response.text.strip()

    result = result.replace("```json", "")
    result = result.replace("```", "")

    try:
        return json.loads(result)
    except:
        return []
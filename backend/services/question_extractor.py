import json
from services.gemini_service import client


def extract_questions(question_text):
    prompt = f"""
You are an exam paper parser.

Extract ALL questions from the question paper.

Rules:
1. Preserve original order.
2. Preserve numbering exactly.
3. Treat subparts separately.
   Example:
   11(a)
   11(b)

4. Return ONLY valid JSON.

Output format:

[
  {{
    "question_number": "1",
    "question_text": "What is AI?"
  }},
  {{
    "question_number": "11(a)",
    "question_text": "Explain DNS"
  }}
]

Question Paper:

{question_text}
"""

    response = client.models.generate_content(
    model="gemini-3.5-flash-lite",
    contents=prompt
)

    text = response.text.strip()

    # Remove markdown if Gemini adds it
    text = text.replace("```json", "")
    text = text.replace("```", "")

    return json.loads(text)
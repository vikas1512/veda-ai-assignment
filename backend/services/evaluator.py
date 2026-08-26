import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def evaluate_answer(question, answer):

    if not answer or answer.strip() == "":
        return {
            "score": 0,
            "max_score": 10,
            "feedback": "Question not answered."
        }

    prompt = f"""
You are an experienced examiner.

Evaluate the student's answer.

Question:
{question}

Student Answer:
{answer}

Rules:
1. Score between 0 and 10.
2. Be fair.
3. Give concise feedback.
4. Return ONLY JSON.

Format:

{{
  "score": 8,
  "max_score": 10,
  "feedback": "Good answer but missing examples."
}}
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
        return {
            "score": 0,
            "max_score": 10,
            "feedback": "Evaluation failed"
        }
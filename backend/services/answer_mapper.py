import re


def map_answers(answer_text, questions):

    mapped_answers = []

    for question in questions:

        q_no = question["question_number"]

        pattern = rf"{re.escape(q_no)}[\).\s]+(.*?)(?=\n\d+[\).\s]|\Z)"

        match = re.search(
            pattern,
            answer_text,
            re.DOTALL
        )

        answer = ""

        if match:
            answer = match.group(1).strip()

        mapped_answers.append({
            "question_number": q_no,
            "question_text": question["question_text"],
            "answer_text": answer
        })

    return mapped_answers
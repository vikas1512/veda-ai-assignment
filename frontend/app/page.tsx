"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import UploadCard from "@/components/UploadCard";
import axios from "axios";

interface MappedAnswer {
  question_number: string;
  question_text: string;
  answer_text: string;
  score?: number;
  max_score?: number;
  feedback?: string;
}

export default function Home() {
  const [questionFile, setQuestionFile] =
    useState<File | null>(null);

  const [answerFile, setAnswerFile] =
    useState<File | null>(null);

  const [mappedAnswers, setMappedAnswers] =
    useState<MappedAnswer[]>([]);

  const [pageImages, setPageImages] =
    useState<string[]>([]);

  const [totalScore, setTotalScore] =
    useState(0);

  const [maxScore, setMaxScore] =
    useState(0);

  const [selectedQuestion, setSelectedQuestion] =
    useState<number | null>(null);
  const [averageScore, setAverageScore] =
    useState(0);

  const [grade, setGrade] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [pdfUrl, setPdfUrl] =
    useState("");
  const [status, setStatus] =
    useState("");

  const canStart =
    questionFile && answerFile;

  const getGradeColor = (
    grade: string
  ) => {
    switch (grade) {
      case "A+":
      case "A":
        return "text-green-600";

      case "B+":
      case "B":
        return "text-orange-500";

      case "C+":
      case "C":
        return "text-yellow-500";

      default:
        return "text-red-500";
    }
  };
  
  const uploadFiles = async () => {
    if (!questionFile || !answerFile) {
      console.log("Files missing");
      return;
    }

    setLoading(true);
    setStatus("Uploading files...");

    const formData = new FormData();

    formData.append(
      "question",
      questionFile
    );

    formData.append(
      "answer",
      answerFile
    );

    try {
      setStatus("Extracting questions...");

      setStatus("Mapping answers...");

      const response = await axios.post(
        "https://veda-ai-assignment-m87u.onrender.com/upload",
        formData
      );

      setStatus("Evaluating answers...");

      console.log(
        "SUCCESS:",
        response.data
      );

      setStatus("Generating report...");

      setMappedAnswers(
        response.data.mapped_answers || []
      );
      if (
  response.data.mapped_answers &&
  response.data.mapped_answers.length > 0
) {
  setSelectedQuestion(0);
}
      setPageImages(
        response.data.page_images || []
      );
      setTotalScore(
        response.data.total_score || 0
      );

      setMaxScore(
        response.data.max_score || 0
      );

      setAverageScore(
        response.data.average_score || 0
      );

      setGrade(
        response.data.grade || ""
      );
      setPdfUrl(
        response.data.answer_pdf_url || ""
    );
    alert("Evaluation completed successfully!");
    } catch (error) {
  console.error(
    "UPLOAD ERROR:",
    error
  );

  alert(
    "Failed to process files. Please try again."
  );

  setStatus("Processing failed");
} finally {
      setLoading(false);
      setStatus("");
    }
  };

  return (
    <main className="flex min-h-screen bg-[#f5f5f5]">
      <Sidebar />

      <div className="flex-1 p-4">
        <Topbar />
      


        <div className="flex flex-col items-center min-h-[80vh]">

          <h1 className="text-[64px] font-bold leading-tight text-center mt-8 text-black">
            Upload{" "}
            <span className="bg-[#FFE6D8] px-2 rounded-lg text-[#FF5A1F]">
              Question Paper & Answer Sheets
            </span>
          </h1>

          <p className="mt-4 text-gray-800">
            Upload both files to get started
          </p>

          <div className="mt-12 flex gap-8 text-black">
            <UploadCard
              title="Upload Question Paper"
              file={questionFile}
              onChange={setQuestionFile}
            />

            <UploadCard
              title="Upload Answer Sheet"
              file={answerFile}
              onChange={setAnswerFile}
            />
          </div>

          <button
            disabled={!canStart || loading}
            onClick={uploadFiles}
            className={`
              mt-10
              px-8
              py-3
              rounded-full
              text-white
              font-medium
              transition
              ${
                canStart
                  ? "bg-black hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            {loading
  ? "AI Evaluating Answer Sheet..."
  : "Start Mapping →"}
          </button>

          {loading && (
            <div className="mt-6 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />

              <p className="mt-4 text-orange-500 font-semibold">
                {status}
              </p>
            </div>
          )}

          {mappedAnswers.length > 0 && (
  <div className="w-full max-w-7xl mt-10 grid grid-cols-12 gap-6 pb-20">

    {/* LEFT SIDE - QUESTIONS */}

    <div className="col-span-4 bg-white rounded-xl border shadow h-[900px] overflow-y-auto">

      <div className="sticky top-0 bg-white border-b p-4">
        <h2 className="text-xl font-bold text-black">
          Questions
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
    {mappedAnswers.length}
  </span>
        </h2>
      </div>

      <div className="p-4 space-y-3">

        {mappedAnswers.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedQuestion(index)}
            className={`w-full text-left p-4 rounded-lg border transition
              ${
                selectedQuestion === index
                  ? "bg-green-100 border-green-500"
                  : "bg-white hover:bg-gray-50"
              }`}
          >
            <p className="font-bold text-orange-500">
              Q{item.question_number}
            </p>

            <p className="text-sm text-gray-700 mt-2">
              {item.question_text}
            </p>
          </button>
        ))}

      </div>
    </div>

    {/* RIGHT SIDE - PDF */}

    <div className="col-span-8">
        <div className="w-full max-w-7xl mt-8 mb-4">

  <div className="bg-white border rounded-xl shadow p-6 flex justify-between items-center">

    <div>
      <p className="text-gray-500">
        Total Score
      </p>

      <p className="text-3xl font-bold text-black">
        {totalScore} / {maxScore}
      </p>
    </div>

    <div>
      <p className="text-gray-500">
        Average Score
      </p>

      <p className="text-3xl font-bold text-black">
        {averageScore}
      </p>
    </div>

    <div>
      <p className="text-gray-500">
        Grade
      </p>

      <p
        className={`text-3xl font-bold ${getGradeColor(
          grade
        )}`}
      >
        {grade}
      </p>
    </div>

  </div>

</div>
      <div className="bg-white rounded-xl border shadow p-6 min-h-[900px]">

        {selectedQuestion !== null ? (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-black">
                Question {
                  mappedAnswers[selectedQuestion]
                    .question_number
                }
              </h2>

              <p className="text-gray-700 mt-2">
                {
                  mappedAnswers[selectedQuestion]
                    .question_text
                }
              </p>
            </div>

            {/* GREEN HIGHLIGHT BOX */}

            <div className="bg-green-100 border-2 border-green-500 rounded-xl p-5 mb-6">

              <h3 className="font-bold text-green-800 mb-2">
                Highlighted Answer
              </h3>

              <p className="text-gray-900 whitespace-pre-wrap">
                {
                  mappedAnswers[selectedQuestion]
                    .answer_text
                }
              </p>

            </div>
                {/* EVALUATION */}

<div className="bg-white border rounded-xl p-5 mb-6 shadow-sm">

  <h3 className="font-bold text-lg text-black mb-4">
    Evaluation
  </h3>

  <div className="grid grid-cols-3 gap-4 mb-5">

    <div className="bg-blue-50 border rounded-lg p-4">
      <p className="text-sm text-gray-500">
        Score
      </p>

      <p className="text-2xl font-bold text-blue-600">
        {mappedAnswers[selectedQuestion]?.score ?? 0}
      </p>
    </div>

    <div className="bg-green-50 border rounded-lg p-4">
      <p className="text-sm text-gray-500">
        Max Score
      </p>

      <p className="text-2xl font-bold text-green-600">
        {mappedAnswers[selectedQuestion]?.max_score ?? 0}
      </p>
    </div>

    <div className="bg-orange-50 border rounded-lg p-4">
      <p className="text-sm text-gray-500">
        Percentage
      </p>

      <p className="text-2xl font-bold text-orange-600">
        {(
          (
            (mappedAnswers[selectedQuestion]?.score ?? 0) /
            (mappedAnswers[selectedQuestion]?.max_score ?? 1)
          ) * 100
        ).toFixed(0)}
        %
      </p>
    </div>

  </div>

  <div className="bg-gray-50 border rounded-lg p-4">

    <p className="font-semibold text-gray-800 mb-2">
      Feedback
    </p>

    <p className="text-gray-700 whitespace-pre-wrap">
      {mappedAnswers[selectedQuestion]?.feedback ||
        "No feedback available"}
    </p>

  </div>

</div>
            {/* PDF AREA */}

            <div className="border rounded-lg overflow-hidden">
                
              <iframe
                src={`https://veda-ai-assignment-m87u.onrender.com${pdfUrl}`}
                className="w-full h-[700px]"
              />

            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Select a question from the left
          </div>
        )}

      </div>

    </div>

  </div>
)}
          
    <footer className="w-full mt-20 py-8 text-center">
  <p className="text-gray-500 text-sm">
    Powered by Gemini AI
  </p>

  <p className="text-xs text-gray-400 mt-1">
    Built with Next.js • FastAPI • Render • Vercel
  </p>
</footer>
        </div>
      </div>
    </main>
  );
}
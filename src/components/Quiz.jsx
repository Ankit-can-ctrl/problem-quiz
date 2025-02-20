import { useState, useEffect } from "react";

// Main Quiz Component
const Quiz = () => {
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  // Quiz questions

  const questions = [
    // MCQ Questions
    {
      questionText: "Which planet is closest to the Sun?",
      type: "mcq",
      answerOptions: [
        { text: "Venus", isCorrect: false },
        { text: "Mercury", isCorrect: true },
        { text: "Earth", isCorrect: false },
        { text: "Mars", isCorrect: false },
      ],
    },
    {
      questionText:
        "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
      type: "mcq",
      answerOptions: [
        { text: "Stack", isCorrect: false },
        { text: "Queue", isCorrect: true },
        { text: "Tree", isCorrect: false },
        { text: "Graph", isCorrect: false },
      ],
    },
    {
      questionText:
        "Which of the following is primarily used for structuring web pages?",
      type: "mcq",
      answerOptions: [
        { text: "Python", isCorrect: false },
        { text: "Java", isCorrect: false },
        { text: "HTML", isCorrect: true },
        { text: "C++", isCorrect: false },
      ],
    },
    {
      questionText: "Which chemical symbol stands for Gold?",
      type: "mcq",
      answerOptions: [
        { text: "Au", isCorrect: true },
        { text: "Gd", isCorrect: false },
        { text: "Ag", isCorrect: false },
        {
          text: "Pt",
          isCorrect: false,
        },
      ],
    },
    {
      questionText:
        "Which of these processes is not typically involved in refining petroleum?",
      type: "mcq",
      answerOptions: [
        { text: "Fractional distillation", isCorrect: false },
        { text: "Cracking", isCorrect: false },
        { text: "Polymerization", isCorrect: false },
        { text: "Filtration", isCorrect: true },
      ],
    },

    // Fill in the blank questions
    {
      questionText: "What is the value of 12 + 28?",
      type: "fillblank",
      correctAnswer: "40",
    },
    {
      questionText: "How many states are there in the United States?",
      type: "fillblank",
      correctAnswer: "50",
    },
    {
      questionText: "In which year was the Declaration of Independence signed?",
      type: "fillblank",
      correctAnswer: "1776",
    },
    {
      questionText: "What is the value of pi rounded to the nearest integer?",
      type: "fillblank",
      correctAnswer: "3",
    },
    {
      questionText:
        "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
      type: "fillblank",
      correctAnswer: "120",
    },
  ];

  // IndexedDB setup
  useEffect(() => {
    initDB();
  }, []);

  const initDB = () => {
    const request = indexedDB.open("QuizDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("quizAttempts")) {
        db.createObjectStore("quizAttempts", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
    };
  };

  const saveAttemptToDB = (attemptData) => {
    const request = indexedDB.open("QuizDatabase", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["quizAttempts"], "readwrite");
      const store = transaction.objectStore("quizAttempts");

      const addRequest = store.add({
        timestamp: new Date().toISOString(),
        score: attemptData.score,
        totalQuestions: questions.length,
        timeUsed: attemptData.timeUsed,
      });

      addRequest.onsuccess = () => {
        console.log("Attempt saved to IndexedDB");
        loadAttemptHistory();
      };

      addRequest.onerror = (event) => {
        console.error("Error saving attempt:", event.target.error);
      };
    };
  };

  const loadAttemptHistory = () => {
    const request = indexedDB.open("QuizDatabase", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["quizAttempts"], "readonly");
      const store = transaction.objectStore("quizAttempts");
      const getAll = store.getAll();

      getAll.onsuccess = () => {
        setAttemptHistory(getAll.result);
      };
    };
  };

  // Timer logic
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive]);

  const handleTimeUp = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
      setFeedback(null);
      setUserInput("");
    } else {
      finishQuiz();
    }
  };

  // Start quiz function
  const startQuiz = () => {
    setQuizStarted(true);
    setIsTimerActive(true);
    setTimeLeft(30);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setQuizComplete(false);
    loadAttemptHistory();
  };

  // Handle answer submission for MCQ
  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setFeedback({ correct: true, message: "Correct!" });
    } else {
      setFeedback({ correct: false, message: "Incorrect!" });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setFeedback(null);
      } else {
        finishQuiz();
      }
    }, 1000);
  };

  console.log(score);
  // Handle fill in the blank submission
  const handleFillBlankSubmit = (e) => {
    e.preventDefault();
    const currentQ = questions[currentQuestion];
    const isCorrect =
      userInput.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase();

    if (isCorrect) {
      setScore(score + 1);
      setFeedback({ correct: true, message: "Correct!" });
    } else {
      setFeedback({
        correct: false,
        message: `Incorrect! The answer is "${currentQ.correctAnswer}".`,
      });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setFeedback(null);
        setUserInput("");
      } else {
        finishQuiz();
      }
    }, 1500);
  };

  // Finish quiz function
  const finishQuiz = () => {
    setIsTimerActive(false);
    setShowScore(true);
    setQuizComplete(true);

    // Save attempt to IndexedDB
    saveAttemptToDB({
      score: score,
      timeUsed: 30 * questions.length - timeLeft,
    });
  };

  // Render functions
  const renderQuestion = () => {
    const currentQ = questions[currentQuestion];

    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">
            Question {currentQuestion + 1}/{questions.length}
          </div>
          <div
            className={`p-2 rounded-full text-white font-bold ${
              timeLeft <= 10 ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {timeLeft}s
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6">{currentQ.questionText}</h2>

        {currentQ.type === "mcq" ? (
          <div className="space-y-3">
            {currentQ.answerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option.isCorrect)}
                className="w-full text-left p-3 border rounded-lg hover:bg-blue-50 transition"
              >
                {option.text}
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleFillBlankSubmit} className="space-y-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Type your answer..."
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        )}

        {feedback && (
          <div
            className={`mt-4 p-3 rounded-md ${
              feedback.correct
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {feedback.message}
          </div>
        )}
      </div>
    );
  };

  const renderScore = () => {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";

    if (percentage >= 80) message = "Excellent work!";
    else if (percentage >= 60) message = "Good job!";
    else if (percentage >= 40) message = "Not bad!";
    else message = "Keep practicing!";

    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <div className="text-6xl font-bold mb-4 text-blue-600">
          {percentage}%
        </div>
        <p className="text-xl mb-6">
          You scored {score} out of {questions.length} questions correct.
        </p>
        <p className="text-lg font-medium mb-8">{message}</p>
        <button
          onClick={startQuiz}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  };

  const renderAttemptHistory = () => {
    if (attemptHistory.length === 0) {
      return <p className="text-center text-gray-500">No previous attempts</p>;
    }

    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Attempt History</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border text-left">Date</th>
                <th className="p-2 border text-left">Score</th>
                <th className="p-2 border text-left">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {attemptHistory.map((attempt, index) => {
                const attemptDate = new Date(attempt.timestamp);
                const percentage = Math.round(
                  (attempt.score / attempt.totalQuestions) * 100
                );

                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-2 border">
                      {attemptDate.toLocaleDateString()}{" "}
                      {attemptDate.toLocaleTimeString()}
                    </td>
                    <td className="p-2 border">
                      {attempt.score}/{attempt.totalQuestions}
                    </td>
                    <td className="p-2 border">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              percentage >= 70
                                ? "bg-green-600"
                                : percentage >= 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="ml-2">{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Interactive Quiz</h1>

      {!quizStarted ? (
        <div className="text-center">
          <p className="mb-6">
            Test your knowledge with this timed quiz! You have 30 seconds per
            question.
          </p>
          <button
            onClick={startQuiz}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Start Quiz
          </button>
          {attemptHistory.length > 0 && renderAttemptHistory()}
        </div>
      ) : showScore ? (
        <div>
          {renderScore()}
          {renderAttemptHistory()}
        </div>
      ) : (
        renderQuestion()
      )}
    </div>
  );
};

export default Quiz;

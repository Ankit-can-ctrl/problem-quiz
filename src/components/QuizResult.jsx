import questions from "../assets/Questions";
import AttemptHistory from "./AttemptHistory";

const QuizResult = ({ score, startQuiz, attemptHistory }) => {
  const percentage = Math.round((score / questions.length) * 100);

  const getFeedbackMessage = () => {
    if (percentage >= 80) return "Excellent work!";
    if (percentage >= 60) return "Good job!";
    if (percentage >= 40) return "Not bad!";
    return "Keep practicing!";
  };

  return (
    <div>
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <div className="text-6xl font-bold mb-4 text-blue-600">
          {percentage}%
        </div>
        <p className="text-xl mb-6">
          You scored {score} out of {questions.length} questions correct.
        </p>
        <p className="text-lg font-medium mb-8">{getFeedbackMessage()}</p>
        <button
          onClick={startQuiz}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>

      <AttemptHistory attemptHistory={attemptHistory} />
    </div>
  );
};

export default QuizResult;

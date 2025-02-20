import AttemptHistory from "./AttemptHistory";

const QuizStart = ({ startQuiz, attemptHistory }) => {
  return (
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

      {attemptHistory.length > 0 && (
        <AttemptHistory attemptHistory={attemptHistory} />
      )}
    </div>
  );
};

export default QuizStart;

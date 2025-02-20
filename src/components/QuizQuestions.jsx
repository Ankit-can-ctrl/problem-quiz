import questions from "../assets/Questions";

const QuizQuestions = ({
  currentQuestion,
  timeLeft,
  feedback,
  userInput,
  handleAnswerClick,
  handleFillBlankSubmit,
  updateUserInput,
}) => {
  const currentQ = questions[currentQuestion];

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFillBlankSubmit(userInput);
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => updateUserInput(e.target.value)}
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

export default QuizQuestions;

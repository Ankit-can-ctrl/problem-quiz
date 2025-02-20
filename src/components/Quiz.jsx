import { useEffect } from "react";
import useQuizReducer from "../hooks/useQuizReducer";
import { getAttemptHistory, saveAttempt } from "../db/indexedDBService";
import questions from "../assets/Questions";

import QuizStart from "./QuizStart";
import QuizQuestion from "./QuizQuestions";
import QuizResult from "./QuizResult";

const Quiz = () => {
  const { state, actions } = useQuizReducer();

  useEffect(() => {
    const loadHistory = async () => {
      const history = await getAttemptHistory();
      actions.setAttemptHistory(history);
    };

    loadHistory();
  }, []);

  // Save quiz attempt when completed
  useEffect(() => {
    const saveQuizAttempt = async () => {
      if (state.quizComplete) {
        await saveAttempt({
          score: state.score,
          totalQuestions: questions.length,
          timeUsed: state.totalTimeUsed,
        });

        const history = await getAttemptHistory();
        actions.setAttemptHistory(history);
      }
    };

    saveQuizAttempt();
  }, [state.quizComplete, state.score]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Interactive Quiz</h1>

      {!state.quizStarted ? (
        <QuizStart
          startQuiz={actions.startQuiz}
          attemptHistory={state.attemptHistory}
        />
      ) : state.showScore ? (
        <QuizResult
          score={state.score}
          startQuiz={actions.startQuiz}
          attemptHistory={state.attemptHistory}
        />
      ) : (
        <QuizQuestion
          currentQuestion={state.currentQuestion}
          timeLeft={state.timeLeft}
          feedback={state.feedback}
          userInput={state.userInput}
          handleAnswerClick={actions.handleAnswerClick}
          handleFillBlankSubmit={actions.handleFillBlankSubmit}
          updateUserInput={actions.updateUserInput}
        />
      )}
    </div>
  );
};

export default Quiz;

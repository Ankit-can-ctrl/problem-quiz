import { useReducer, useEffect, useRef } from "react";
import questions from "../assets/Questions";

const initialState = {
  quizStarted: false,
  currentQuestion: 0,
  score: 0,
  showScore: false,
  timeLeft: 30,
  isTimerActive: false,
  attemptHistory: [],
  userInput: "",
  feedback: null,
  quizComplete: false,
  totalTimeUsed: 0,
};

const actions = {
  START_QUIZ: "START_QUIZ",
  ANSWER_QUESTION: "ANSWER_QUESTION",
  SUBMIT_FILL_BLANK: "SUBMIT_FILL_BLANK",
  NEXT_QUESTION: "NEXT_QUESTION",
  FINISH_QUIZ: "FINISH_QUIZ",
  TICK_TIMER: "TICK_TIMER",
  TIME_UP: "TIME_UP",
  SET_ATTEMPT_HISTORY: "SET_ATTEMPT_HISTORY",
  UPDATE_USER_INPUT: "UPDATE_USER_INPUT",
  RESET: "RESET",
};

// Reducer function
function quizReducer(state, action) {
  switch (action.type) {
    case actions.START_QUIZ:
      return {
        ...initialState,
        quizStarted: true,
        isTimerActive: true,
        attemptHistory: state.attemptHistory,
      };

    case actions.ANSWER_QUESTION:
      return {
        ...state,
        score: action.isCorrect ? state.score + 1 : state.score,
        feedback: {
          correct: action.isCorrect,
          message: action.isCorrect ? "Correct!" : "Incorrect!",
        },
      };

    case actions.SUBMIT_FILL_BLANK:
      const isCorrect =
        action.userInput.toLowerCase().trim() ===
        action.correctAnswer.toLowerCase();

      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        feedback: {
          correct: isCorrect,
          message: isCorrect
            ? "Correct!"
            : `Incorrect! The answer is "${action.correctAnswer}".`,
        },
      };

    case actions.NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        timeLeft: 30,
        feedback: null,
        userInput: "",
      };

    case actions.FINISH_QUIZ:
      return {
        ...state,
        isTimerActive: false,
        showScore: true,
        quizComplete: true,
        totalTimeUsed: 30 * questions.length - state.timeLeft,
      };

    case actions.TICK_TIMER:
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    case actions.TIME_UP:
      if (state.currentQuestion < questions.length - 1) {
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          timeLeft: 30,
          feedback: null,
          userInput: "",
        };
      } else {
        return {
          ...state,
          isTimerActive: false,
          showScore: true,
          quizComplete: true,
          totalTimeUsed: 30 * questions.length,
        };
      }

    case actions.SET_ATTEMPT_HISTORY:
      return {
        ...state,
        attemptHistory: action.history,
      };

    case actions.UPDATE_USER_INPUT:
      return {
        ...state,
        userInput: action.input,
      };

    case actions.RESET:
      return initialState;

    default:
      return state;
  }
}

// Custom hook
export default function useQuizReducer() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const timerRef = useRef(null);

  // Timer effect
  useEffect(() => {
    if (state.isTimerActive && state.timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        dispatch({ type: actions.TICK_TIMER });
      }, 1000);

      return () => clearTimeout(timerRef.current);
    } else if (state.timeLeft === 0 && state.isTimerActive) {
      dispatch({ type: actions.TIME_UP });
    }
  }, [state.timeLeft, state.isTimerActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Action creators
  const startQuiz = () => {
    dispatch({ type: actions.START_QUIZ });
  };

  const handleAnswerClick = (isCorrect) => {
    dispatch({ type: actions.ANSWER_QUESTION, isCorrect });

    // Schedule next question
    setTimeout(() => {
      if (state.currentQuestion < questions.length - 1) {
        dispatch({ type: actions.NEXT_QUESTION });
      } else {
        dispatch({ type: actions.FINISH_QUIZ });
      }
    }, 1000);
  };

  const handleFillBlankSubmit = (userInput) => {
    const currentQ = questions[state.currentQuestion];
    dispatch({
      type: actions.SUBMIT_FILL_BLANK,
      userInput,
      correctAnswer: currentQ.correctAnswer,
    });

    // Schedule next question
    setTimeout(() => {
      if (state.currentQuestion < questions.length - 1) {
        dispatch({ type: actions.NEXT_QUESTION });
      } else {
        dispatch({ type: actions.FINISH_QUIZ });
      }
    }, 1500);
  };

  const updateUserInput = (input) => {
    dispatch({ type: actions.UPDATE_USER_INPUT, input });
  };

  const setAttemptHistory = (history) => {
    dispatch({ type: actions.SET_ATTEMPT_HISTORY, history });
  };

  const resetQuiz = () => {
    dispatch({ type: actions.RESET });
  };

  return {
    state,
    actions: {
      startQuiz,
      handleAnswerClick,
      handleFillBlankSubmit,
      updateUserInput,
      setAttemptHistory,
      resetQuiz,
    },
  };
}

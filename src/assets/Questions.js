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

export default questions;

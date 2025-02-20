# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!--============================ Guide============================= -->

## Project Fetures

Key Features Implemented:

1. Quiz Types:

   5 Multiple Choice Questions (MCQs)
   5 Fill-in-the-blank questions

2. Timed Questions:

   30-second timer per question
   Visual indicator turns red when time is running low
   Auto-advances when time runs out

3. Instant Feedback:

   Shows correct/incorrect feedback immediately after answering
   For fill-in-the-blank, displays the correct answer when wrong

4. Progress Tracking:

   Shows current question number and total questions
   Displays a percentage score at the end
   Provides encouraging message based on score

5. Attempt History:

   Saves quiz attempts to IndexedDB
   Displays previous attempts with date, score, and visual percentage bar
   Color-coded performance indicators

## Instructions to run the app locally.

(Nodejs required)

1. Clone this repository: `git clone https://github.com/Ankit-can-ctrl/problem-quiz`
2. Navigate into the project directory: `cd react-vite-template`
3. Install dependencies using npm or yarn:
   - Using npm: `npm install`
4. Start the development server:
   - Using npm: `npm run dev`

## Deployed app

https://problem-quiz.vercel.app/

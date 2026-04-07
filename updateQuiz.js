import { state } from "./main.js";
import { quizLogic } from "./quizLogic.js";
import { renderHTML } from "./renderHTML.js";
import { drawRecordsBasedOnLevel, leaderBoardAndRecords } from "./leaderBoard.js";

export function updateQuiz() {
  const savedQuizs = JSON.parse(localStorage.getItem("quizs")) ?? [];

   const leaderBoarISOpen = JSON.parse(localStorage.getItem("leaderBoards")) ?? false;

  if(leaderBoarISOpen){

     state.mainPage.classList.remove("show");
     state.leaderBoard.classList.add("show")
       state.boardLevels[0].classList.add("active")
       drawRecordsBasedOnLevel();
  }
  if (savedQuizs.length === 0) return;

  const savedActiveIndex = Number(JSON.parse(localStorage.getItem("activeIndex")) ?? 0);
  const savedScore = Number(JSON.parse(localStorage.getItem("score")) ?? 0);
  const quizFinished = JSON.parse(localStorage.getItem("quizFinished")) ?? false;

  if (quizFinished) {
    // Show result page instead of quiz
    state.mainPage.classList.remove("show");
    state.resultText.classList.add("show");
    state.resultText.textContent = `You have answered ${savedScore} out of ${savedQuizs.length} correctly!`;

    // activate restart button
    state.restartBtn.removeEventListener("click", restartQuiz);
    state.restartBtn.addEventListener("click", restartQuiz);

    return; 
  }

  // remove old quizzes
  document.querySelectorAll(".quiz").forEach(el => el.remove());

  // restore state
  state.activeIndex = savedActiveIndex;
  state.score = savedScore;

  // query newly created quizzes
  const quizElements = document.querySelectorAll(".quiz");

  // render quizzes
  renderHTML();

  // Otherwise, show the current quiz
  state.mainPage.classList.remove("show");
  if (quizElements[state.activeIndex]) {
    quizElements[state.activeIndex].classList.add("show");
  }

  // Initialize quiz logic
  quizLogic(quizElements);

  // restart function
  function restartQuiz() {
    state.mainPage.classList.add("show");
    state.resultPage.classList.remove("show");

    state.activeIndex = 0;
    state.score = 0;

    localStorage.removeItem("quizs");
    localStorage.removeItem("activeIndex");
    localStorage.removeItem("score");
    localStorage.removeItem("level");
    localStorage.removeItem("quizFinished");

    const quizEls = document.querySelectorAll(".quiz");
    quizEls.forEach(quizEl => quizEl.remove());

    state.quizlevels.forEach(quizlevel =>
      quizlevel.classList.remove("selected")
    );
  }

 
}
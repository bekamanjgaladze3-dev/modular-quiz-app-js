 
 
 import { startQuiz } from "./starter.js"
 import { leaderBoardAndRecords } from "./leaderBoard.js";
import { updateQuiz } from "./updateQuiz.js";
 export const state = {
       App: document.querySelector("#App"),
       quizlevels: document.querySelectorAll(".quiz-levels > div"),
       mainPage: document.querySelector(".entryOFquiz"),
       startQuizBtn: document.querySelector("#start"),
       errorMssage: document.querySelector("#message"),
       recordsBtn: document.querySelector(".recordsBtn"),
       leaderBoard: document.querySelector(".leaderBoard"),
       closeBoard: document.querySelector("#closeBoard"),
       boardLevels: document.querySelectorAll(".boardLevels > div"),
       leaderBoardContent: document.querySelector(".leaderBoard > .content"),
       resultPage: document.querySelector(".resultPage"),
       resultText: document.querySelector(".resultPage > .resultTxt"),
       inputs: document.querySelector(".input > input"),
       restartBtn: document.querySelector(".btns > .restart"),
       saveRecordBtn: document.querySelector(".addToLeaders > button"),
       loadingPage: document.querySelector(".loading"),
       activeIndex: 0,
       score: 0,
       level: null

 }


window.addEventListener("DOMContentLoaded", async function(){


 startQuiz();
  leaderBoardAndRecords();
  updateQuiz();

      


})



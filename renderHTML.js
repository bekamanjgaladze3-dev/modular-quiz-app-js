import { state } from "./main.js";
import { quizLogic } from "./quizLogic.js";

export function randomQuizs(questions){ // gets 10 random quizs
let indexes = [];
let randomIndex = null;
let uniqueIndexes = [];
for(var i = 0; i < questions.length; i++){ // this loop get unique 10 random index
randomIndex = Math.trunc(Math.random() * questions.length);
indexes.push(randomIndex);
   uniqueIndexes = [...new Set(indexes)];
   if(uniqueIndexes.length === 10){
    break;
   }
}

let quizQuestions = [];
for(let id of uniqueIndexes){
  // and based on that index we get 10 random quizs
  quizQuestions.push(questions[id]);

}

localStorage.setItem("quizs", JSON.stringify(quizQuestions));

 renderHTML();
   
 }



 export function renderHTML(){  
   const quizs = JSON.parse(localStorage.getItem("quizs")) ?? [];
  
   for(let [index, quiz] of Object.entries(quizs)){
      let quizDiv = document.createElement("div");
      quizDiv.setAttribute("class", "quiz");
      quizDiv.setAttribute("id", index);

      let quizQuestions = document.createElement("div");
      quizQuestions.setAttribute("class", "questions");
      quizQuestions.textContent = quiz.question

      quizDiv.append(quizQuestions);

 let answers = document.createElement("div");
 answers.setAttribute("class", "answers");

 let answersArr = [quiz.correct_answer, ...quiz.incorrect_answers];
answersArr.sort(() => Math.random() - 0.5); // deploys answers randoml index so they will not be on the same place

  for(let answer of answersArr){

     let answerDiv = document.createElement("div");
     answerDiv.setAttribute("class", "answer");
     answerDiv.textContent = answer;
     answers.append(answerDiv)
  }
 
      quizDiv.append(answers)


      state.App.insertAdjacentElement("afterbegin", quizDiv)
   }

   const quizElements = document.querySelectorAll(".quiz");

state.loadingPage.classList.remove("visibleLoading") // when quiz are brought from API the loding disapears
   quizElements[state.activeIndex].classList.add("show");
   quizLogic(quizElements)
}
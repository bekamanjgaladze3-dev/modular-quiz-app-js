import { state } from "./main.js";
import { quizQuestionsFromAPI } from "./api.js";
import { randomQuizs } from "./renderHTML.js";
export function startQuiz(){

       state.quizlevels.forEach(quizlevel=> quizlevel.addEventListener("click", selectingLevel, false));

      function selectingLevel(e){

          state.quizlevels.forEach(quizLevel=> quizLevel.classList.remove("selected"));

            e.target.classList.add("selected");
      }
   
     

        state.startQuizBtn.addEventListener("click", async function(){

  let  hasSelected = Array.from(state.quizlevels).every(quizLevel=> !quizLevel.classList.contains("selected")); // checks if there is no chosen level

               if(hasSelected){

                 state.errorMssage.textContent = "Please Choose Any Level Below !";
               }else{

                 state.errorMssage.textContent = "";
// we lowerCase the letters to match API objet
                 state.level =  Array.from(state.quizlevels).find(levels=> levels.classList.contains("selected")).textContent.toLowerCase(); 
         
                  state.mainPage.classList.remove("show");
                  state.loadingPage.classList.add("visibleLoading")
    
           const quizs = await quizQuestionsFromAPI(state.level)
                  
                 localStorage.setItem("level", JSON.stringify(state.level));   
                 
                   randomQuizs(quizs) // this is resposable for drawing HTML;
               }
        });

  
        


}
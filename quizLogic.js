
 import { state } from "./main.js";
import { leaderBoardAndRecords } from "./leaderBoard.js";

export function quizLogic(quizElements) {

  
    const quizs = JSON.parse(localStorage.getItem("quizs"));

    function manageEvents(quizElements) {
        for (let quizElement of quizElements) {
            if (quizElement.classList.contains("show")) {
                const answers = quizElement.querySelectorAll(".answers > .answer");
                enableClicks(answers);
            }
        }
    }

    function enableClicks(answers) {
        answers.forEach(answer => {
            answer.removeEventListener("click", userReply, false);
            answer.addEventListener("click", userReply, false);
        });
    }

    function userReply(e) {
        let userAnswer = e.target;

       
        const quizElement = userAnswer.closest(".quiz");
        let currentQuizIndex = Number(quizElement.id);

        if (userAnswer.textContent === quizs[currentQuizIndex].correct_answer) {
            state.activeIndex++;
            state.score++;

            localStorage.setItem("score", JSON.stringify(state.score));

            userAnswer.classList.add("correct");
            disableClicks(userAnswer);

            setTimeout(nextQuiz, 1000);
        } else {
            const answers = userAnswer.parentElement.querySelectorAll(".answer");

            state.activeIndex++;

            for (let answer of answers) {
                if (answer.textContent === quizs[currentQuizIndex].correct_answer) {
                    answer.classList.add("correct");
                }
            }

            userAnswer.classList.add("wrong");
            disableClicks(userAnswer);

            setTimeout(nextQuiz, 1000);
        }

        localStorage.setItem("activeIndex", JSON.stringify(state.activeIndex));
    }

    function disableClicks(answerElement) {
        const container = answerElement.parentElement;
        const answerElements = container.querySelectorAll(".answer");

        answerElements.forEach(answer =>
            answer.removeEventListener("click", userReply, false)
        );
    }

    function nextQuiz() {
        
        quizElements.forEach(quiz => quiz.classList.remove("show"));

        if (state.activeIndex === quizElements.length) {
            localStorage.setItem("quizFinished", true);

            state.resultPage.classList.add("show");

            
            state.resultText.textContent =
                `You have answered ${state.score} out of ${quizElements.length} correctly!`;

            state.restartBtn.removeEventListener("click", restartQuiz);
            state.restartBtn.addEventListener("click", restartQuiz);

            leaderBoardAndRecords();
            return;
        }

        quizElements[state.activeIndex].classList.add("show");
        manageEvents(quizElements);
    }

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

    manageEvents(quizElements);
}
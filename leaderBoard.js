import { state } from "./main.js";

export function leaderBoardAndRecords(){

    const savedLevel = JSON.parse(localStorage.getItem("level")) ?? null;

         state.recordsBtn.addEventListener("click", function(){
// open leaderBoard by this
            state.mainPage.classList.remove("show");
            state.leaderBoard.classList.add("show");
            // first line here makes sure that it does not select two elements and second line just selects the first one
             state.boardLevels.forEach(boardLevel=> boardLevel.classList.remove("active"));
            state.boardLevels[0].classList.add("active")
 localStorage.setItem("leaderBoards", JSON.stringify(true))
            drawRecordsBasedOnLevel();

           
        })

        state.closeBoard.addEventListener("click", function(){
// close the Leaderboard by doing it
             state.leaderBoard.classList.remove("show");
             state.mainPage.classList.add("show");

             localStorage.removeItem("leaderBoards")
        })

        state.boardLevels.forEach(boardLevel=> boardLevel.addEventListener("click", function(e){

              state.boardLevels.forEach(boardLevel=> boardLevel.classList.remove("active"));
             e.target.classList.add("active");

drawRecordsBasedOnLevel()
             
               
        }))

let records = JSON.parse(localStorage.getItem("records")) ?? [];

state.saveRecordBtn.addEventListener("click", function(){
  
   let inputVal = state.inputs.value.trim(); // trim spaces

  if (!inputVal) return; // stop if empty

  records.push({
    name: inputVal,
    score: Number(JSON.parse(localStorage.getItem("score"))),
    level: JSON.parse(localStorage.getItem("level"))
  });

  localStorage.setItem("records", JSON.stringify(records));
   state.inputs.value = ""
});

  
  
  
        

}

export  function drawRecordsBasedOnLevel(){
 const savedRecords = JSON.parse(localStorage.getItem("records")) ?? [];
let recordsUI = [];

for (let boardLevel of state.boardLevels) {

  if (boardLevel.classList.contains("active")) {

    let activeBoardLevel = boardLevel.textContent;

    recordsUI = savedRecords.filter(
      record => record.level === activeBoardLevel
    );
  }
}

for (let i = 0; i < recordsUI.length; i++) {

  let duplicateCheker = recordsUI.filter(item => item.name === recordsUI[i].name);

  if (duplicateCheker.length > 1) {

   let arr = duplicateCheker.map(item => item.score)

    let maxScore = Math.max(...arr);

    // index of first max score occurrence
    let firstMaxIndex = recordsUI.findIndex(item => item.name === recordsUI[i].name && item.score === maxScore);
// removes duplicate users
    if (recordsUI[i].score < maxScore || recordsUI[i].score === maxScore && i !== firstMaxIndex) {
      recordsUI.splice(i, 1);
      i--;
    }
  }
}



   recordsUI?.sort((a, b)=> b.score - a.score)
  
   const leaderBoardUsers = document.querySelectorAll(".persons");

   leaderBoardUsers.forEach(user=> user.remove());

   for(let i = 0; i < recordsUI?.length; i++){

      if(i > 4){

        break;
      }else{

          const html = `
      <div class="persons visible" id="${recordsUI[i].level}">
        <h1 class="number">${i + 1}</h1>
        <p>${recordsUI[i].name}</p>
        <p class="points">${recordsUI[i].score}</p>
      </div>
    `;

    state.leaderBoardContent.insertAdjacentHTML("beforeend", html);
      }
     
    
   }


   }



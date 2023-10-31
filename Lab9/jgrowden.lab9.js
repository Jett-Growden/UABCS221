const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceBtns = document.querySelectorAll(".choiceBtn");
let user;
let computer;

choiceBtns.forEach(button => button.addEventListener("click", () => {

    user = button.textContent;
    computerTurn();
    playerText.textContent = `user: ${user}`;
    computerText.textContent = `computer: ${computer}`;
    resultText.textContent = `outcome: ` + check();
}));

function computerTurn(){

    const randNum = Math.floor(Math.random() * 3) + 1;

    switch(randNum){
        case 1:
            computer = "ROCK";
            break;
        case 2:
            computer = "PAPER";
            break;
        case 3:
            computer = "SCISSORS";
            break;
    }
}
function check(){
    if(user === computer){
        return "tie";
    }
    else if(computer === "ROCK"){
        return (user === "PAPER") ? "win" : "lose"
    }
    else if(computer === "PAPER"){
        return (player === "SCISSORS") ? "win" : "lose"
    }
    else if(computer === "SCISSORS"){
        return (player === "ROCK") ? "win" : "lose"
    }
}
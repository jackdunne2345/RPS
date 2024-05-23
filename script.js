

let playerScore=0
let aiScore=0
let difficulty=5
const difficultyIncrease=10
let initialLevel=true;
const playerHandSymbols = new Map();
playerHandSymbols.set('rock', `
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
`);
playerHandSymbols.set('paper', `
     _______
---'    ____)____
           ______)
          _______)
         _______)
---.__________)
`);
playerHandSymbols.set('scissors', `
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
`
);
const aiHandSymbols = new Map();
aiHandSymbols.set('rock', `
    _______
   (____   '---
  (_____)
  (_____)
   (____)
    (___)__.---
`);
aiHandSymbols.set('paper', `
       _______
  ____(____    '---
 (______
(_______
 (_______
  (___________.---
`);
aiHandSymbols.set('scissors', `
      _______
 ____(____    '---
(______
(__________
     (____)
      (___)__.---
`
);



function start(){
    if(playerScore>2){
        aiScore=0
        playerScore=0
        difficulty+=difficultyIncrease
        if(difficulty>100)difficulty=100
        console.log(`win message , you are on lvl ${difficulty/difficultyIncrease}`)
    }else if(aiScore>2){
        aiScore=0
        playerScore=0
        difficulty-=difficultyIncrease
        if(difficulty<5){
            difficulty=5;
            console.log(`how on earth can you not beat this lvl!`)
        }
        else console.log(`lose message, back you go to lvl ${difficulty/difficultyIncrease}`)
        
    }
    if(initialLevel){
        console.log(`LEVEL ${difficulty/5}`)
        initialLevel=false
    }
    
    playerEntry()
}
function playerEntry(){
    let isValid=false
    let playerSelection
    while(!isValid){
        const playerInput=prompt("please type either rock paper or scissors")
        const lowerCaseInput=playerInput.toLowerCase()
        if(typeof lowerCaseInput==='string' ){  
            if(lowerCaseInput==='rock'||lowerCaseInput==='paper'||lowerCaseInput==='scissors'){
                playerSelection=lowerCaseInput
                isValid=true
            }else{
                alert(`not a valid input`)    
            }
        }
    }
    play_round(difficulty,playerSelection)

}
function play_round (difficulty,playerChoice){
    let aiWin=false;
    let aiSelection='rock'
    const randomNumber = Math.floor(Math.random() * 100) + 1;
   
    if(randomNumber<=difficulty) aiWin=true
    switch(aiWin){
        case true:
            switch(playerChoice){
                case 'rock':
                        aiSelection='paper'
                break;
                case'paper':
                        aiSelection='scissors'
                break;
                case 'scissors':
                    aiSelection='rock'
                break;
            } 
            console.log(`ai wins ${playerHandSymbols.get(playerChoice)}<${aiHandSymbols.get(aiSelection)}`) 
            aiScore++
            console.log(`Player: ${playerScore}, AI:${aiScore}`) 
        break;
        case false:
            const drawOrLose = Math.floor(Math.random() * 100) + 1;
            if(drawOrLose>55){
                aiSelection=playerChoice
                console.log(`we have a draw ${playerHandSymbols.get(playerChoice)}=${aiHandSymbols.get(aiSelection)}`)
                console.log(`Player: ${playerScore}, AI:${aiScore}`)
            }else{
                switch(playerChoice){
                    case 'rock':
                            aiSelection='scissors'
                    break;
                    case'paper':
                            aiSelection='rock'
                    break;
                    case 'scissors':
                        aiSelection='paper'
                    break;
                } 
                console.log(`player wins ${playerHandSymbols.get(playerChoice)}>${aiHandSymbols.get(aiSelection)}`);
                 playerScore++
                console.log(`Player: ${playerScore}, AI:${aiScore}`)
            }
        break;
    }
   start()

}




start()

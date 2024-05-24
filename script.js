let playerScore=0
let aiScore=0
const difficultyIncrease=10
let difficulty=difficultyIncrease
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



//STARTS GAME
const game = () =>{
    //checks if any one has won the best of 5
    if(playerScore>2){
        aiScore=0
        playerScore=0
        difficulty+=difficultyIncrease
        if(difficulty>100)difficulty=100
        console.log(`win message , you are on level ${difficulty/difficultyIncrease}`)
        console.log(`LEVEL ${difficulty/difficultyIncrease} Fight!`)
    }else if(aiScore>2){
        aiScore=0
        playerScore=0
        difficulty-=difficultyIncrease
        if(difficulty<difficultyIncrease){
            difficulty=difficultyIncrease;
            initialLevel=true
            console.log(`how on earth can you not beat this level!`)
        }
        else console.log(`lose message, back you go to level ${difficulty/difficultyIncrease}`)
    }
    // if on level one does some different logic to display correct level ***THIS COULD GO does nothing lol ***
    if(initialLevel){
        console.log(`LEVEL ${difficulty/difficultyIncrease} Fight!`)
        initialLevel=false
    }
    let playerSelection=player_Entry()
    let dialouge= play_round(difficulty,playerSelection)
    console.log(dialouge)
    console.log(`Player: ${playerScore}, AI:${aiScore}`) 

}
//takes an input on a while loop stops when it is valid
const player_Entry=()=>{
    let isValid=false
    let playerSelection
    while(!isValid){
        //NEED TO HANDLE NO ENTRY 
        const playerInput=prompt("please type either rock paper or scissors");
        const lowerCaseInput=playerInput.toLowerCase()
        if(typeof lowerCaseInput==='string' ){  
            (lowerCaseInput==='rock'||lowerCaseInput==='paper'||lowerCaseInput==='scissors') ?()=>{ playerSelection=lowerCaseInput
                isValid=true}:alert(`not a valid input`)
        }
    }
    return playerSelection
}

//displays the hand symbols and handles the winning and losing logic
const play_round= (difficulty,playerChoice)=>{
    let aiWin=false;
    let aiSelection='rock'
    //generates a random number between 1-100 inclusive
    const randomNumber = Math.floor(Math.random() * 100) + 1;
   // if the number is less than or equal to the diffuclty the ai wins. 
   // so the higher the difficulty the lower the chance you have to win. 
   // works out at roughly 1% per unit of diffculty as the number selected isnt
   // entirly random
     aiWin = randomNumber <= difficulty;
    // the logic for the display of the winning hand symbol for the ai
        if(aiWin){
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
            aiScore++
            return `ai wins ${playerHandSymbols.get(playerChoice)}<${aiHandSymbols.get(aiSelection)}`
            
            
        }
        else{
            const drawOrLose = Math.floor(Math.random() * 100) + 1;
            if(drawOrLose>55){
                aiSelection=playerChoice
                return `we have a draw ${playerHandSymbols.get(playerChoice)}=${aiHandSymbols.get(aiSelection)}`
            }
            else{
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
                playerScore++
                return `player wins ${playerHandSymbols.get(playerChoice)}>${aiHandSymbols.get(aiSelection)}`
            }
        }
    
    //starts over!!
   game()
}




game()

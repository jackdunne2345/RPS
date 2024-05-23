

let playerScore=0
let aiScore=0
let difficulty=5



function start(){
    if(playerScore>2){
        aiScore=0
        playerScore=0
        difficulty+=5
        if(difficulty>100)difficulty=100
        console.log(`win message , you are on lvl ${difficulty/5}`)
    }else if(aiScore>2){
        aiScore=0
        playerScore=0
        difficulty-=5
        if(difficulty<5){
            difficulty=5;
            console.log(`how on earth can you not eat this lvl!`)
        }
        else console.log(`lose message, back you go to lvl ${difficulty/5}`)
        
    }
    console.log(`LEVEL ${difficulty/5}`)
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
            console.log(`ai wins ${playerChoice}<${aiSelection}`) 
            aiScore++
            console.log(`Player: ${playerScore}, AI:${aiScore}`) 
        break;
        case false:
            const drawOrLose = Math.floor(Math.random() * 100) + 1;
            console.log(drawOrLose)
            if(drawOrLose>77){
                aiSelection=playerChoice
                console.log(`we have a draw ${playerChoice}=${aiSelection}`)
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
                console.log(`player wins ${playerChoice}>${aiSelection}`);
                 playerScore++
                console.log(`Player: ${playerScore}, AI:${aiScore}`)
            }
        break;
    }
   start()

}




start()
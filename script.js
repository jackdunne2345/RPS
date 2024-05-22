const game={
    playerScore:0,
    aiScore:0,
    //this will indicate the change in % the ai has to beat the player. maybe the player can select a diffuclty or
    // the difficulty can increase everytime the player wins?
    difficulty:5,
    // setDifficulty:function(){
    //     //prompt player to enter a number between 1-100 and set it to the difficulty.
    //     //check if entry is an int
    //     //this.reset_state()
    // },
    reset_state:function(){
        //check for a score higher than 2
        // if(playerScore>2){
        //     difficulty+=5
        //     display message and level level=this.difficulty/5
        // }if(aiScore>2){
        //     difficulty-=5 round up to 5
        //     display message and level level=this.difficulty/5
        // }
        //display game messages
        //start game logic loop
        this.playerEntry()
    },
    playerEntry:function(){
        //checks if it is a valid entry. if it is not take it as the player missed there chance to play this turn.(this logic could be changed)
        const playerSelection=prompt("please type r,p or s for rock paper siccisors")
        if(playerSelection==='P'||playerSelection==='p'||playerSelection==='S'||playerSelection==='s'||playerSelection==='r'||playerSelection==='R'){
            //valid entry 
            //play_round(this.difficulty,playerSelection)
        }else{
            //cpu auto wins selects random r,p or s and player gets a x
        }
        
    },
    play_round:function(difficulty,playerChoice){
        //uses difficulty to decide if its going to win. if diffculty is 1 it has 1% chance of winning
        //can do this by picking a random number 1-100 if it is the selected difficulty or less the cpu wins.
        //if it is higher than selected diffuclty or equalto it. 50% chance to draw (this logic could change)
        //display message
        //increment score
        //this.reset_state()
    },
}

game.reset_state();
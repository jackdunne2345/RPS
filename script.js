const random1to100 = () => {
  return Math.floor(Math.random() * 100) + 1;
};
let playerScore = 0;
let aiScore = 0;
const difficultyIncrease = 10;
let difficulty = difficultyIncrease;
let initialLevel = true;
let play = false;
const playerHandSymbols = new Map([
  [
    "rock",
    `
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
`,
  ],
  [
    "paper",
    `
    _______
---'   ____)____
          ______)
         _______)
        _______)
---.__________)
`,
  ],
  [
    "scissors",
    `
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
`,
  ],
]);
const aiHandSymbols = new Map([
  [
    "rock",
    `
    _______
   (____   '---
  (_____)
  (_____)
   (____)
    (___)__.---
`,
  ],
  [
    "paper",
    `
        _______
   ____(____    '---
 (______
(_______
 (_______
  (___________.---
`,
  ],
  [
    "scissors",
    `
        _______
  ____(____    '---
(______
(__________
     (____)
      (___)__.---
`,
  ],
]);
// AI dialog lines
const aiDialogLines = {
    win: ["So you got lucky.", "Am I supposed to congradulate you?","To be fair you did a 1/3 chance to win"],
    lose: ["Sometimes you win, sometimes you lose.", "It's just a game, there's no need to get mad.","Unlunky you are young padawn."],
    draw:["What were the odds?!", "The odds of us drawing are actually 1/9", "Somehow feels like a glith."],
    say: function(winLoseDraw){
      const random0to2 = Math.floor(Math.random() * 3)
      return this[`${winLoseDraw}`][random0to2]
    }
  }

//STARTS GAME
const game = () => {
  if (!play) {
    difficulty = difficultyIncrease;
    aiScore = 0;
    playerScore = 0;
    initialLevel = true;
    play = confirm(`Are you ready to play?`);
  }
  while (play) {
    if (playerScore > 2) {
      aiScore = 0;
      playerScore = 0;
      difficulty += difficultyIncrease;
      if (difficulty > 100) difficulty = 100;
      console.log(
        `Let's see how do in the next level. Your luck will decrease as you beat me.
         I am an evil AI after all. You are now on level ${difficulty / difficultyIncrease}`
      );
      console.log(`LEVEL ${difficulty / difficultyIncrease} Fight!`);
    } else if (aiScore > 2) {
      aiScore = 0;
      playerScore = 0;
      difficulty -= difficultyIncrease;
      if (difficulty < difficultyIncrease) {
        difficulty = difficultyIncrease;
        initialLevel = true;
        console.log(`How on earth can you not beat this level!`);
      } else
        console.log(
          `We have ourselves a loser, back you go to level ${difficulty / difficultyIncrease}`
        );
    }
    // if on level one does some different logic to display correct level ***THIS COULD GO does nothing lol ***
    if (initialLevel) {
      console.log(`LEVEL ${difficulty / difficultyIncrease} Fight!`);
      initialLevel = false;
    }
    let playerSelection = player_Entry();
    let dialouge = play_round(difficulty, playerSelection);
    dialouge && console.log(dialouge);
    dialouge && console.log(`Player: ${playerScore}, AI:${aiScore}`);
  }
};
//takes an input on a while loop stops when it is valid
const player_Entry = () => {
  let isValid = false;
  let playerSelection;
  while (!isValid) {
    //NEED TO HANDLE NO ENTRY
    const playerInput = prompt("Please type either rock paper or scissors.");
    if (playerInput === null) {
      alert("It's ok to quit if you're a chicken. \u{1F414}");
      console.log(`You made it to Level ${difficulty / difficultyIncrease}. `);
      play = false;
      return null;
    } else {
      const lowerCaseInput = playerInput.toLowerCase();
      if (typeof lowerCaseInput === "string") {
        if (
          lowerCaseInput === "rock" ||
          lowerCaseInput === "paper" ||
          lowerCaseInput === "scissors"
        ) {
          playerSelection = lowerCaseInput;
          isValid = true;
        } else alert(`Not a valid input.`);
      }
    }
  }
  return playerSelection;
};

//displays the hand symbols and handles the winning and losing logic
const play_round = (difficulty, playerChoice) => {
  if (playerChoice === null) return null;
  let aiWin = false;
  let aiSelection = "rock";
  //generates a random number between 1-100 inclusive
  const randomNumber = random1to100();
  // if the number is less than or equal to the diffuclty the ai wins.
  // so the higher the difficulty the lower the chance you have to win.
  // works out at roughly 1% per unit of diffculty as the number selected isnt
  // entirly random
  aiWin = randomNumber <= difficulty;
  const drawOrLose = random1to100();
  // the logic for the display of the winning hand symbol for the ai
  if (aiWin) {
    switch (playerChoice) {
      case "rock":
        aiSelection = "paper";
        break;
      case "paper":
        aiSelection = "scissors";
        break;
      case "scissors":
        aiSelection = "rock";
        break;
    }
    aiScore++;
    console.log(aiDialogLines.say("lose"));
    return `ai wins ${playerHandSymbols.get(playerChoice)}<${aiHandSymbols.get(aiSelection)}`;
  } else if (drawOrLose > 55) {
    aiSelection = playerChoice;
    console.log(aiDialogLines.say("draw"));
    return `we have a draw ${playerHandSymbols.get(playerChoice)}=${aiHandSymbols.get(aiSelection)}`;
  } else {
    switch (playerChoice) {
      case "rock":
        aiSelection = "scissors";
        break;
      case "paper":
        aiSelection = "rock";
        break;
      case "scissors":
        aiSelection = "paper";
        break;
    }
    playerScore++;
    console.log(aiDialogLines.say("win"));
    return `player wins ${playerHandSymbols.get(playerChoice)}>${aiHandSymbols.get(aiSelection)}`;
  }
};

game();

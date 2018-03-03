/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
 
var scors, roundScore, activePlayer, gamePlaying;
// when the page loaded, init the game
init();

// start a new game
document.querySelector('.btn-new').addEventListener('click', init);

// rolling the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. random dice number
        var dice = Math.floor(Math.random() * 6) + 1;
        // 2. display dice
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        // 3. update roundScore if the dice number is not a 1
        if(dice !== 1) {
            // add roundScore
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }
    }
});

// hold the score and the other player going to roll
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. update scores
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // 2. check if the scores >= 100
        var input = document.querySelector('.winning-score').value;
        var winningScore;
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        if(scores[activePlayer] >= winningScore){
            document.getElementById('score-' + activePlayer).textContent = "winner";
            document.querySelector(".dice").style.display = 'none';
            document.getElementById('current-' + activePlayer).textContent = '0';
            document.querySelector('.winning-score').value = '';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // 3. next player
            nextPlayer();
        }
    }
});

// init the game
function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.winning-score').value = '';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector(".dice").style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// next player
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector(".dice").style.display = 'none';
}

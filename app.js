/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, pointLimit;

gameInit();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		var dice = Math.floor(Math.random() * 6) + 1;
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		if (dice !== 1) {
			roundScore += dice;
			document.querySelector(
				'#current-' + activePlayer
			).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		scores[activePlayer] += roundScore;
		document.querySelector('#score-' + activePlayer).textContent =
			scores[activePlayer];

		if (scores[activePlayer] >= (pointLimit ? pointLimit : 30)) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';

			document
				.querySelector('.player-' + activePlayer + '-panel')
				.classList.remove('active');
			document
				.querySelector('.player-' + activePlayer + '-panel')
				.classList.add('winner');

			//document.querySelector('.btn-hold').style.display = 'none';
			//document.querySelector('.btn-roll').style.display = 'none';
			document.getElementById('inp-limit').disabled = false;

			gamePlaying = false;
		} else {
			document.getElementById('inp-limit').disabled = true;
			nextPlayer();
		}
	}
});

document.getElementById('inp-limit').addEventListener('change', (e) => {
	pointLimit = document.getElementById("inp-limit").value;
});

document.querySelector('.btn-new').addEventListener('click', function() {
	gameInit();
});

function nextPlayer() {
	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = roundScore;
	document
		.querySelector('.player-' + activePlayer + '-panel')
		.classList.toggle('active');

	if (activePlayer) {
		activePlayer = 0;
	} else {
		activePlayer = 1;
	}

	document.querySelector('.dice').style.display = 'none';
	document
		.querySelector('.player-' + activePlayer + '-panel')
		.classList.toggle('active');
}

function gameInit() {
	gamePlaying = true;
	//document.querySelector('.btn-hold').style.display = 'block';
	//document.querySelector('.btn-roll').style.display = 'block';

	clear();
	document
		.querySelector('.player-' + activePlayer + '-panel')
		.classList.add('active');
}

function clear() {
	activePlayer = 0;
	roundScore = 0;
	scores = [0, 0];

	document.querySelector('.dice').style.display = 'none';
	document.getElementById('inp-limit').textContent = '';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
}

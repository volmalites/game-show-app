/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//Dynamic background via css
document.body.style.transition = 'all 1s';

//Add a new message box for interactive messages FOR EXCEEDS AND BEYOND?
const phraseContainer = document.getElementById('phrase');
const messageBox = document.createElement('div');
messageBox.setAttribute('id', 'message');
messageBox.style.margin = '0 auto';
messageBox.style.width = '100%';
messageBox.style.textAlign = 'center';
messageBox.style.color = 'teal';
messageBox.innerHTML = '<h2>select any key on your keyboard or from the screen below</h2>';
phraseContainer.parentElement.insertBefore(messageBox, phraseContainer);
//End Message Box

const game = new Game();
const keyBoard = document.getElementById('qwerty');

//Game is tarted when the 'Start Game' button is pressed
const startButton = document.getElementById('btn__reset').addEventListener('click', () => {
    game.startGame();

    keyBoard.addEventListener('click', e => { //on screen keyboard
        if (e.target.className === 'key' && game.gameReady) {
            game.selectedButton = e.target;
            game.handleInteraction();
        }
    });
});

document.addEventListener('keydown', e => { //physical keyboard
    if (/^[a-z]?$/.test(e.key) && game.gameReady) {
        game.findButton(e.key);
        game.handleInteraction();
    }
});
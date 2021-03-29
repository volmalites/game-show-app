/* Treehouse FSJS Techdegree
 * Project 4 - OOPacity Game App
 * Game.js*/

/**
 * @property {number} missed number of incorrect guesses
 * @property {Array} phrases phrases to be used in game
 * @property {Null} activePhrase random phrase from phrases array
 * @property {Object} startingKeyBoard backup copy of the on screen keyboard
 * @property {Object} keysRows keyboard presses will be instantiated through the onscreen keyboard
 * @property {Object} startingLifePoints backup copy of the life points on screen
 * @property {boolean} gameReady if game has started
 * @property {Object} messageBox to display descriptive messages about the game
 * @property {Object} background RGB values for background color
 */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            { phrase: "How are you friend" },
            { phrase: "Have a nice day" },
            { phrase: "Thank you very much" },
            { phrase: "You are awesome" },
            { phrase: "Never gonna give you up" }
        ];
        this.activePhrase = null;
        this.startingKeyBoard = document.getElementById('qwerty').innerHTML;
        this.keysRows = document.getElementsByClassName('keyrow');
        this.startingLifePoints = document.getElementById('scoreboard').innerHTML;
        this.gameReady = false;
        this.messageBox = document.getElementById('message');
        this.background = {
            r: 0,
            g: 220,
            b: 250
        };
    }

    /**
     * @param {String} selectedButton button pressed by player containing DOM element
     */

    set selectedButton(selectedButton) {
        this._selectedButton = selectedButton;
    }

    startGame() {
        document.getElementById('overlay').style.display = 'none';
        this.activePhrase = new Phrase(this.phrases[Math.floor(Math.random() * this.phrases.length)].phrase);
        this.activePhrase.addPhraseToDisplay();
        this.gameReady = true;
        document.body.style.backgroundColor = `rgb(${this.background.r}, ${this.background.g}, ${this.background.b})`;
    }

    handleInteraction() { //interaction from user on key presses
        this.message(this.messageBox, '');
        this.activePhrase.guessedLetter = this._selectedButton.innerText;

        if (this._selectedButton.disabled === false) { //if button was already pressed once
            this._selectedButton.setAttribute('disabled', true);

            if (!this.activePhrase.checkLetter()) {
                this._selectedButton.classList.add('wrong');
                this.message(this.messageBox, `There are <span style="color:red;">no matches</span> for the letter '${this.activePhrase.guessedLetter}'`);
                this.removeLife();
            } else {
                this._selectedButton.classList.add('chosen');
                this.activePhrase.showMatchedLetter();
                if (this.checkForWin()) {
                    this.gameOver('Congratulations you won! Play again!');
                }
            }
        } else {
            this.message(this.messageBox, `The letter '${this.activePhrase.guessedLetter}' has <span style="color:red;">already been selected</span>`);
        }
    }

    removeLife() {
        let removeHeart = document.getElementsByClassName('tries');
        removeHeart[Math.abs(this.missed - 4)].firstElementChild.src = 'images/lostHeart.png'; //removing heart elements from last to first (right to left)
        this.missed += 1;
        this.background.r += 50;
        this.background.g -= 30;
        this.background.b -= 50;
        document.body.style.backgroundColor = `rgb(${this.background.r}, ${this.background.g}, ${this.background.b})`; //background gradually becomes red closer to game over

        if (this.missed === 5) {
            this.gameReady = false;
            this.message(this.messageBox, '<span style="color:#8b0000;">game over</span>');
            this.gameOver('You ran out of lives, try again...'); //the timeout set here caused confusion with the Treehouse reviewer, removing this for resubmission
        }

        if (this.missed === 4) {
            this.message(this.messageBox, '<span style="color:#8b0000;">Only one life point left!</span>');
        }
    }

    checkForWin() {
        return this.activePhrase.revealed >= this.activePhrase.phraseLength;
    }

    gameOver(message) {
        //reset game to original state
        document.getElementById('overlay').style.display = '';
        document.getElementById('game-over-message').innerText = message;
        this.message(this.messageBox, 'select any key on your keyboard or from the screen below');
        document.getElementById('qwerty').innerHTML = this.startingKeyBoard;
        document.getElementById('scoreboard').innerHTML = this.startingLifePoints;
        this.gameReady = false;
    }
    
    findButton(key) { //this fires on physical keyboard key presses and is instantiated against the onscreen keyboard
        for (let row of this.keysRows) {
            for (let column of row.children) {
                if (column.innerText === key) {
                    return this._selectedButton = column;
                }
            }
        }
    }

    message(element, message) {
        element.innerHTML = `<h2>${message}</h2>`;
    }
}
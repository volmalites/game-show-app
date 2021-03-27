/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/**
 * @param {String} phrase random phrase
 * @property {Number} phraseLength used when validating if the player has successfully guessed the entire phrase
 * @property {Number} revealed used when validating if the player has successfully guessed the entire phrase
 */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
        this.phraseLength = this.phrase.replace(/\s/g, '').length; //remove spaces, spaces are not part of the chars to be guessed
        this.revealed = 0;
    }

    /**
     * The character provided by the player to guess a letter in the phrase
     * @return {char}
     */

    get guessedLetter() {
        return this._guessedLetter;
    }

    set guessedLetter(guessedLetter) {
        this._guessedLetter = guessedLetter;
    }

    addPhraseToDisplay() {
        const phraseContainer = document.getElementById('phrase');
        phraseContainer.innerHTML = '';
        const list = document.createElement('ul');

        for (let i in this.phrase) {
            const listItem = document.createElement('li');
            listItem.innerText = this.phrase[i];
            listItem.setAttribute('class', `hide ${ (/\S/g.test(this.phrase[i])) ? 'letter' : 'space' }`); //Ternary with regex to differentiate between chars and spaces
            if (/\S/g.test(this.phrase[i])) listItem.classList.add(this.phrase[i]); //Ternary with regex to add character to class as well
            list.appendChild(listItem);
        }

        phraseContainer.appendChild(list);
    }

    /**
     * Validates guessed char against the phrase
     * @returns {Boolean} True if the phrase contains the char provided by the player else false
     */

    checkLetter() {
        this.revealed += this.phrase.split('').reduce((total, value) => {
            if (value === this._guessedLetter) {
                total += 1;
            }
            return total;
        }, 0);
        return this.phrase.includes(this._guessedLetter);
    }

    /**
     * This will reveal the selected char to the player
     */

    showMatchedLetter() {
        const matches = document.getElementsByClassName(this._guessedLetter);
        
        for (let i of matches) {
            i.classList.remove('hide');
            i.classList.add('show');
        }
    }
}
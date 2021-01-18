class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay() {
        const ul = document.querySelector('#phrase ul');
        for(let i = 0; i < this.phrase.length; i++) {
            const li = document.createElement('li');
            if (this.phrase[i] === ' ') {
                li.textContent = this.phrase[i];
                li.classList.add('space');
                ul.appendChild(li);
            } else {
                li.textContent = this.phrase[i];
                li.classList.add('hide');
                li.classList.add('letter');
                li.classList.add(this.phrase[i]);
                ul.appendChild(li);
            }
        }
    }
    // only need to check if phrase contains one guessed letter
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }
    // reveals all matches of guessed letter
    showMatchedLetter(letter) {
        const matches = document.getElementsByClassName(letter);
        for (let i = 0; i < matches.length; i++) {
            matches[i].classList.remove('hide');
            matches[i].classList.add('show');
        }
    }
}
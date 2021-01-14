class Game {
    constructor() {
        this.missed = 0;
        // populate this array
        this.phrases = [new Phrase('donut'),new Phrase('hi there'),new Phrase('hole in one')];
        this.activePhrase = null;
    }

    startGame() {
        document.getElementById('overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    handleInteraction(button) {
        button.disabled = true;
        if (this.activePhrase.checkLetter(button.textContent)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button.textContent);
            if (!this.checkForWin()) {
                this.gameOver('You guessed the correct phrase!', 'win');
            }
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }

    removeLife() {
        if (this.missed < 4) {
            const hearts = document.querySelectorAll('#scoreboard ol img');
            for (let i = 0; i < hearts.length; i++) {
                const heart = hearts[i];
                if (heart.src.includes('images/liveHeart.png')) {
                    // only change one element at a time
                    heart.src = 'images/lostHeart.png';
                    break;
                }
            }
            this.missed += 1;
        } else {
            this.gameOver('You ran out of guesses!', 'lose');
        }
    }

    checkForWin() {
        return document.getElementsByClassName('hide').length > 0 ? true : false;
    }

    gameOver(message, result) {
        const overlay = document.getElementById('overlay');
        overlay.style.removeProperty('display');
        const title = overlay.querySelector('h2');
        title.textContent = this.activePhrase.phrase;
        const gameOverMessage = overlay.querySelector('h1');
        gameOverMessage.textContent = message;
        overlay.classList.remove('start');
        if (overlay.classList.contains('lose') && result === 'win') {
            overlay.classList.remove('lose');
        } else if (overlay.classList.contains('win') && result === 'lose') {
            overlay.classList.remove('win');
        }
        overlay.classList.add(result);
        this.resetGame();
    }

    resetGame() {
        const ul = document.querySelector('#phrase ul');
        ul.innerHTML = '';
        const buttons = document.querySelectorAll('.keyrow button');
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('wrong');
            button.classList.remove('chosen');
        });
        const hearts = document.querySelectorAll('#scoreboard ol img');
        hearts.forEach(heart => {
            heart.src = 'images/liveHeart.png';
        });
        this.missed = 0;
    }
}
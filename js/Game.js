class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase('Better late than never'),
            new Phrase('Bite the bullet'),
            new Phrase('Break a leg'),
            new Phrase('Hit the sack'),
            new Phrase('Speak of the devil')
        ];
        this.activePhrase = null;
    }

    startGame() {
        document.getElementById('overlay').style.display = 'none';
        this.activePhrase = this.randomPhrase;
        this.activePhrase.addPhraseToDisplay();
    }

    get randomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }
    // add new phrases to list
    addPhrase(phrase) {
        this.phrases.push(phrase);
    }

    handleInteraction(button) {
        button.disabled = true;
        if (this.activePhrase.checkLetter(button.textContent)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button.textContent);
            if (this.checkForWin()) {
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
                    // only change one element at a time and change first element that meets condition
                    heart.src = 'images/lostHeart.png';
                    break;
                }
            }
            this.missed += 1;
        } else {
            this.gameOver('You ran out of guesses!', 'lose');
        }
    }
    // player wins if list returns empty
    checkForWin() {
        return document.getElementsByClassName('hide').length > 0 ? false : true;
    }

    gameOver(message, result) {
        // elements for game over screen
        const overlay = document.getElementById('overlay');
        overlay.style.removeProperty('display');
        const title = overlay.querySelector('h2');
        const ul = document.querySelector('#phrase ul');
        const phrase = ul.children;
        title.textContent = '';
        // the phrase is displayed to user and animated differently based on outcome
        if (result === 'win') {
            // player gets animation for guessing phrase correctly
            let delay = 0;
            for (let i = 0; i < phrase.length; i++) {
                // each letter must be placed in a span element
                const span = document.createElement('span');
                if (phrase[i].textContent === ' ') {
                    span.textContent = ' ';
                } else {
                    // each letter will be animated to create a wave effect
                    span.style.animation = 'wave .4s';
                    span.style.animationDelay = `${delay}s`;
                    // increment the animation delay
                    delay += .04;
                    span.style.display = 'inline-block';
                    span.textContent = phrase[i].textContent;
                }
                title.appendChild(span);
            }
        } else {
            // player gets animation even though they lose
            for (let i = 0; i < phrase.length; i++) {
                const span = document.createElement('span');
                if (phrase[i].classList.contains('hide')) {
                    span.style.display = 'inline-block';
                    // the hop class will provide animation for each missing letter
                    span.classList.add('hop');
                }
                span.textContent = phrase[i].textContent === ' ' ? ' ': phrase[i].textContent;
                title.appendChild(span);
            }
        }
        const gameOverMessage = overlay.querySelector('h1');
        gameOverMessage.textContent = message;
        overlay.classList.remove('start');
        if (overlay.classList.contains('lose') && result === 'win') {
            overlay.classList.remove('lose');
        } else if (overlay.classList.contains('win') && result === 'lose') {
            overlay.classList.remove('win');
        }
        overlay.classList.add(result);
        // do not execute handleInteraction function if key is pressed on game over screen
        overlay.classList.add('disable-keys');
        this.resetGame();
    }
    // remove all css classes and html 
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
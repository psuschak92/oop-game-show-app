// create game object with added phrases
const game = new Game();
game.addPhrase(new Phrase('Under the weather'));
game.addPhrase(new Phrase('Easy does it'));
game.addPhrase(new Phrase('Long live the queen'));

const start = document.getElementById('btn__reset');
start.addEventListener('click', () => {
    game.startGame();
    // remove class when game starts over
    if (document.getElementById('overlay').classList.contains('disable-keys')) {
        document.getElementById('overlay').classList.remove('disable-keys');
    }
});

const keyRows = document.getElementById('qwerty');
keyRows.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        game.handleInteraction(event.target);
    }
});

const buttons = document.querySelectorAll('.keyrow button');
// listen for keystroke on body element
const body = document.querySelector('body');
body.addEventListener('keydown', event => {
    // the disable-keys class prevents handleInteraction from firing after the game is over
    const disableKeys = document.getElementById('overlay').classList.contains('disable-keys');
    buttons.forEach(button => {
        // only accept enabled alpha keys when game is in play
        if (button.textContent === event.key.toLowerCase() && button.disabled === false && !disableKeys) {
            game.handleInteraction(button);
        }
    });
});
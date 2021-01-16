// create game object with list of phrases
const game = new Game();
game.addPhrase(new Phrase('Better late than never'));
game.addPhrase(new Phrase('Bite the bullet'));
game.addPhrase(new Phrase('Break a leg'));
game.addPhrase(new Phrase('Hit the sack'));
game.addPhrase(new Phrase('Speak of the devil'));
game.addPhrase(new Phrase('Under the weather'));
game.addPhrase(new Phrase('Easy does it'));
game.addPhrase(new Phrase('Bazooka'));
game.addPhrase(new Phrase('Bedazzle'));
game.addPhrase(new Phrase('Long live the queen'));
game.addPhrase(new Phrase('Xylophone'));

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
    // handleInteraction can still get called after the game is over unless overlay has the following class
    const disableKeys = document.getElementById('overlay').classList.contains('disable-keys');
    buttons.forEach(button => {
        // only accept enabled alpha keys when game is in play
        if (button.textContent === event.key.toLowerCase() && button.disabled === false && !disableKeys) {
            game.handleInteraction(button);
        }
    });
});
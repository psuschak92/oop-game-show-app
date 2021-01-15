const game = new Game();
game.addPhrase(new Phrase('Better late than never'));
game.addPhrase(new Phrase('Bite the bullet'));
game.addPhrase(new Phrase('Break a leg'));
game.addPhrase(new Phrase('Hit the sack'));
game.addPhrase(new Phrase('Speak of the devil'));
game.addPhrase(new Phrase('Under the weather'));
game.addPhrase(new Phrase('Easy does it'));

const start = document.getElementById('btn__reset');
start.addEventListener('click', () => {
    game.startGame();
    document.getElementById('overlay').classList.remove('disable-keys');
});

const keyRows = document.getElementById('qwerty');
keyRows.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        game.handleInteraction(event.target);
    }
});

// grab all the buttons on the page
const buttons = document.querySelectorAll('.keyrow button');
// listen for a keystroke on the body element
const body = document.querySelector('body');
body.addEventListener('keydown', event => {
    const disableKeys = document.getElementById('overlay').classList.contains('disable-keys');
    buttons.forEach(button => {
        // only accept enabled alpha keys AND when the game is in play
        if (button.textContent === event.key.toLowerCase() && button.disabled === false && !disableKeys) {
            game.handleInteraction(button);
        }
    });
});
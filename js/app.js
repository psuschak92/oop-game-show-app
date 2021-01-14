const game = new Game();
const start = document.getElementById('btn__reset');
start.addEventListener('click', () => {
    game.startGame();
});

const keyRows = document.getElementById('qwerty');
keyRows.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        game.handleInteraction(event.target);
    }
});
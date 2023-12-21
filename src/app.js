// getting html elements
const playerElement = document.querySelector('#player');
const gameBoardElement = document.querySelector('#game-board');

const movePlayer = (direction) => {
    // calculation of player's new position
    const newPosition = playerElement.offsetLeft + direction * 10;

    // getting game's board position
    const {left, right} = gameBoardElement.getBoundingClientRect();
    const minLeft = playerElement.offsetWidth / 2;
    const maxRight = right - left - minLeft;

    // checking that the player's position doesn't cross the board field
    if(newPosition >= minLeft && newPosition < maxRight){
        playerElement.style.left = `${newPosition}px`;
    }
}

const handleKeyboard = (event) => {
    switch(event.code) {
        case 'ArrowLeft':  {movePlayer(-1); break;}
        case 'ArrowRight': {movePlayer(1);}
    }
}

//handling the keyboard
window.addEventListener('keydown', handleKeyboard);
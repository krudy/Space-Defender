// getting html elements
const playerElement = document.querySelector('#player');
const gameBoardElement = document.querySelector('#game-board');

const bullets = [];

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

const createBullet = () => {
    // bullet definition
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = `${playerElement.offsetLeft}px`;
    bullet.style.bottom = `${playerElement.offsetHeight}px`;

    // adding bullet to the gameboard area
    gameBoardElement.appendChild(bullet);
    bullets.push(bullet);

}

const handleKeyboard = (event) => {
    switch(event.code) {
        case 'ArrowLeft':  {movePlayer(-1); break;}
        case 'ArrowRight': {movePlayer(1); break;}
        case 'Space': createBullet();

    }
}

//handling the keyboard
window.addEventListener('keydown', handleKeyboard);

const moveBullets = () => {
    for(let i = 0; i < bullets.length; i++){
       const bullet = bullets[i];
       
       // moving bullet
       bullet.style.top = `${bullet.offsetTop - 10}px`
       
       // removing bullet if it is off the board
       if(bullet.offsetTop < 0 ){
           bullets.splice(i,1);
           i--;
           bullet.remove();
        }
    }
}

//intervals
setInterval(moveBullets, 50);
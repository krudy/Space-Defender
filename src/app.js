// getting html elements
const playerElement = document.querySelector('#player');
const gameBoardElement = document.querySelector('#game-board');

const bullets = [];
const enemies = [];

const movePlayer = (direction) => {
    // calculation of player's new position
    const newPosition = playerElement.offsetLeft + direction * 10;

    // getting game's board position
    const { left, right } = gameBoardElement.getBoundingClientRect();
    const minLeft = playerElement.offsetWidth / 2;
    const maxRight = right - left - minLeft;

    // checking that the player's position doesn't cross the board field
    if (newPosition >= minLeft && newPosition < maxRight) {
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
    switch (event.code) {
        case 'ArrowLeft': { movePlayer(-1); break; }
        case 'ArrowRight': { movePlayer(1); break; }
        case 'Space': createBullet();

    }
}

//handling the keyboard
window.addEventListener('keydown', handleKeyboard);

const moveBullets = () => {
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];

        // moving bullet
        bullet.style.top = `${bullet.offsetTop - 10}px`

        // removing bullet if it is off the board
        if (bullet.offsetTop < 0) {
            bullets.splice(i, 1);
            i--;
            bullet.remove();
        }
    }
}

const createEnemy = () => {

    const shouldCreate = Math.round(Math.random());
    if(!shouldCreate) return;

    //enemy definition
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.top = -40;
    enemy.style.left = `${Math.floor(Math.random() * (gameBoardElement.offsetWidth - 60) + 60)}px`;

    // adding nemy to the game area
    gameBoardElement.appendChild(enemy);
    enemies.push(enemy);
}

const moveEnemies = () => {
    for (let i = 0; i < enemies.length; i++){
        const enemy = enemies[i];

       //moving enemies
       enemy.style.top = `${enemy.offsetTop + 5}px`; 

       //removin enemies
       if(enemy.offsetTop >= gameBoardElement.offsetHeight){
        enemies.splice(i,1);
        enemy.remove();
        alert('GAME OVER');
       }
    }
}

//intervals
setInterval(moveBullets, 50);
setInterval(moveEnemies,300)
setInterval(createEnemy,1000);
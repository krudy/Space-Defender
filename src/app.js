// getting html elements
const playerElement = document.querySelector('#player');
const gameBoardElement = document.querySelector('#game-board');
const scoreCounterElement = document.querySelector('#pointsCounter');
const lifesElement = document.querySelector('#lifes');
const gameEndCardElement = document.querySelector('#game-end');
const gameStartCardElement = document.querySelector('#game-start');
const startAgainButton = document.querySelector('#buttonRestartGame');
const startButton = document.querySelector('#buttonStartGame');

const bullets = [];
const enemies = [];
let score = 0;
let lifes = 3;

const showLifes = () => {
    const html = Array(lifes)
        .fill(0)
        .map(element => '<div class="life"></div>' )
        .join('');

    lifesElement.innerHTML = html;
}

const movePlayerX = (direction) => {
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

const movePlayerY = (direction) => {
    // calculation of player's new position
    const newPosition = playerElement.offsetTop + direction * 10;
    const minTop = 0;
    const maxTop = gameBoardElement.offsetHeight - playerElement.offsetHeight;

    // checking that the player's position doesn't cross the board field
    if (newPosition >= minTop && newPosition < maxTop) {
        playerElement.style.top = `${newPosition}px`;
    }
}

const createBullet = () => {
    // bullet definition
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = `${playerElement.offsetLeft}px`;
    bullet.style.top = `${playerElement.offsetTop}px`;

    // adding bullet to the gameboard area
    gameBoardElement.appendChild(bullet);
    bullets.push(bullet);

}

const handleKeyboard = (event) => {
    switch (event.code) {
        case 'ArrowLeft': { movePlayerX(-1); break; }
        case 'ArrowRight': { movePlayerX(1); break; }
        case 'ArrowUp': { movePlayerY(-1); break; }
        case 'ArrowDown': { movePlayerY(1); break; }
        case 'Space': createBullet();

    }
}

//handling the keyboard
window.addEventListener('keydown', handleKeyboard);

const checkCollision = (bulletPosition, enemyPosition) => {
    return (bulletPosition.left > enemyPosition.left && bulletPosition.right < enemyPosition.right) && (bulletPosition.top < enemyPosition.bottom)
}

const makeExplosion = (leftPosition, topPosition) => {
    // explosion definition
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.left = `${leftPosition}px`;
    explosion.style.top = `${topPosition}px`;

    //adding explosion to the game area
    gameBoardElement.appendChild(explosion);

    //deleting explosion after 1 second 
    setTimeout(() => { explosion.remove(); }, 1000)

}

const addScore = (points = 0) => {
    score += points;
    scoreCounterElement.innerText = score;
}

const checkBulletCollision = (bullet) => {
    const position = bullet.getBoundingClientRect();

    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const enemyPosition = enemy.getBoundingClientRect();

        //checking that the missile and the enemy ship are in the same place
        if (checkCollision(position, enemyPosition)) {
            //bullet removal
            const bulletIndex = bullets.indexOf(bullet);
            bullets.splice(bulletIndex, 1);
            bullet.remove();

            //adding point
            addScore(1);

            //adding explosions
            makeExplosion(enemy.offsetLeft, enemy.offsetTop);

            //removal of a stricken ship
            enemies.splice(i, 1);
            enemy.remove();

            break;

        }
    }
}

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
        } else {
            checkBulletCollision(bullet);
        }

    }
}

const createEnemy = () => {

    const shouldCreate = Math.round(Math.random());
    if (!shouldCreate) return;

    //enemy definition
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.top = -40;
    enemy.style.left = `${Math.floor(Math.random() * (gameBoardElement.offsetWidth - 120) + 60)}px`;

    // adding nemy to the game area
    gameBoardElement.appendChild(enemy);
    enemies.push(enemy);
}

const moveEnemies = () => {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];

        //moving enemies
        enemy.style.top = `${enemy.offsetTop + 5}px`;

        //removin enemies
        if (enemy.offsetTop >= gameBoardElement.offsetHeight) {
            
            //deleting enemy
            enemies.splice(i, 1);
            enemy.remove();

            //reduction of life points
            lifes -= 1;
            showLifes();
            
            //ending the game
            if(lifes === 0) {
                gameOver();
            }
        }
    }
}

const startAgain = () => {
    window.location.reload();
}

let moveEnemiesInterval;
let createEnemyInterval;


const gameOver = () => {
    gameEndCardElement.style.display = 'block';
    clearInterval(moveEnemiesInterval);
    clearInterval(createEnemyInterval);
    gameBoardElement.style.animation = 'none';
}

const startGame = () => {

    gameStartCardElement.style.display = 'none';
 
    showLifes();
    //intervals

    setInterval(moveBullets, 50);
    moveEnemiesInterval = setInterval(moveEnemies, 200)
    createEnemyInterval = setInterval(createEnemy, 1000);
    

}



startButton.addEventListener('click', startGame);
startAgainButton.addEventListener('click', startAgain);
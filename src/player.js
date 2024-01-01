export default class Player {

    constructor(settings) {
        this.lifes = settings?.lifes || 3;
        this.score = 0;
        this.playerElement = settings.playerElement;
        this.gameBoardElement = settings.gameBoardElement;
        this.stage = 1;
    }

    getLifes(){
        return this.lifes;
    }

    setLifes(lifes){
        this.lifes = lifes;
    }

    getScore(){
        return this.score;
    }

    setScore(score){
        this.score = score;
    }

    addScore(points){
        this.score += points;
    }

    getStage() {
        return this.stage;
    }
    
    setStage(number) {
        this.stage += number;
    }

    
movePlayerX(direction) {
    // calculation of player's new position
    const newPosition = this.playerElement.offsetLeft + direction * 10;

    // getting game's board position
    const { left, right } = this.gameBoardElement.getBoundingClientRect();
    const minLeft = this.playerElement.offsetWidth / 2;
    const maxRight = right - left - minLeft;

    // checking that the player's position doesn't cross the board field
    if (newPosition >= minLeft && newPosition < maxRight) {
        this.playerElement.style.left = `${newPosition}px`;
    }
}

movePlayerY(direction) {
    // calculation of player's new position
    const newPosition = this.playerElement.offsetTop + direction * 10;
    const minTop = 0;
    const maxTop = this.gameBoardElement.offsetHeight - this.playerElement.offsetHeight;

    // checking that the player's position doesn't cross the board field
    if (newPosition >= minTop && newPosition < maxTop) {
        this.playerElement.style.top = `${newPosition}px`;
    }
}
}
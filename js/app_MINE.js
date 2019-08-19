////-----------------Enemy------------------////


var Enemy = function(x, y, speed) {

    this.x = x;
    this.y = y;

    this.sprite = 'images/enemy-bug.png';

    this.width = 80;
    this.height = 50;

    this.speed = 1;
    this.speed = (Math.random() + 1) * this.speed * 200;
};



Enemy.prototype.update = function(dt) {

    if (this.x < 500) {
        this.x += this.speed * (dt);
    } else {
        this.x = -200;
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



let allEnemies = [
    new Enemy(-200, 55, 1),
    new Enemy(-200, 138, 1),
    new Enemy(-200, 221, 1)
];














////-----------------player------------------////
const blockWidth = 101
const blockHeight = 83
var Player = function(x,y){
	
	// coordinates
	this.x = x;
	this.y = y;
	
	// score
	this.score = score;
	
	//width ,height
	this.width = width;
	this.height = height;
	
	//initial speed
	this.speed = 1
	
}

Player.prototype.handleInput = function(direction){
	
	(direction === 'right'	&& this.x < 404 )? this.x+ = blockWidth
	(direction === 'left'	&& this.x > 0	)? this.x- = blockWidth
	(direction === 'up'		&& this.x > 0	)? this.y- = blockHeight
	(direction === 'down'	&& this.x < 404	)? this.y- = blockHeight
}


// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
	
 if (this.y<=0){
	 this.reset(202, 415)
	 this.score += 1
	 document.querySelector("#score").innerText = this.score;
	 
 }

};

Player.prototype.reset = function(x, y) {
    if (this.y> 0) {
        this.score -= 1;
        document.querySelector('score').innerText = this.score;
    }
    this.x = x;
    this.y = y;
};

let player = Player(202,415)
















function checkCollisions(allEnemies, player) {
    for (let i = 0; i < 3; i++) {

        if (	allEnemies[i].x		>	101		&&
				allEnemies[i].x		<	151		&&
				allEnemies[i].y+28	==	player.y		
		
		) {
            player.reset(202, 415);
        }
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

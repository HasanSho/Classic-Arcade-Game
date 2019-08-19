////-----------------Enemy------------------////

let Enemy = function(x, y) {

    this.x = x;
    this.y = y;

    this.sprite = 'images/enemy-bug.png';
   // initial speed [20] plus a random speed in range [0 80]
    this.speed = (Math.random()) * 80+20;
};



Enemy.prototype.update = function(dt) {

		(this.x < 600)?
			this.x += this.speed * (dt)
				:
				this.x = -100;

};

// Draw the Enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




////-----------------player------------------////

var Player = function(x,y){
	
	// coordinates
	this.x = x;
	this.y = y;
	
	// score
	this.score = 0;
	
	this.sprite = 'images/char-boy.png';
}


Player.prototype.handleInput = function(key){
	
	if(key === 'right'	&& this.x < 404 ) {this.x += 101}; //blockWidth = 101
	if(key === 'left'	&& this.x > 0	) {this.x -= 101}; //blockWidth = 101
	if(key === 'up'		&& this.y > 0	) {this.y -= 83}; //blockHeight = 83
	if(key === 'down'	&& this.y < 404	) {this.y += 83}; //blockHeight = 83
}


// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
 if (this.y<0){
		this.reset(202, 404)
		// I made the score is relevant to speed of every enemy
		let Score=0
		for(let enemy of allEnemies){
			Score+=enemy.speed;
			// increasing speed for all enemies.. random increasing between 0 and 60

			enemy.speed += Math.random()*60;
			}

		this.score+=Math.round(Score/8)

		document.querySelector("#score").innerText = this.score;
	 
 }

};

let bScoreSpan=document.querySelector('#bestScore')
if(localStorage.bestscore){bScoreSpan.innerText=localStorage.bestscore}

Player.prototype.reset = function(x, y) {
    if (this.y> 0) {
		
		if(!localStorage.bestscore){localStorage.bestscore=this.score}
		else{if(localStorage.bestscore<this.score){localStorage.bestscore=this.score;}}
		document.querySelector('#bestScore').innerText=localStorage.bestscore

        this.score = 0;
        document.querySelector('#score').innerText = this.score;
		for(let enemy of allEnemies){enemy.speed = (Math.random()) * 80+20}


    }
    this.x = x;
    this.y = y;
};


let allEnemies = [
    new Enemy(-100, 55),
    new Enemy(-100, 138),
    new Enemy(-100, 221),
	new Enemy(-100, 221)
];



let player = new Player(202,404)




function checkCollisions(allEnemies, player) {
	
	for(enemy of allEnemies){
		// 80 is my enemy image width
		if ( enemy.x + 80	>	player.x && // right edge of enemy img > left edge of player img
			 enemy.x		<	player.x+50	&& // left edge of enemy img < right edge of player img {I put 50 instead of 80 to make it easear for player if he toutched a few pixels of back of the bug}
			 enemy.y + 17	==	player.y // 17 is the differences between My enemy y and player y 
			){
				player.reset(202, 404);
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



// additional features


 //-------player charachters------//
 
 //player charachters div
let ch=document.querySelector('#ch') 

// charachters array (its used also in enging.js in line 175 >>>>>Resources.load(charachters);)
 const charachters=[
'images/stone-block.png',
'images/water-block.png',
'images/grass-block.png',
'images/enemy-bug.png',
'images/char-boy.png',
'images/char-cat-girl.png',
'images/char-horn-girl.png',
'images/char-pink-girl.png',
'images/char-princess-girl.png'
]
	
// creating img element for charachters
// appending them to 'ch' div
// adding resources from charachters's array
for(let i=0 ;i<4;i++){
	let imgElement=document.createElement('img')
	ch.appendChild(imgElement)
	ch.children[i+1].src=charachters[i+5]
}

// addEventListener for charachters images
ch.addEventListener('click',function(e){
	if(e.target.nodeName==='IMG'){
		//e.target.src >> gave me full url {file:///c:/....}
		//and didn't work!! so I had to split it and after that I took last element
	let imgUrl=(e.target.src).split('/') 
	player.sprite = 'images/'+imgUrl[imgUrl.length-1]

	}
})

// 'reset Best score' button
	resetB.addEventListener('click',function(){
	if(localStorage.bestscore){
		localStorage.bestscore=0;
		bScoreSpan.innerText=0;
		alert('cleared')
		}
	})




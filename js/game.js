// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

// stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

// monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var princess = {};
var stone = {};
var monster={};
var monster1 = {};
var monster2 = {};
var monster3 = {};
var princessesCaught = 0;
var heroDeads = 0;
var stage =1;


// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function areTheyTouching(char1,char2){
	if (char1.x <= (char2.x + 32)
	    && char2.x <= (char1.x + 32)
            && char1.y <= (char2.y + 32)
	    && char2.y <= (char1.y + 32)){
		return true;
        }else{
	        return false;
        }

};

// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	if (princessesCaught>9){
		stage =2;
	};

	if (stage ==1){
		// Throw the princess somewhere on the screen randomly
		princess.x = 32 + (Math.random() * (canvas.width - 90));
		princess.y = 32 + (Math.random() * (canvas.height - 98));
		// And the stones and monsters too
		solape = true;
		while (solape == true){

			   monster.x = 32 + (Math.random() * (canvas.width - 90));
			   monster.y = 32 + (Math.random() * (canvas.height - 98));
		           stone.x = 32 + (Math.random() * (canvas.width - 90));
			   stone.y = 32 + (Math.random() * (canvas.height - 98));
			   if(areTheyTouching(princess,stone) && areTheyTouching(princess,monster)
			      && areTheyTouching(monster,stone)){
			   	solape = true;
			   }else{
			        solape = false;
			   }
		}
	}else if (stage == 2){
		// Throw the princess somewhere on the screen randomly
		princess.x = 32 + (Math.random() * (canvas.width - 90));
		princess.y = 32 + (Math.random() * (canvas.height - 98));
		// And the stones and monsters too
		solape = true;
		while (solape == true){

			   monster1.x = 32 + (Math.random() * (canvas.width - 90));
			   monster1.y = 32 + (Math.random() * (canvas.height - 98));
			   monster2.x = 32 + (Math.random() * (canvas.width - 90));
			   monster2.y = 32 + (Math.random() * (canvas.height - 98));
			   monster3.x = 32 + (Math.random() * (canvas.width - 90));
			   monster3.y = 32 + (Math.random() * (canvas.height - 98));
		     stone.x = 32 + (Math.random() * (canvas.width - 90));
			   stone.y = 32 + (Math.random() * (canvas.height - 98));
			   if(areTheyTouching(princess,stone) && areTheyTouching(princess,monster1)
			      && areTheyTouching(monster1,stone)&& areTheyTouching(princess,monster2)
			      && areTheyTouching(monster2,stone)&& areTheyTouching(princess,monster3)
			      && areTheyTouching(monster3,stone)){
			   	solape = true;
			   }else{
			        solape = false;
			   }
		}
	};

};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown && hero.y>35) { // Player holding up
			hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown && hero.y<410) { // Player holding down
			hero.y += hero.speed * modifier;
	}
	if (37 in keysDown && hero.x>35) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown && hero.x<445) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	if (83 in keysDown) { // Press S to save
		localStorage.setItem("stage",stage);
		localStorage.setItem("princessesCaught",princessesCaught);
		localStorage.setItem("heroDeads",heroDeads);
	}
	if (76 in keysDown) { // Press L to load
		stage = localStorage.getItem("stage");
		princessesCaught = localStorage.getItem("princessesCaught");
		heroDeads = localStorage.getItem("heroDeads");
		reset();
	}

	// Are they touching?
	if (
		areTheyTouching(hero,princess)
	) {
		++princessesCaught;

		reset();
	}
        //Are the hero touching a stone?
	if (
		areTheyTouching(hero,stone)
                && 40 in keysDown ||
		areTheyTouching(hero,stone)
                && 39 in keysDown

	) {
		hero.x -= 1;
		hero.y -= 1;
	}

	if (
		areTheyTouching(hero,stone)
                && 38 in keysDown ||
		areTheyTouching(hero,stone)
                && 37 in keysDown

	) {
		hero.x += 1;
		hero.y += 1;
	}

	//Is the hero dead?
	function heroDie(monster){
		if(areTheyTouching(hero,monster)
		) {
			heroDeads++;
			reset();
		}
	}

	heroDie(monster);
	heroDie(monster1);
	heroDie(monster2);
	heroDie(monster3);
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

	if (stoneReady){
		ctx.drawImage(stoneImage, stone.x, stone.y);
	}

	if (monsterReady){
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (monsterReady && stage ==2){
		ctx.drawImage(monsterImage, monster1.x, monster1.y);
	}

	if (monsterReady && stage ==2){
		ctx.drawImage(monsterImage, monster2.x, monster2.y);
	}

	if (monsterReady && stage ==2){
		ctx.drawImage(monsterImage, monster3.x, monster3.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught + " stage: " + stage + " dead:" + heroDeads, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible

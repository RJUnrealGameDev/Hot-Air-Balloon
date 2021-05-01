var balloon,balloonImage1,balloonImage2;
var database;

function preload(){
    bg = loadImage("cityImage.png");
    balloonImage1 = loadAnimation("hotairballoon1.png");
    balloonImage2 = loadAnimation("hotairballoon1.png","hotairballoon1.png",
    "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
    "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

function setup() {
  	database = firebase.database();
  	createCanvas(1500,700);

  	balloon = createSprite(250,450,150,150);
  	balloon.addAnimation("hotAirBalloon",balloonImage1);
  	balloon.scale = 0.5;

	var BalloonPosition = database.ref('balloonPos/position');
	var BalloonScale = database.ref('balloonScl/size');
  	BalloonPosition.on("value", readVector2D, readScale, showError);

  	textSize(20);
}

function draw() {
  	background(bg);

  	if(keyDown(LEFT_ARROW)){
    	balloon.addAnimation("hotAirBalloon",balloonImage2);
    	writeVector2D(-5,0);
  	}
  	else if(keyDown(RIGHT_ARROW)){
    	balloon.addAnimation("hotAirBalloon",balloonImage2);
    	writeVector2D(5,0);
  	}
  	else if(keyDown(UP_ARROW)){
    	balloon.addAnimation("hotAirBalloon",balloonImage2);
    	writeVector2D(0,-5);
		writeScale(-2);
  	}
  	else if(keyDown(DOWN_ARROW)){
    	balloon.addAnimation("hotAirBalloon",balloonImage2);
    	writeVector2D(0,5);
		writeScale(2);
  	}

  	drawSprites();
  	fill(0);
  	stroke("white");
  	textSize(25);
  	text("Use arrow keys to move Hot Air Balloon!",40,40);
}

function writeVector2D(x,y){
	database.ref('balloonPos/position').set({
		'x': position.x + x ,
		'y': position.y + y
	})
}

function writeScale(scl){
	database.ref('balloonScl/size').set({
		'x': size.x + scl,
		'y': size.y + scl
	})
}

function readVector2D(data){
	position = data.val();
	balloon.x = position.x;
	balloon.y = position.y;
}

function readScale(data){
	size = data.val();
	balloon.x = size.x;
	balloon.y = size.y;
}

function showError(){
	console.log("Error in writing to the database");
}

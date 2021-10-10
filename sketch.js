var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg1 =loadImage("1.png");
   balloonImage1=loadAnimation("2.png");
   balloonImage2=loadAnimation("2.png","2.png","2.png","3.png","3.png",
   "3.png");
  }

//Function to set initial environment
function setup() {

  database = firebase.database();
  console.log(database);

  createCanvas(1500,700);
  
  bg = createSprite(750,350);
  bg.addImage(bg1);
  bg.scale = 1.5;

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);



  textSize(20); 
}

// function to display UI
function draw() {
  background("white");
  if(height!=undefined){

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
}
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

 function updateHeight(x,y){
   database.ref('balloon/height').set({
     'x': height.x + x ,
     'y': height.y + y
   })
 }


//CHOOSE THE CORRECT READHEIGHT FUNCTION
 function readHeight(data){
   height = data.val();
   balloon.x = height.x;
   balloon.y = height.y;
 }
function showError(){
  console.log("Error in writing to the database");
}
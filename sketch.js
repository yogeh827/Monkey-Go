var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running
var ground, invisibleGround;
var banana, bananaImage, FoodGroup
var obstacle, obstacleImage, obstacleGroup

var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(150,340 );
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.2;
  
  ground = createSprite(300,400,600,15);
 ground.x = ground.width /2;
  
  invisibleGround = createSprite(300,390,600,15);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

   
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false
  
  score = 0;
}


function draw() {
 
  background("white");
   text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){

   
    
    ground.velocityX = -(4 + 3* score/100)
    
    if (monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score = score+1;
      
    }
    
   
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
   if(keyDown("space")){
     monkey.velocityY = -30;
   }
    
    
    monkey.velocityY = monkey.velocityY + 0.8
  
    Food();
  
   
    Obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
       
       
        gameState = END;
       
      
    }
  }
 
  else if (gameState === END) {
      
     
    
      
    
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
     
  
   }
  
  
  drawSprites();
  
  monkey.collide(invisibleGround);
}

function Obstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(500,350);
   obstacle.velocityX = -(6 + score/100);
    
   obstacle.addImage( obstaceImage);
  obstacle.scale = 0.2;
    obstacle.lifetime = 300;
  
    obstacleGroup.add(obstacle);
  
  } 
}


function Food(){
  if (frameCount % 80 === 0) {
  var   bannana = createSprite(600,120);
    bannana.y = Math.round(random(120,200));
    bannana.addImage(bananaImage);
    bannana.scale = 0.1;
    bannana.velocityX = -3;
    
    
    bannana.lifetime = 200;
    
   
    
   
    FoodGroup.add(bannana);
  }  
}


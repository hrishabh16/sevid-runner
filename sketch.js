var PLAY = 1;
var END = 0;
var gameState = PLAY;
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameover,gameoverImg;
var restart,restartImg;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameoverImg =loadImage("gameOver.png");
  boystop = loadImage("runner1.png")
  restartImg = loadImage("restart.png")
  
}
function setup(){
  
  createCanvas(400,600);
// Moving background

path=createSprite(200,200);
    path.addImage(pathImg);
//creating boy running

  boy = createSprite(70,550,20,20);
    boy.addAnimation("SahilRunning",boyImg);
    boy.scale=0.08;
  
 
  
  gameover = createSprite(200,200,20,20);
  gameover.addImage(gameoverImg);
  
  restart = createSprite(200,300,200,200)
  restart.addImage(restartImg);
  restart.scale = 0.5
  restart.visible = false;
  
  if(mousePressedOver(restart)){
    reset();
  }
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

boy.setCollider("circle",0,0,400)
 
}

function draw() {
   gameover.visible = false;
  
  if(gameState === PLAY){
    boy.x = World.mouseX;
    path.velocityY = 8;
   
  

    createCash();
    
    createDiamonds();
    
    createJwellery();
    
    createSword();
    
    
    
if(boy.isTouching(swordGroup)){
        gameState = END;

    }
  }
   else if (gameState === END) {
    path.velocityY = 0;
     
    boy.velocityY = 0
     gameover.visible = true;
    
     
       cashG.destroyEach();
       diamondsG.destroyEach();
       jwelleryG.destroyEach();
    restart.visible = true;
     if(mousePressedOver(restart)){
       reset();
     }
     if(keyDown("space")){
       reset();
     }
   }
     
   
  
  
  

  background(0);
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 600 ){
    path.y = height/4;
  }
  
    

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+5
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+50
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+20
    }else 
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
    }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,15,30);
  

}

function createCash() {
  if (World.frameCount % 130 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 9;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 70 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 9;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 90 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 9;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 30 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 9;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
function reset(){
   gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  boy.addAnimation("SahilRunning",boyImg);
  boy.x = World.mouseX;
    path.velocityY = 4;
  treasureCollection = 0;
}

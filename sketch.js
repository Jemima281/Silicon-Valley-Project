let ground;
let lander, landerGroup;
var lander_img;
var bg_img;
var invisGround
var gameState = "Start"
var score = 0;
var endGround
var meteor, meteorImg,landerImg2, meteorGroup
var game_difficulty
var score_increase = 5



var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  meteorImg = loadImage("Meteor.png")
  landerImg2 = loadImage("explosion.png")
}

function setup() {
  createCanvas(1000,700);
  
  frameRate(80);
  lander = createSprite(random(50,900),50,30,30);
  lander.addImage("boom",landerImg2)
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle", 40,40,600,600)
  lander.lifetime = 200
  landerGroup = new Group()
  lander.visible = false



  meteor = createSprite(random(50,900),50,30,30);
  meteor.addImage(meteorImg);
  meteor.scale = 0.1;
  meteor.setCollider("rectangle", 40,40,600,600)
  meteor.lifetime = 200
  meteorGroup = new Group()
  meteor.visible = false


  invisGround = createSprite(500,600,300,30);
  endGround = createSprite(500,690,1000,10)
  endGround.visible = false



  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  if(gameState === "Start"){
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  text("Score: "+score,100,75)
  pop();
  invisGround.x = mouseX
  spawnLander()
  spawnMeteor()





  

  if(lander.isTouching(invisGround) === true){
    lander.collide(invisGround)
    lander.destroy()
    vy = 0
    score += 1
    score_increase += 1
  }
  if(meteor.isTouching(endGround) === true){
    meteor.collide(endGround)
    meteor.destroy()
    score += 1
    score_increase +=1
  }
  console.log(score_increase)

  //fall down
  vy +=g;

  if(lander.isTouching(endGround)){
    gameState = "end"
    swal({
      title: `Game Over`,
      text: "Oops, a lander fell off the Moon!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
      
    });

    
    }
    if(meteor.isTouching(invisGround)){
      gameState = "end"
      swal({
        title: `Game Over`,
        text: "Oops, you hit a meteor !!!",
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
  
      
      }
    drawSprites();
  }
}

function spawnLander(){
  if(frameCount % 130 === 0){
    lander = createSprite(random(50,900),50,30,30);
    lander.velocityY = (6+score_increase/2)
    lander.addImage(lander_img);
    lander.scale = 0.1;
    lander.visible = true
    lander.setCollider("rectangle", 40,40,600,600)
    lander.lifetime = 200
    landerGroup.add(lander)
  }
}

function spawnMeteor(){
  if(frameCount % 170 === 0){
    meteor = createSprite(random(50,900),50,30,30);
    meteor.velocityY = (6+score_increase/2)
    meteor.addImage(meteorImg);
    meteor.scale = 0.1;
    meteor.visible = true
    meteor.setCollider("rectangle", 40,40,600,600)
    meteor.lifetime = 200
    meteorGroup.add(meteor)
  }
}






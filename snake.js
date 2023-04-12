const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
class SnakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
let score=0;
let speed=7;
let tileCount=20;
let tileSize=canvas.width/tileCount -2;
let headX=10;
let headY=10;
const snakeParts=[];
let tailLength=2;
let xvelocity=0;
let yvelocity=0;
let appleX=5;
let appleY=5;
let gulp=new Audio("gulp.mp3");
function drawGame(){
    changeSnakePosition();
    let result=isGameOver();
    if(result)
    {
        return;
    }
   clearScreen();
  
   checkAppleCollusion();
   drawApple();
   drawSnake();
   drawScore();
   setTimeout(drawGame,1000/speed);
   if(score>2){
    speed=11;
   }
   if(score>5){
    speed=15;
   }
}
function isGameOver(){
    let gameOver=false;
    if(yvelocity==0 && xvelocity==0)
    return false;
    if(headX<0){
        gameOver=true;  
      }
    else if(headX>=tileCount)
      {
        gameOver=true;
      }
     else if( headY<0){
        gameOver=true;
     }
     else if(headY>=tileCount)
     {
        gameOver=true
     }
     for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i];
        if(part.x==headX && part.y==headY){
            gameOver=true;
            break;
        }
     }
      if(gameOver){
        ctx.fillStyle='yellow';
        ctx.font='50px Verdana'
        ctx.fillText("GameOver!",canvas.width/6.5,canvas.height/2);
      }
      return gameOver;
}
function clearScreen(){
    ctx.fillStyle='black';
    
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
function drawScore(){
    ctx.fillStyle='white';
    ctx.font='10px Verdana';
    ctx.fillText("Score "+score,canvas.width-50,10);

}
function drawSnake(){
    ctx.fillStyle='purple';
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);
    ctx.fillStyle='green';
    for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i];
        ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize);
    }
    snakeParts.push(new SnakePart(headX,headY));
    while(snakeParts.length>tailLength)
    {
        snakeParts.shift();
    }
    ctx.fillStyle='purple';
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);

}
function changeSnakePosition(){
    headX=headX+xvelocity;
    headY=headY+yvelocity;
}
function drawApple(){
    ctx.fillStyle='red';
    ctx.fillRect(appleX *tileCount,appleY*tileCount,tileSize,tileSize);
}
function checkAppleCollusion(){
    if(appleX==headX && appleY==headY){
        appleX=Math.floor(Math.random()* tileCount);
        appleY=Math.floor(Math.random()* tileCount);
        tailLength++;
        score++;
        gulp.play();
    }
}
document.body.addEventListener('keydown',keyDown);
function keyDown(event){
    if(event.keyCode ==38){
        if(yvelocity==1)
        return;
        yvelocity=-1;
        xvelocity=0;
    }
    if(event.keyCode ==40){
        if(yvelocity==-1)
        return;
        yvelocity=1;
        xvelocity=0;
    }
    if(event.keyCode ==37){
        if(xvelocity==1)
        return;
        yvelocity=0;
        xvelocity=-1;
    }
    if(event.keyCode ==39){
        if(xvelocity==-1)
        return;
        yvelocity=0;
        xvelocity=1;
    }
}
drawGame();

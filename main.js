let canvas = document.getElementById("canvas");
canvas.width = 1750;
canvas.height = 840;
let ctx = canvas.getContext("2d");
let fps = 1;
let vMult = 30/fps
let images = {
  bg1: "./images/backgroundHD.png",
  bg2: "./images/sunsetHD.png",
  env: "./images/environmentHD.png"
};

class Environment {
  constructor() {
    this.image = new Image();
    this.image.src = images.env;
    this.draw = () => {
      ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    };
  }
}

function KeyLayout() {
  this.keywidth = 140;
  this.keyheight = 145;
  this.font = '35px "Duck Hunt"'
  this.keys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "?", "¿"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "´", "+"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "{"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "-"]
  ];
  this.draw = function(color="white") {
    ctx.strokeStyle = color;
    for (i = 0; i < 12; i++) {
      ctx.strokeRect(0 + i * this.keywidth, 0, this.keywidth, this.keyheight);
    }
    for (i = 0; i < 12; i++) {
      ctx.strokeRect(
        this.keywidth * 0.5 + i * this.keywidth,
        this.keyheight,
        this.keywidth,
        this.keyheight
      );
    }
    for (i = 0; i < 11; i++) {
      ctx.strokeRect(
        this.keywidth + i * this.keywidth,
        this.keyheight * 2,
        this.keywidth,
        this.keyheight
      );
    }
    for (i = 0; i < 10; i++) {
      ctx.strokeRect(
        this.keywidth * 1.5 + i * this.keywidth,
        this.keyheight * 3,
        this.keywidth,
        this.keyheight
      );
    }
    ctx.textAlign = "center"
    ctx.fillStyle = color
    ctx.font = this.font
    ctx.textBaseline = "middle"
    for (l in this.keys[0]) {
      ctx.fillText(this.keys[0][l],this.keywidth*0.5+l*this.keywidth,this.keyheight*0.5)
    }
    for (l in this.keys[1]) {
      ctx.fillText(this.keys[1][l],this.keywidth*1+l*this.keywidth,this.keyheight*1.5)
    }
    for (l in this.keys[2]) {
      ctx.fillText(this.keys[2][l],this.keywidth*1.5+l*this.keywidth,this.keyheight*2.5)
    }
    for (l in this.keys[3]) { 
      ctx.fillText(this.keys[3][l],this.keywidth*2+l*this.keywidth,this.keyheight*3.5)
    }


  };
}
function Obstacle(x,y,w,h,color='white') {
  this.color = color
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  this.keywidth = 140;
  this.keyheight = 145;

  this.draw = function() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x,this.y,this.w,this.h)
  }
}
function Duck(){
  this.x = 100
  this.y = 100
  this.r = 50
  this.vx = vMult
  this.vy = vMult
  this.color = 'green'
  this.drawCircle = ()=>{
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}



let environment = new Environment();
let keylayout = new KeyLayout();
let obstacles = []
let duck = new Duck()


function start() {
  setInterval(update, 1000 / fps);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  keylayout.draw('rgb(255,255,255,0.5)');
  for (o in obstacles) {
    obstacles[o].draw()
  }
  duck.drawCircle()
  // environment.draw();
}


function createObstacles(color) {     
  let keywidth = 140;
  let keyheight = 145;
  let bar = 20
  let overbar = 10
  obstacles.push(new Obstacle(0,keyheight,keywidth*0.5,keyheight,color))
  obstacles.push(new Obstacle(0,keyheight*2,keywidth,keyheight,color))
  obstacles.push(new Obstacle(0,keyheight*3,keywidth*1.5,keyheight,color))
  obstacles.push(new Obstacle(canvas.width-keywidth*0.5,0,keywidth*0.5,keyheight,color))
  obstacles.push(new Obstacle(canvas.width-keywidth*0.5,keyheight*2,keywidth*0.5,keyheight,color))
  obstacles.push(new Obstacle(canvas.width-keywidth,keyheight*3,keywidth,keyheight,color))
  obstacles.push(new Obstacle(0,keyheight*4,canvas.width,bar,color))
  //screen margins
  obstacles.push(new Obstacle(0,overbar-bar,canvas.width,bar,color))
  obstacles.push(new Obstacle(overbar-bar,0,bar,keyheight,color))
  obstacles.push(new Obstacle(canvas.width-overbar,keyheight,bar+overbar,keyheight,color))
  
}

createObstacles('rgb(255,255,255,0.5)')
start();


let canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");
sprites = {
  dogwalk: {
    src: "./images/dogwalking.png",
    w: 520,
    h: 420,
    f: [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,4,4,4,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0]
  },
  dogbarking: {
    src: "./images/dogbarking.png"
  },
  gducksR:{
    src: "./images/gducksR.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3] 
  },
  gducksL:{
    src: "./images/gducksL.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3] 
  },
  rducksR:{
    src: "./images/rducksR.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3] 
  },
  rducksL:{
    src: "./images/rducksL.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3] 
  },
  pducksR:{
    src: "./images/pducksR.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3] 
  },
  pducksL:{
    src: "./images/pducksL.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3] 
  }
};

function Horse(x=0,y=0) {
  this.x = x;
  this.y = y;
  this.w = 131.25
  this.h = 141.75
  this.image = new Image();
  this.sc = 0;
  this.animate = sprite => {
    this.image.src = sprite.src;
    ctx.drawImage(this.image, sprite.w * sprite.f[this.sc], 0, sprite.w, sprite.h, this.x, this.y, this.w, this.h);
    this.sc++;
    if (this.sc >= sprite.f.length) {
      this.sc = 0;
    }
  };
}

let horse1 = new Horse();
let horse2 = new Horse(150,0)
let horse3 = new Horse(300,0)
let horse4 = new Horse(450,0)

function start() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  horse1.animate(sprites.gducksR);
  horse2.animate(sprites.gducksL);
  horse3.animate(sprites.rducksR);
  horse4.animate(sprites.rducksL);
}
setInterval(start, 1000 / 20);

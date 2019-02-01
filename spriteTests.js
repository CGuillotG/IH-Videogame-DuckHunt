let canvas = document.getElementById("canvas");
canvas.width = 900;
canvas.height = 900;
let ctx = canvas.getContext("2d");
sprites = {
  dogwalk: {
    src: "./images/dogwalking.png",
    w: 520,
    h: 420,
    f: [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,4,4,4,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0]
  },
  dogbarking: {
    src: "./images/dogbarking.png",    
    w: 530,
    h: 450,
    f: [0],
    k: 'w'
  },
  gducksR:{
    src: "./images/gducksR.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3],
    k:'w'
  },
  gducksL:{
    src: "./images/gducksL.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3],
    k:'w'
  },
  rducksR:{
    src: "./images/rducksR.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3],
    k:'w'
  },
  rducksL:{
    src: "./images/rducksL.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3],
    k:'w'
  },
  pducksR:{
    src: "./images/pducksR.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3],
    k:'w'
  },
  pducksL:{
    src: "./images/pducksL.png",
    w:350,
    h:378,
    f: [0,0,1,1,2,2,1,1,0,0,1,1,2,2,1,1,0,0,1,1,2,2,3,3],
    k:'w'
  },
  gducksUpR:{
    src: "./images/gducksUpR.png",
    w:320,
    h:400,
    f: [0,0,1,1,2,2,1,1],
    k:'h'
  },
  gducksUpL:{
    src: "./images/gducksUpL.png",
    w:320,
    h:400,
    f: [0,0,1,1,2,2,1,1],
    k:'h'
  },
  rducksUpR:{
    src: "./images/rducksUpR.png",
    w:320,
    h:400,
    f: [0,0,1,1,2,2,1,1],
    k:'h'
  },
  rducksUpL:{
    src: "./images/rducksUpL.png",
    w:320,
    h:400,
    f: [0,0,1,1,2,2,1,1],
    k:'h'
  },
  pducksUpR:{
    src: "./images/pducksUpR.png",
    w:320,
    h:400,
    f: [0,0,1,1,2,2,1,1],
    k:'h'
  },
  pducksUpL:{
    src: "./images/pducksUpL.png",
    w:320,
    h:400,
    f: [0,0,1,1,2,2,1,1],
    k:'h'
  },
  gduckFlyAway:{
    src: "./images/gduckFlyAway.png",
    w:320,
    h:310,
    f: [0,0,1,1,2,2,1,1],
    k:'w'
  },
  rduckFlyAway:{
    src: "./images/rduckFlyAway.png",
    w:320,
    h:310,
    f: [0,0,1,1,2,2,1,1],
    k:'w'
  },
  pduckFlyAway:{
    src: "./images/pduckFlyAway.png",
    w:320,
    h:310,
    f: [0,0,1,1,2,2,1,1],
    k:'w'
  },
  gducksFalling:{
    src: "./images/gducksFalling.png",
    w:200,
    h:330,
    f: [0,0,0,1,1,1,2,2,2,3,3,3],
    k:'h'
  },
  rducksFalling:{
    src: "./images/rducksFalling.png",
    w:200,
    h:330,
    f: [0,0,0,1,1,1,2,2,2,3,3,3],
    k:'h'
  },
  pducksFalling:{
    src: "./images/pducksFalling.png",
    w:200,
    h:330,
    f: [0,0,0,1,1,1,2,2,2,3,3,3],
    k:'h'
  }

};

function Horse(x=0,y=0) {
  this.x = x;
  this.y = y;
  this.w = 130
  this.h = 140
  this.image = new Image();
  this.sc = 0;
  this.animate = sprite => {
    this.image.src = sprite.src;
    if(sprite.k === 'h') {
      this.h = 140
      this.w = (this.h*sprite.w)/sprite.h
    } else if (sprite.k === 'w'){
      this.w = 130
      this.h = (this.w*sprite.h)/sprite.w
    }
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
let horse5 = new Horse(0,150)
let horse6 = new Horse(150,150)
let horse7 = new Horse(300,150)
let horse8 = new Horse(450,150)
let horse9 = new Horse(0,300)
let horse10 = new Horse(150,300)
let horse11 = new Horse(300,300)
let horse12 = new Horse(450,300)
let horse13 = new Horse(0,450)
let horse14 = new Horse(150,450)
let horse15 = new Horse(300,450)
let horse16 = new Horse(0,600)
let horse17 = new Horse(150,600)
let horse18 = new Horse(300,600)
let horse19 = new Horse(450,600)
let horse20 = new Horse(600,600)

function start() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  horse1.animate(sprites.gducksR);
  horse2.animate(sprites.gducksL);
  horse3.animate(sprites.rducksR);
  horse4.animate(sprites.rducksL);
  horse5.animate(sprites.pducksR);
  horse6.animate(sprites.pducksL);
  horse7.animate(sprites.gducksUpR);
  horse8.animate(sprites.gducksUpL);
  horse9.animate(sprites.pducksUpR);
  horse10.animate(sprites.pducksUpL);
  horse11.animate(sprites.rducksUpR);
  horse12.animate(sprites.rducksUpL);
  horse13.animate(sprites.gduckFlyAway);
  horse14.animate(sprites.rduckFlyAway);
  horse15.animate(sprites.pduckFlyAway);
  horse16.animate(sprites.gducksFalling);
  horse17.animate(sprites.rducksFalling);
  horse18.animate(sprites.pducksFalling);  
  horse19.animate(sprites.dogwalk);
  horse20.animate(sprites.dogbarking);
}
setInterval(start, 1000 / 20);

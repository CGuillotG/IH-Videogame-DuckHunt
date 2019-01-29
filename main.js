let canvas = document.getElementById("canvas");
canvas.width = 1750;
canvas.height = 840;
let ctx = canvas.getContext("2d");
let fps = 30;
let images = {
  bg1: "./images/backgroundHD.png"
};

function Background() {
  this.x = 0;
  this.y = 0;
  this.w = canvas.width;
  this.h = canvas.height;
  this.image = new Image();
  this.image.src = "./images/backgroundHD.png";
  this.draw = function() {
    // console.log(this.image + " - " + this.x + " - " + this.y + " - " + this.w + " - " + this.h)
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };
  //this.image.onload = this.draw.bind(this);
}
function Keyboard() {
  this.draw = function() {
    ctx.strokeStyle = "green";
    ctx.strokeRect(0, 0, 120, 120);
  };
}

class Dog {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 500;
    this.h = 500;
    this.image = new Image();
    this.sprite = {
      //'./images/dogsniffingHD.png',
      src:
        "http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/downloads/sprite-animation-demo/images/coin-sprite-animation.png",
      sx: 0,
      sy: 0,
      sw: 100,
      sh: 100,
      sc: 10,
      sf: 2,
      scf: 0
    };
  }
  animate(sprite) {
    // console.log(
    //   `${this.image}, sx ${this.sx}, sx ${this.sy}, w ${this.w}, h ${
    //     this.h
    //   }, x ${this.x}, y ${this.y}, c ${this.c}, r ${this.r}}`
    // );
    this.image.src = sprite.src;
    ctx.drawImage(
      this.image,
      sprite.sw * sprite.sx,
      sprite.sh * sprite.sy,
      sprite.sw,
      sprite.sh,
      this.x,
      this.y,
      this.w,
      this.h
    );

    if (sprite.scf === 0) {
      sprite.sx++;
      if (sprite.sx > sprite.sc - 1) {
        sprite.sx = 0;
      }
    }
    if (sprite.scf < sprite.sf - 1) {
      sprite.scf++;
    } else {
      sprite.scf = 0;
    }
  }
}

// let dog = new Dog();
// let background = new Background();
let keyboard = new Keyboard();

function start() {
  setInterval(update, 1000 / fps);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  keyboard.draw();
  dog.animate(dog.sprite);
}

// keyboard.draw()
// background.draw();
ctx.strokeStyle = "darkslategrey";
for (i=0; i<12; i++) {
  ctx.strokeRect(0+(i*140), 0, 140, 140);
}
for (i=0; i<12; i++) {
  ctx.strokeRect(70+(i*140), 140, 140, 140);
}
for (i=0; i<11; i++) {
  ctx.strokeRect(140+(i*140), 280, 140, 140);
}
for (i=0; i<10; i++) {
  ctx.strokeRect(210+(i*140), 420, 140, 140);
}
ctx.strokeRect(350, 560, 1120, 140);






// for (i=0; i<13; i++) {
//   ctx.strokeRect(0+(i*120), 0, 120, 120);
// }
// ctx.strokeRect(1560, 0, 240, 120);
// ctx.strokeRect(0, 120, 180, 120);
// for (i=0; i<12; i++) {
//   ctx.strokeRect(180+(i*120), 120, 120, 120);
// }
// ctx.strokeRect(0, 240, 240, 120);
// for (i=0; i<11; i++) {
//   ctx.strokeRect(240+(i*120), 240, 120, 120);
// }
// ctx.strokeRect(0, 360, 300, 120);
// for (i=0; i<10; i++) {
//   ctx.strokeRect(300+(i*120), 360, 120, 120);
// }
// ctx.strokeRect(1500, 360, 300, 120);
// ctx.strokeRect(600, 480, 600, 120);

//start()

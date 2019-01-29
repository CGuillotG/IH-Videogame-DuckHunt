let canvas = document.getElementById("canvas");
canvas.width = 1750;
canvas.height = 840;
let ctx = canvas.getContext("2d");
let fps = 30;
let images = {
  bg: "./images/backgroundHD.png",
  env: "./images/environmentHD.png"
};

function Environment() {
  this.x = 0;
  this.y = 0;
  this.w = canvas.width;
  this.h = canvas.height;
  this.image = new Image();
  this.image.src = images.env;
  this.draw = function() {
    ctx.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
  };
}

function KeyLayout() {
  this.color = "white"
  this.keywidth = 140
  this.keyheight = 145
  this.draw = function() {
    ctx.strokeStyle = this.color;
    for (i = 0; i < 12; i++) {
      ctx.strokeRect(0 + i * this.keywidth, 0, this.keywidth, this.keyheight);
    }
    for (i = 0; i < 12; i++) {
      ctx.strokeRect(this.keywidth*.5 + i * this.keywidth, this.keyheight, this.keywidth, this.keyheight);
    }
    for (i = 0; i < 11; i++) {
      ctx.strokeRect(this.keywidth + i * this.keywidth, this.keyheight*2, this.keywidth, this.keyheight);
    }
    for (i = 0; i < 10; i++) {
      ctx.strokeRect(this.keywidth*1.5 + i * this.keywidth, this.keyheight*3, this.keywidth, this.keyheight);
    }
    ctx.strokeRect(this.keywidth*2.5, this.keyheight*4, this.keywidth*8, this.keyheight);
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
let environment = new Environment();
let keylayout = new KeyLayout();

function start() {
  setInterval(update, 1000 / fps);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  environment.draw();
  keylayout.draw();
  dog.animate(dog.sprite);
}

keylayout.draw()
// ctx.clearRect(0, 0, canvas.width, canvas.height);
let image = new Image()
image.src = images.env
ctx.drawImage(image, 0, 0)
// environment.draw();

//start()

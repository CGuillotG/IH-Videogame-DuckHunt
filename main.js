let canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 400;
let ctx = canvas.getContext("2d");
let fps = 30;

class Horse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 100;
    this.h = 100;
    this.image = new Image();
    this.sprite = {
      src:
        "http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/downloads/sprite-animation-demo/images/coin-sprite-animation.png",
      sx: 0,
      sy: 0,
      sc: 10,
      sr: 0,
      sf: 2,
      scf:0
    };
  }
  animate(sprite) {
    // console.log(
    //   `${this.image}, sx ${this.sx}, sx ${this.sy}, w ${this.w}, h ${
    //     this.h
    //   }, x ${this.x}, y ${this.y}, c ${this.c}, r ${this.r}}`
    // );
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.image.src = sprite.src
    ctx.drawImage(
      this.image,
      this.w * sprite.sx,
      this.h * sprite.sy,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );

    if (sprite.scf === 0) {
        sprite.sx++;
      if (sprite.sx > sprite.sc - 1) {
        sprite.sx = 0;
        sprite.sy++;
      }
      if (sprite.sy > sprite.sr - 1) {
        sprite.sy = 0;
      }
    }
    if(sprite.scf < sprite.sf-1) {sprite.scf++}
    else {sprite.scf = 0}
  }
}

let horse = new Horse();

function update() {
  horse.animate(horse.sprite);
}

setInterval(update, 1000 / fps);

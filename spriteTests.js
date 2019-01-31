let canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");
sprites = {
  dogwalk: {
    src: "./images/dogwalkingHD.png",
    w: 520,
    h: 420,
    f: [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,4,4,4,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0]
  },
  dogbarking: {
    src: "./images/dogbarkingHD.png"
  }
};

function Horse() {
  this.x = 0;
  this.y = 0;
  this.w = 520;
  this.h = 420;
  this.image = new Image();
  this.sc = 0;
  this.animate = sprite => {
    this.image.src = sprite.src;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      this.image,
      sprite.w * sprite.f[this.sc],
      0,
      sprite.w,
      sprite.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.sc++;
    if (this.sc >= sprite.f.length) {
      this.sc = 0;
    }
  };
}

let horse = new Horse();

function start() {
  horse.animate(sprites.dogwalk);
}
setInterval(start, 1000 / 20);

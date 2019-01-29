let canvas = document.getElementById("canvas");
canvas.width = 1750;
canvas.height = 840;
let ctx = canvas.getContext("2d");
let fps = 30;
let images = {
  bg: "./images/backgroundHD.png",
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
  this.color = "white";
  this.keywidth = 140;
  this.keyheight = 145;
  this.font = '35px "Duck Hunt"'
  this.fontcolor = '#ffffff'
  this.keys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "?", "¿"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "´", "+"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "{"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "-"]
  ];
  this.draw = function() {
    ctx.strokeStyle = this.color;
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
    ctx.fillStyle = this.fontcolor
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



// class Horse {
//   constructor() {
//     this.x = 0;
//     this.y = 0;
//     this.w = 500;
//     this.h = 500;
//     this.image = new Image();
//     this.sprite = {
//       src: //'./images/dogsniffingHD.png',
//         "http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/downloads/sprite-animation-demo/images/coin-sprite-animation.png",
//       sx: 0,
//       sy: 0,
//       sw: 100,
//       sh: 100,
//       sc: 10,
//       sf: 2,
//       scf:0
//     };
//   }
//   animate(sprite) {
//     // console.log(
//     //   `${this.image}, sx ${this.sx}, sx ${this.sy}, w ${this.w}, h ${
//     //     this.h
//     //   }, x ${this.x}, y ${this.y}, c ${this.c}, r ${this.r}}`
//     // );
//     this.image.src = sprite.src
//     ctx.drawImage(
//       this.image,
//       sprite.sw * sprite.sx,
//       sprite.sh * sprite.sy,
//       sprite.sw,
//       sprite.sh,
//       this.x,
//       this.y,
//       this.w,
//       this.h
//     );

//     if (sprite.scf === 0) {
//         sprite.sx++;
//       if (sprite.sx > sprite.sc - 1) {
//         sprite.sx = 0;
//       }

//     }
//     if(sprite.scf < sprite.sf-1) {sprite.scf++}
//     else {sprite.scf = 0}
//   }
// }

// let horse = new Horse();

// function start() {
//   setInterval(update, 1000 / fps);
// }


// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   horse.animate(horse.sprite);
// }
// let canvas = document.getElementById("canvas");
// canvas.width = 1700;
// canvas.height = 900;
// let ctx = canvas.getContext("2d");
// let fps = 30;
// let images = {
//   bg1: './images/backgroundHD.png',
// }

// function Background (){
//   this.x = 0
//   this.y = 0
//   this.w = canvas.width  
//   this.h = canvas.height
//   this.image = new Image()
//   this.image.src = './images/backgroundHD.png'
//   this.draw = function(){
//     // console.log(this.image + " - " + this.x + " - " + this.y + " - " + this.w + " - " + this.h)
//     ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
//   }
//   this.image.onload = this.draw.bind(this)
// }


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
// let background = new Background();

// function start() {
//   setInterval(update, 1000 / fps);
// }


// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   background.draw()
//   //horse.animate(horse.sprite);
// }

// background.draw()
// start()

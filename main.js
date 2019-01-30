let canvas = document.getElementById("canvas");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
canvas.width = 1750;
canvas.height = 840;
let ctx = canvas.getContext("2d");
let interval;
let score = 0;
let bullets = 3;
let isPaused = false;
let hidekeyboard = false;
let frames = 0;
let fps = 20;
let vMult = 30 / fps;
let images = {
  bg1: "./images/backgroundHD.png",
  bg2: "./images/sunsetHD.png",
  env: "./images/environmentHD.png",
  crossh: "./images/crosshairHD.png"
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
  this.font = '35px "Duck Hunt"';
  this.keys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "?", "¿"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "′", "+"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "{"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "-"]
  ];
  this.draw = function(color = "white") {
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
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.font = this.font;
    ctx.textBaseline = "middle";
    for (l in this.keys[0]) {
      ctx.fillText(
        this.keys[0][l],
        this.keywidth * 0.5 + l * this.keywidth,
        this.keyheight * 0.5
      );
    }
    for (l in this.keys[1]) {
      ctx.fillText(
        this.keys[1][l],
        this.keywidth * 1 + l * this.keywidth,
        this.keyheight * 1.5
      );
    }
    for (l in this.keys[2]) {
      ctx.fillText(
        this.keys[2][l],
        this.keywidth * 1.5 + l * this.keywidth,
        this.keyheight * 2.5
      );
    }
    for (l in this.keys[3]) {
      ctx.fillText(
        this.keys[3][l],
        this.keywidth * 2 + l * this.keywidth,
        this.keyheight * 3.5
      );
    }
  };
}

function Obstacle(x, y, w, h, color = "white") {
  this.color = color;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.keywidth = 140;
  this.keyheight = 145;

  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  this.bounce = function(squares) {
    for (s in squares) {
      let square = squares[s];
      if (!squares[s].isFlying) {
        continue;
      }
      if (
        square.x + square.w + square.vx > this.x &&
        square.x + square.vx < this.x + this.w &&
        square.y + square.h > this.y &&
        square.y < this.y + this.h
      ) {
        square.vx *= -1;
      }
      if (
        square.x + square.w > this.x &&
        square.x < this.x + this.w &&
        square.y + square.h + square.vy > this.y &&
        square.y + square.vy < this.y + this.h
      ) {
        square.vy *= -1;
      }
    }
  };
}

function Duck() {
  this.iPos = [285, 940, 1460];
  this.rIpos = Math.floor(Math.random() * 3);
  this.x = this.iPos[this.rIpos];
  this.y = 460;
  this.w = 75;
  this.h = 75;
  this.v = vMult * 15;
  this.iframe = frames;
  this.isFlying = true;
  this.isFalling = false;
  this.an = Math.random() * 45;
  this.vx = this.v * Math.cos(this.an);
  this.vy = -this.v * Math.sin(this.an);
  this.color = "green";
  this.stage = 0; //--------------------------------------------------------<<
  this.drawSquare = () => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };
  this.move = () => {
    this.x += this.vx;
    this.y += this.vy;
  };
  this.gotShot = () => {
    this.vx = 0;
    this.vy = 0;
    this.isFlying = false;
    this.isFalling = true;
  };
  this.randomFly = () => {
    let cframe = frames - this.iframe;
    if (cframe % fps === 0 && this.isFlying) {
      if (Math.random() > 0.5) {
        this.an = Math.random() * 45;
        this.vx = this.v * Math.cos(this.an);
        this.vy = -this.v * Math.sin(this.an);
      }
    }
  };
}

let environment = new Environment();
let keylayout = new KeyLayout();
let obstacles = [];
let ducks = [];
ducks.push(new Duck());

function start() {
  interval = setInterval(update, 1000 / fps);
}

function pause() {
  isPaused = !isPaused;
  drawPause();
}

function update() {
  if (isPaused) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (hidekeyboard) {
    keylayout.draw("rgb(255,255,255,0)");
  } else {
    keylayout.draw("rgb(255,255,255,0.5)");
  }
  for (o in obstacles) {
    // obstacles[o].draw()
    obstacles[o].bounce(ducks);
  }
  if (frames === 40) {
    ducks.push(new Duck());
  }
  if (frames === 60) {
    ducks.push(new Duck());
  }
  for (d in ducks) {
    ducks[d].move();
    ducks[d].drawSquare();
    ducks[d].randomFly();
  }
  environment.draw();
  frames++;
}

function drawPause() {
  ctx.fillStyle = "rgb(0,0,0,0.35)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(255,255,255,0.75)";
  ctx.font = '80px "Duck Hunt"';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
}

function createObstacles(color) {
  let keywidth = 140;
  let keyheight = 145;
  let bar = 20;
  let overbar = 0;
  obstacles.push(new Obstacle(0, keyheight, keywidth * 0.5, keyheight, color));
  obstacles.push(new Obstacle(0, keyheight * 2, keywidth, keyheight, color));
  obstacles.push(
    new Obstacle(0, keyheight * 3, keywidth * 1.5, keyheight, color)
  );
  obstacles.push(
    new Obstacle(
      canvas.width - keywidth * 0.5,
      0,
      keywidth * 0.5,
      keyheight,
      color
    )
  );
  obstacles.push(
    new Obstacle(
      canvas.width - keywidth * 0.5,
      keyheight * 2,
      keywidth * 0.5,
      keyheight,
      color
    )
  );
  obstacles.push(
    new Obstacle(
      canvas.width - keywidth,
      keyheight * 3,
      keywidth,
      keyheight,
      color
    )
  );
  obstacles.push(new Obstacle(0, keyheight * 4, canvas.width, bar, color));
  //screen margins
  obstacles.push(new Obstacle(0, overbar - bar, canvas.width, bar, color));
  obstacles.push(new Obstacle(overbar - bar, 0, bar, keyheight, color));
  obstacles.push(
    new Obstacle(
      canvas.width - overbar,
      keyheight,
      bar + overbar,
      keyheight,
      color
    )
  );
}

function registerShot(e) {
  let keywidth = 140;
  let keyheight = 145;
  let x;
  let y;
  let i;
  let cross = new Image();
  cross.src = images.crossh;

  let keycodes = [
    [
      "Digit1",
      "Digit2",
      "Digit3",
      "Digit4",
      "Digit5",
      "Digit6",
      "Digit7",
      "Digit8",
      "Digit9",
      "Digit0",
      "Minus",
      "Equal"
    ],
    [
      "KeyQ",
      "KeyW",
      "KeyE",
      "KeyR",
      "KeyT",
      "KeyY",
      "KeyU",
      "KeyI",
      "KeyO",
      "KeyP",
      "BracketLeft",
      "BracketRight"
    ],
    [
      "KeyA",
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyH",
      "KeyJ",
      "KeyK",
      "KeyL",
      "Semicolon",
      "Quote"
    ],
    [
      "KeyZ",
      "KeyX",
      "KeyC",
      "KeyV",
      "KeyB",
      "KeyN",
      "KeyM",
      "Comma",
      "Period",
      "Slash"
    ]
  ];

  if (keycodes[0].indexOf(e) !== -1) {
    i = keycodes[0].indexOf(e);
    x = 0 + i * keywidth;
    y = 0;
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (keycodes[1].indexOf(e) !== -1) {
    i = keycodes[1].indexOf(e);
    x = keywidth * 0.5 + i * keywidth;
    y = keyheight;
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (keycodes[2].indexOf(e) !== -1) {
    i = keycodes[2].indexOf(e);
    x = keywidth + i * keywidth;
    y = keyheight * 2;
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (keycodes[3].indexOf(e) !== -1) {
    i = keycodes[3].indexOf(e);
    x = keywidth * 1.5 + i * keywidth;
    y = keyheight * 3;
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (i >= 0) {
    bullets--;
    for (d in ducks) {
      if (
        ducks[d].x >= x &&
        ducks[d].x <= x + keywidth &&
        ducks[d].y >= y &&
        ducks[d].y <= y + keyheight
      ) {
        ducks[d].gotShot();
        score++;
      }
    }
  }
}

addEventListener("keypress", e => {
  if (e.keyCode === 32) {
    pause();
  }
});

addEventListener("keypress", e => {
  if (!isPaused) {
    registerShot(e.code);
  }
});
button1.addEventListener("click", function() {
  hidekeyboard = !hidekeyboard;
  if (button1.innerText === "Normal Mode") {
    button1.innerText = "Expert Mode";
  } else {
    button1.innerText = "Normal Mode";
  }
});

createObstacles("rgb(255,255,255,0.5)");
start();

let canvas = document.getElementById("canvas");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
canvas.width = 1750;
canvas.height = 840;
let ctx = canvas.getContext("2d");
let interval;
let score = 0;
let bullets = 20;
let round = 0;
let duckHit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let duckHitIndex = 0;
let isFreezeActive = false;
let isPaused = false;
let coopEnabled = false;
let hidekeyboard = false;
let frames = 0;
let fps = 20;
let vMult = 30 / fps;
let images = {
  bg1: "./images/backgroundHD.png",
  bg2: "./images/sunsetHD.png",
  env: "./images/environmentHD.png",
  crossh: "./images/crosshairHD.png",
  ui: "./images/scoreboardHD.png",
  rndui: "./images/roundUI.png",
  bul: "./images/bulletHD.png",
  dckscr: "./images/duckScoreHD.png"
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
  this.isSlowed = false;
  this.isGone = false;
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
    if (this.isSlowed) {
      this.x += this.vx / 4;
      this.y += this.vy / 4;
    } else {
      this.x += this.vx;
      this.y += this.vy;
    }    
  };
  this.flewAway = () => {
    if (this.isFalling) {return}
    if (Math.floor((frames - this.iframe) / fps) > 15) {
      this.isGone = true;
      this.isFlying = false;
      this.color = "blue";
      this.vx = 0;
      this.vy = vMult * -10;
    }
  }
  this.gotShot = () => {
    if(this.isGone) {return}
    this.color = "red";
    this.vx = 0;
    this.vy = vMult * 10;
    this.isFlying = false;
    this.isFalling = true;
    score++;
    duckHit[duckHitIndex] = 1;
    duckHitIndex++;
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

function FreezeBeam(x, y) {
  this.x = x;
  this.y = y;
  this.stage = 0;
  this.r = 0;
  this.draw = () => {
    if (isFreezeActive) {
      if (this.stage < 30) {
        this.r = 0 + this.stage * 5;
        this.stage++;
      } else if (this.stage < 50) {
        this.r = 150;
        this.stage++;
      } else if (this.stage >= 50) {
        this.stage = 0;
        isFreezeActive = false;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = "rgb(192,250,242,0.5)";
      ctx.fill();
    }
  };
  this.freeze = () => {
    for (d in ducks) {
      let nr = this.r + ducks[d].w / 2;
      let dist = Math.sqrt(
        Math.pow(this.x - ducks[d].x, 2) + Math.pow(this.y - ducks[d].y, 2)
      );
      if (dist <= nr && isFreezeActive) {
        ducks[d].isSlowed = true;
      } else {
        ducks[d].isSlowed = false;
      }
    }
  };
}

function ScoreBoard() {
  this.board = new Image();
  this.board.src = images.ui;
  this.bullet = new Image();
  this.bullet.src = images.bul;
  this.ducks = new Image();
  this.ducks.src = images.dckscr;
  this.draw = () => {
    ctx.drawImage(this.board, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.bullet, 1200, 750, 20, 45);
    for (d in duckHit) {
      let ox = 670;
      if (d > 5) {
        ox = 690;
      }
      if (duckHit[d] === 0) {
        ctx.drawImage(this.ducks, 0, 0, 700, 700, ox + d * 45, 758, 30, 30);
      } else {
        ctx.drawImage(
          this.ducks,
          700 + 700 * d,
          0,
          700,
          700,
          ox + d * 45,
          758,
          30,
          30
        );
      }
    }
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = '40px "Duck Hunt"';
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#3fbfff";
    ctx.fillText(`x${bullets.toString().padStart(2, "0")}`, 1225, 773);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = '45px "Duck Hunt"';
    ctx.fillText(score.toString().padStart(6, "0"), 1365, 775);
    ctx.fillText(`ROUND ${round}`, 230, 775);
    ctx.fillStyle = "#83d313";
    ctx.fillText(`DUCKS`, 510, 775);
    ctx.fillStyle = "#83d313";
    ctx.fillText(`|`, 935, 773);
  };
}

function Round(n) {
  this.iframe = frames;
  this.cframe = 0;
  this.n = n;
  this.lduck = 0;
  this.nduck = 40;
  this.numducks = 0;
  this.roundended = false;
  this.nextRound = false
  this.fframe;
  this.refresh = () => {
    if (this.n === 0) {
      if (frames - this.iframe >= 40) {
        this.nextRound = true
      }
      return
    }
    if (this.roundended) {
      if (ducks.length === 0 && frames - this.fframe >= 40) {
        if (duckHit.reduce((a, b) => a + b, 0) < 6) {
          gameOver();
        } else {
          this.nextRound = true
        }
      }
      
    } else {      
      let random = Math.floor(1 + Math.random() * 5);
      this.cframe = frames - this.iframe;
      if(this.cframe <= 35) {
        drawRound()
      }
      if (this.cframe === this.nduck) {
        ducks.push(new Duck());
        this.numducks++;
        this.lduck = this.cframe;
        this.nduck = this.cframe + random * fps;
      }
      if (this.numducks >= 10) {
        this.roundended = true;
        this.fframe = frames
      }
    }
  };
}

let roundInst = new Round(0);
let environment = new Environment();
let keylayout = new KeyLayout();
let obstacles = [];
let ducks = [];
let freeze = new FreezeBeam();
let scoreboard = new ScoreBoard();

function start() {
  resetVariables();
  createObstacles("rgb(255,255,255,0.5)");
  interval = setInterval(update, 1000 / fps);
}

function pause() {
  isPaused = !isPaused;
  drawPause();
}

function gameOver() {
  isPaused = true;
  ctx.fillStyle = "rgb(0,0,0,0.35)";
  ctx.fillRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
  ctx.fillStyle = "rgb(240,70,51)";
  ctx.font = '80px "Duck Hunt"';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
}

function drawRound() {
  //ctx.fillStyle = "rgb(0,0,0,0.85)";
  let image = new Image()
  image.src = images.rndui
  ctx.drawImage(image,canvas.width*1/3+25, canvas.height*1/3-25,canvas.width*1/3-50, canvas.height*1/3-50)
  //ctx.fillRect(canvas.width*1/3, canvas.height*1/3, canvas.width*1/3, canvas.height*1/3);
  ctx.fillStyle = "white";
  ctx.font = '80px "Duck Hunt"';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`Round ${round}`, canvas.width / 2, canvas.height / 2 - 50);
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
    obstacles[o].bounce(ducks);
  }
  removeDuck();
  for (d in ducks) {
    ducks[d].move();
    ducks[d].drawSquare();
    ducks[d].randomFly();
    ducks[d].flewAway();
  }
  freeze.draw();
  freeze.freeze();
  environment.draw();
  scoreboard.draw();
  roundInst.refresh();
  if(roundInst.nextRound) {
    round++
    roundInst = new Round(round)
    bullets = 20
    duckHit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    duckHitIndex = 0;
  }
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

function resetVariables() {
  clearInterval(interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  isFreezeActive = false;
  round = 0;
  bullets = 20;
  score = 0;
  frames = 0;
  duckHit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  duckHitIndex = 0;
  roundInst = new Round(0);
  environment = new Environment();
  keylayout = new KeyLayout();
  obstacles = [];
  ducks = [];
  freeze = new FreezeBeam();
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
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (keycodes[1].indexOf(e) !== -1) {
    i = keycodes[1].indexOf(e);
    x = keywidth * 0.5 + i * keywidth;
    y = keyheight;
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (keycodes[2].indexOf(e) !== -1) {
    i = keycodes[2].indexOf(e);
    x = keywidth + i * keywidth;
    y = keyheight * 2;
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (keycodes[3].indexOf(e) !== -1) {
    i = keycodes[3].indexOf(e);
    x = keywidth * 1.5 + i * keywidth;
    y = keyheight * 3;
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
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
      }
    }
  }
}

function removeDuck() {
  for (d in ducks) {
    if (!ducks[d].isFlying) {
      if (ducks[d].y > canvas.height || ducks[d].y < 0) {
        ducks.splice(d, 1);
        break;
      }
    }
  }
}

function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

addEventListener("keypress", e => {
  if (e.keyCode === 32) {
    pause();
  }
});

addEventListener("keypress", e => {
  if (!isPaused) {
    registerShot(e.code);
    //cheatcode
    console.log(e.code);
    if (e.code === "Backquote") {
      let rand = Math.floor(Math.random() * ducks.length);
      if (ducks[rand].isFlying) {
        ducks[rand].gotShot();
        ctx.fillStyle = 'white'
        ctx.fillRect(0,0,canvas.width,canvas.height)
        bullets--;
      }
    }
  }
});

button1.addEventListener("click", function() {
  hidekeyboard = !hidekeyboard;
  if (button1.innerText === "Normal Mode") {
    button1.innerText = "Expert Mode";
    button1.classList.add("pushed");
  } else {
    button1.innerText = "Normal Mode";
    button1.classList.remove("pushed");
  }
  button1.blur();
});

button2.addEventListener("click", function() {
  coopEnabled = !coopEnabled;
  if (button2.innerText === "Co-Op Disabled") {
    button2.innerText = "Co-Op Enabled";
    button2.classList.add("pushed");
  } else {
    button2.innerText = "Co-Op Disabled";
    button2.classList.remove("pushed");
  }
  button2.blur();
});

canvas.addEventListener("mousedown", function(e) {
  if (coopEnabled && !isFreezeActive) {
    isFreezeActive = true;
    freeze = new FreezeBeam(e.layerX, e.layerY);
  }
});

button3.addEventListener("click", function() {
  if (isPaused) {
    isPaused = false;
  }
  start();
  button3.blur();
});

start();

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
let isGameOver = false;
let coopEnabled = false;
let hidekeyboard = false;
let frames = 0;
let fps = 20;
let vMult = 30 / fps;
let images = {
  bg1: "./images/background.png",
  bg2: "./images/sunset.png",
  env: "./images/environment.png",
  crossh: "./images/crosshair.png",
  ui: "./images/scoreboard.png",
  rndui: "./images/roundUI.png",
  bul: "./images/bullet.png",
  dckscr: "./images/duckScore.png"
};
let sounds = {
  intro: "./music/02 - Duck Hunt Intro.mp3",
  gotDuck: "./music/04 - Got Duck(s).mp3",
  laugh: "./music/99 - Laugh (SFX).mp3",
  gameOver: "./music/07 - You Failed.mp3",
  bark: "./music/99 - Bark! (SFX).mp3",
  duckFalls: "./music/99 - Dead Duck Falls (SFX).mp3",
  duckFlap: "./music/99 - Duck Flapping (SFX).mp3",
  quack: "./music/99 - Quack! (SFX).mp3",
  shot: "./music/99 - Gunshot (SFX).mp3",
  pause: "./music/99 - Pause (SFX).mp3"
}
let intro = new Audio()
intro.src = sounds.intro
let sprites = {
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
    k:''
  },
  rduckFlyAway:{
    src: "./images/rduckFlyAway.png",
    w:320,
    h:310,
    f: [0,0,1,1,2,2,1,1],
    k:''
  },
  pduckFlyAway:{
    src: "./images/pduckFlyAway.png",
    w:320,
    h:310,
    f: [0,0,1,1,2,2,1,1],
    k:''
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

function Duck(t='g',v=15) {
  this.iPos = [285, 940, 1380];
  this.rIpos = Math.floor(Math.random() * 3);
  this.x = this.iPos[this.rIpos];
  this.y = 380;
  this.w = 130;
  this.h = 140;
  this.v = vMult * v;
  this.iframe = frames;
  this.isFlying = true;
  this.isFalling = false;
  this.isSlowed = false;
  this.isGone = false;
  this.an = Math.random() * 45;
  this.vx = this.v * Math.cos(this.an);
  this.vy = -this.v * Math.sin(this.an);
  this.color = "green";
  this.image = new Image();
  this.sc = 0;
  this.type = t

  this.quacks = () =>{    
    let quack = new Audio()  
    quack.src = sounds.quack
    quack.play()
  }
  this.fallwhistle = () => {
    let fall = new Audio()  
    fall.src = sounds.duckFalls
    fall.play()
  }
  this.flaps = () =>{    
    let flaps = new Audio()  
    flaps.src = sounds.duckFlap
    flaps.play()
  }

  this.draw = () => {
    if (this.isFlying) {
      if (this.vx >= 0) {
        if (Math.abs(this.vy) > Math.abs(this.vx)) {
          if(this.vy < 0) {
            switch (this.type) {
              case 'g':
                return this.animate(sprites.gducksUpR)
              case 'r':
                return this.animate(sprites.rducksUpR)
              case 'p':
                return this.animate(sprites.pducksUpR)
            }
          }
        } 
        switch (this.type) {
          case 'g':
            return this.animate(sprites.gducksR)
          case 'r':
            return this.animate(sprites.rducksR)
          case 'p':
            return this.animate(sprites.pducksR)
        }
        
      } else {
        if (Math.abs(this.vy) > Math.abs(this.vx)) {
          if(this.vy < 0) {
            switch (this.type) {
              case 'g':
                return this.animate(sprites.gducksUpL)
              case 'r':
                return this.animate(sprites.rducksUpL)
              case 'p':
                return this.animate(sprites.pducksUpL)
            }
          }
        } 
        switch (this.type) {
          case 'g':
            return this.animate(sprites.gducksL)
          case 'r':
            return this.animate(sprites.rducksL)
          case 'p':
            return this.animate(sprites.pducksL)
        }
        
      }
      
    } else if (this.isFalling) {
      switch (this.type) {
        case 'g':
          return this.animate(sprites.gducksFalling)
        case 'r':
          return this.animate(sprites.rducksFalling)
        case 'p':
          return this.animate(sprites.pducksFalling)
      }      
    } else if (this.isGone) {
      switch (this.type) {
        case 'g':
          return this.animate(sprites.gduckFlyAway)
        case 'r':
          return this.animate(sprites.rduckFlyAway)
        case 'p':
          return this.animate(sprites.pduckFlyAway)
      }
    } else {
      return this.drawSquare()
    }
  }

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
    /*if(!this.isFalling) {
      if (this.sc === 0) {
        this.flaps()
      }
    }*/
  };
  this.flewAway = () => {
    if (this.isFalling) {
      return;
    }
    if (Math.floor((frames - this.iframe) / fps) > 15) {
      this.isGone = true;
      this.isFlying = false;
      this.color = "blue";
      this.vx = 0;
      this.vy = vMult * -10;
      this.w *= 0.9
      this.h *= 0.9
      this.flaps()
    }
  };
  this.gotShot = () => {
    if (this.isGone) {
      return;
    }
    this.fallwhistle()
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
        this.quacks()
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
  this.nextRound = false;
  this.fframe;
  this.refresh = () => {
    if (this.n === 0) {
      if (frames - this.iframe === 5) {
        intro.play()
        //create dog
        
      }
      if (frames - this.iframe === 125) {
        //dog stops
        let bark = new Audio()
        bark.src = sounds.bark
        bark.play()
      }
      if (frames - this.iframe === 130) {
        let bark = new Audio()
        bark.src = sounds.bark
        bark.play()
      }
      if (frames - this.iframe >= 165) {
        this.nextRound = true;
        //dog = ""
      }
      return;
    }
    if (this.roundended) {
      if (ducks.length === 0 && frames - this.fframe >= 40) {
        if (duckHit.reduce((a, b) => a + b, 0) < 6) {
          gameOver();
        } else {
          this.nextRound = true;
        }
      }
    } else {
      let random = Math.floor(1 + Math.random() * 5);
      this.cframe = frames - this.iframe;
      if (this.cframe === 5) {
        let pauses = new Audio()
        pauses.src = sounds.pause
        pauses.play()
      }
      if (this.cframe <= 35) {
        drawRound();
      }
      if (this.cframe === this.nduck) {
        ducks.push(new Duck());
        this.numducks++;
        this.lduck = this.cframe;
        this.nduck = this.cframe + random * fps;
      }
      if (this.numducks >= 10) {
        this.roundended = true;
        this.fframe = frames;
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
  if (!isGameOver) {
    if (isPaused) {
      isPaused = false
      if(!intro.ended) {

        intro.play()      
      }
    } else {
      isPaused = true      
      intro.pause()
      drawPause();
    }
  }
}

function gameOver() {
  isPaused = true;
  isGameOver = true
  ctx.fillStyle = "rgb(0,0,0,0.35)";
  ctx.fillRect(
    canvas.width / 4,
    canvas.height / 4,
    canvas.width / 2,
    canvas.height / 2
  );
  ctx.fillStyle = "red";
  ctx.font = '80px "Duck Hunt"';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  let gameO = new Audio()  
  gameO.src = sounds.gameOver
  gameO.play()
}

function drawRound() {
  //ctx.fillStyle = "rgb(0,0,0,0.85)";
  let image = new Image();
  image.src = images.rndui;
  ctx.drawImage(
    image,
    (canvas.width * 1) / 3 + 25,
    (canvas.height * 1) / 3 - 25,
    (canvas.width * 1) / 3 - 50,
    (canvas.height * 1) / 3 - 50
  );
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
  } else if (round === 0){
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
    ducks[d].draw();
    ducks[d].randomFly();
    ducks[d].flewAway();
  }
  freeze.draw();  
  freeze.freeze();
  environment.draw()
  if (round > 0) {
    scoreboard.draw();
  }
  roundInst.refresh();
  if (roundInst.nextRound) {
    round++;
    roundInst = new Round(round);
    bullets = 20;
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
  intro.pause()
  intro.currentTime = 0
  isFreezeActive = false;  
  isPaused = false
  isGameOver = false
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
  if (bullets <= 0) {
    bullets = 0
    return}
  if (keycodes[0].indexOf(e) !== -1) {
    i = keycodes[0].indexOf(e);
    x = 0 + i * keywidth;
    y = 0;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (keycodes[1].indexOf(e) !== -1) {
    i = keycodes[1].indexOf(e);
    x = keywidth * 0.5 + i * keywidth;
    y = keyheight;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (keycodes[2].indexOf(e) !== -1) {
    i = keycodes[2].indexOf(e);
    x = keywidth + i * keywidth;
    y = keyheight * 2;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (keycodes[3].indexOf(e) !== -1) {
    i = keycodes[3].indexOf(e);
    x = keywidth * 1.5 + i * keywidth;
    y = keyheight * 3;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cross, x, y, keywidth, keyheight);
  }
  if (i >= 0) {
    let shot = new Audio()  
    shot.src = sounds.shot
    shot.play()
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
    if (e.code === "Backquote") {
      let rand = Math.floor(Math.random() * ducks.length);
      if (ducks[rand].isFlying) {
        ducks[rand].gotShot();
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        bullets--;
        let shot = new Audio()  
        shot.src = sounds.shot
        shot.play()
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
    canvas.style.backgroundImage = 'url("./images/sunset.png")';
  } else {
    button2.innerText = "Co-Op Disabled";
    button2.classList.remove("pushed");
    canvas.style.backgroundImage = 'url("./images/background.png")';
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
  button3.innerText = "Reset"
  button3.blur();
});


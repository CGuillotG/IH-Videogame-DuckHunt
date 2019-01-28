let canvas = document.getElementById('canvas')
canvas.width = 400
canvas.height = 400
let ctx = canvas.getContext('2d')
let fps = 30

class Horse {
    constructor(){
        this.x = 0
        this.y = 0
        this.w = 100
        this.h = 100
        this.image = new Image()
        this.image.src = "http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/downloads/sprite-animation-demo/images/coin-sprite-animation.png"
        this.sx = 0
        this.sy = 0
        this.sc = 10
        this.sr = 1 
    }
    animate(){
        console.log(
            `${this.image}, sx ${this.sx}, sx ${this.sy}, w ${this.w}, h ${this.h}, x ${this.x}, y ${this.y}, c ${this.c}, r ${this.r}}`
          );
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(this.image,this.w*this.sx,this.h*this.sy,this.w,this.h,this.x,this.y,this.w,this.h)

        this.sx++;
        if(this.sx>(this.sc-1)){
            this.sx=0;
            this.sy++;
        }
        if(this.sy>(this.sr-1)){
            this.sy=0;
        }

    }
}

let horse = new Horse()

function update(){
    horse.animate()
}

setInterval(update, 1000/fps)

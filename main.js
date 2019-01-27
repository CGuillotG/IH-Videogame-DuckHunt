let canvas = document.getElementById('canvas')
canvas.width = 400
canvas.height = 400
let ctx = canvas.getContext('2d')

let image = new Image()
image.src = "http://www.seventhundersoftware.com/articles/web-app/basics/assets/sprite-horse.gif"



let x = 0 //position in canvas
let y = 0 //position in canvas
let w = 186
let h = 135
let c = 4
let r = 4

function animate(image,x,y,w,h,c,r) {
    context.drawImage(image,w*x,h*y,w,h,0,0,w,h)
}




















setInterval(animate, 1000/15);
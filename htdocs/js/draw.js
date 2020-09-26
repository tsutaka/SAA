'use strict'

//drawCircle
const drawCircle = (ctx, x, y, r) => {
  ctx.strokeStyle = 'orange'
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI*2, 0)
  ctx.stroke()
}

const drawArc = (ctx, x, y, r, startRad, endRad, color) => {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x, y, r, startRad, endRad, 0)
  ctx.moveTo(x, y)
  ctx.fill()
}

const drawSlash = (ctx, x, y, r, startRad, endRad, strength) => {
  const SEP_NUM = 5
  let diffRad = (endRad - startRad) / SEP_NUM
  let color = 'rgb(0, 0, 0)'
  for(let i = 0; i < SEP_NUM - 1; i++){
    if(strength === 0){ // white
      color = 'rgb(' + 
      String(100+Math.floor(i * 30)) + ', ' + 
      String(100+Math.floor(i * 30)) + ', ' + 
      String(100+Math.floor(i * 30)) + ')'
    }
    else if(strength === 1) { // blue
      color = 'rgb(0, 0, ' + String(Math.floor(i * 50)) + ')'
    }
    else if(strength === 2){ // violet
      color = 'rgb(' + 
      String(Math.floor(i * 50)) + ', 0, ' + 
      String(Math.floor(i * 50)) + ')'
    }
    else if(strength === 3){ // yellow
      color = 'rgb(255, 255, ' + String(Math.floor(i * 50)) + ')'
    }
    else if(strength === 4){ // red
      color = 'rgb(' + String(Math.floor(i * 50)) + ', 0, 0)'
    }
    drawArc(ctx, x, y, r, 
      startRad + diffRad * i, 
      startRad + diffRad * (i + 1), 
      color)
  }
}
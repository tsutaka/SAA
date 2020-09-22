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

const drawSlash = (ctx, x, y, r, startRad, endRad) => {
  const SEP_NUM = 5
  let diffRad = (endRad - startRad) / SEP_NUM
  for(let i = 0; i < SEP_NUM - 1; i++){
    drawArc(ctx, x, y, r, 
      startRad + diffRad * i, 
      startRad + diffRad * (i + 1), 
      'rgb(0, 0, ' + String(Math.floor(i * 50)) + ')')
  }
}
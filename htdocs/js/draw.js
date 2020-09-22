"use strict"

//drawCircle
const drawCircle = (ctx, x, y, r) => {
  ctx.strokeStyle = "orange"
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI*2, 0)
  ctx.stroke()
}
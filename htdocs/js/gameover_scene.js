"use strict"

const updateGameover = () =>{
  //Input
  if(state.mouse.left_click){
    state.scene = 0
  }
}
const drawGameover = () =>{
  //fill
  ctx.fillStyle = "rgb(0, 0, 0)"
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //Print text
  ctx.fillStyle = "orange"
  ctx.font = "48px serif"
  ctx.fillText("GAME OVER", 
    CANVAS_WIDTH / 2 - 50 , 
    CANVAS_HEIGHT / 2 - 20)

}
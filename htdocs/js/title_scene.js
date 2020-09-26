'use strict'

const updateTitle = () => {
  //Input
  if(state.mouse.left_click){
    //Initialize game
    state.scene = 1
    state.attack_interval = 0 
    state.slash_count = 0 
    state.wepon_level = 0
    state.sword_level.range = 0
    state.sword_level.velocity = 0
    state.sword_level.arc = 0
    state.sword_level.strength = 0
    state.arrow_level.range = 0
    state.arrow_level.velocity = 0
    state.arrow_level.arc = 0
    state.arrow_level.strength = 0
    enemy_state.forEach((enemy) => {
      enemy.exist = 0
    })
  }
}
const drawTitle = () => {
  //fill
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //Print text
  ctx.fillStyle = 'orange'
  ctx.font = '48px serif'
  ctx.fillText('Swords and Arrows', 
    CANVAS_WIDTH / 2 - 200 , 
    CANVAS_HEIGHT / 2 - 20)

  ctx.font = '24px serif'
  ctx.fillText('Click to start!', 
    CANVAS_WIDTH / 2 - 70 , 
    CANVAS_HEIGHT / 2 + 100)

}
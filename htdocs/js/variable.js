'use strict'

let state = {
  scene: 0, 
  x: (CANVAS_WIDTH / 2),
  y: (CANVAS_HEIGHT / 2),
  w: TILE_W,
  h: TILE_H,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false, 
    esc: false
  },
  mouse: {
    left_click: false, 
    left_click_x: 0,
    left_click_y: 0
  }, 
  attack_interval: 0, 
  slash_count: 0, 
  wepon_level: 0
}

// Enemy state
let enemy_state = []
for(let i = 0; i < ENEMY_MAX; i++){
  enemy_state.push(
    {
      "exist": 0, //Exist flag
      "type": 0, //Enemy type(0:Uro, 1:Tsui, 2:Nige)
      "x": 0, //origin left_top 
      "y": 0, //origin left_top
      "w": TILE_W, 
      "h": TILE_H, 
      "hp": 5
    }
  )
}
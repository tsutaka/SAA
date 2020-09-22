"use strict"
// Global 
const board = document.querySelector("#board")
const ctx = board.getContext("2d")
const canvas_width = 1280
const canvas_height = 720
const tiliW = 64
const tileH = 64
const attack_interval_max = 20
const levelup_table = [5, 10, 20, 50]
let state = {
  scene: 0, 
  x: (canvas_width / 2),
  y: (canvas_height / 2),
  w: tiliW,
  h: tileH,
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
const enemy_speed = 3
const collision_distance = tiliW / 4
const enemy_distance = tiliW / 5 
const appearance_interval = 50
const enemy_max = 100
let enemy_state = []
for(let i = 0; i < enemy_max; i++){
  enemy_state.push(
    {
      "exist": 0, //Exist flag
      "type": 0, //Enemy type(0:Uro, 1:Tsui, 2:Nige)
      "x": 0, //origin left_top 
      "y": 0, //origin left_top
      "w": tiliW, 
      "h": tileH, 
      "hp": 5
    }
  )
}

let keyMap = {
  68: 'right',  //D
  65: 'left',   //A
  87: 'up',     //W
  83: 'down',   //S
  27: 'esc'     //ESC
}
const keydown = (event) => {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = true
}
window.addEventListener("keydown", keydown, false)

const keyup = (event) => {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}
window.addEventListener("keyup", keyup, false)

const click = (e) => {
  const rect = board.getBoundingClientRect();
  const point = {
    x: Math.round(e.clientX - rect.left),
    y: Math.round(e.clientY - rect.top)
  }
  state.mouse.left_x = point.x
  state.mouse.left_y = point.y
}
window.addEventListener("click", click, false)

const mousedown = (e) => {
  state.mouse.left_click = true
}
window.addEventListener("mousedown", mousedown, false)

const mouseup = (e) => {
  state.mouse.left_click = false
}
window.addEventListener("mouseup", mouseup, false)

//random 0-num
const random = (num) => {
  return Math.floor(Math.random() * (num + 1))
}

//drawCircle
const drawCircle = (x, y, r) => {
  ctx.strokeStyle = "orange"
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI*2, 0)
  ctx.stroke()
}

// Windwo initialize
window.onload = () => {
}

//Title
const title = () => {
  //Input
  if(state.mouse.left_click){
    //Initialize game
    state.scene = 1
    enemy_state.forEach((enemy) => {
      enemy.exist = 0
      state.attack_interval = 0 
      state.slash_count = 0 
      state.wepon_level = 0
    })
  }

  //Draw
  //fill
  ctx.fillStyle = "rgb(0, 0, 0)"
  ctx.fillRect(0, 0, canvas_width, canvas_height);
  //Print text
  ctx.fillStyle = "orange"
  ctx.font = "48px serif"
  ctx.fillText("Swords and Arrows", 
    canvas_width / 2 - 200 , 
    canvas_height / 2 - 20)

  ctx.font = "24px serif"
  ctx.fillText("Click to start!", 
    canvas_width / 2 - 70 , 
    canvas_height / 2 + 100)

}

//Update
const update = (progress) => {

  //Key input
  if (state.pressedKeys.left)   { state.x -= progress * 0.5 }
  if (state.pressedKeys.right)  { state.x += progress * 0.5 }
  if (state.pressedKeys.up)     { state.y -= progress * 0.5 }
  if (state.pressedKeys.down)   { state.y += progress * 0.5 }
  if (state.pressedKeys.esc)    { state.scene = 0 }

  // Flip position at boundaries
  if (state.x > canvas_width)   { state.x -= canvas_width }
  else if (state.x < 0)         { state.x += canvas_width }
  if (state.y > canvas_height)  { state.y -= canvas_height }
  else if (state.y < 0)         { state.y += canvas_height }

  //Attack
  if(state.mouse.left_click &&
    state.attack_interval == 0){
    state.attack_interval = attack_interval_max
    enemy_state.forEach((enemy) => {
      if(enemy.exist == 1){
        let x_diff = enemy.x - state.x
        let y_diff = enemy.y - state.y
        let distance = enemy.w/2 + state.w/2 + state.wepon_level*tiliW/2
        if((x_diff*x_diff + y_diff*y_diff) < (distance*distance)){
          enemy.exist = 0
          state.slash_count += 1
          if(state.wepon_level < levelup_table.length){
            if(levelup_table[state.wepon_level] <= state.slash_count){
              state.wepon_level += 1
            }
          }
        }
      }
    })
  }
  if(state.attack_interval > 0){
    state.attack_interval -= 1
  }


  //Enemy Create
  if(random(appearance_interval) == 0){
    for(let i = 0; i < enemy_state.length; i++){
      if(enemy_state[i]["exist"] == 0){
        enemy_state[i]["exist"] = 1
        enemy_state[i]["type"] = random(2)
        enemy_state[i]["w"] = tiliW
        enemy_state[i]["h"] = tileH
        enemy_state[i]["x"] = random(canvas_width - 1)
        enemy_state[i]["y"] = random(canvas_height - 1)
        enemy_state[i]["hp"] = 5
        break
      }
    }
  }

  //Enemy update
  enemy_state.forEach((enemy) => {
    if(enemy["exist"] == 1){
      let enemy_x_center = enemy["x"] - (enemy["w"] / 2)
      let enemy_y_center = enemy["y"] - (enemy["h"] / 2)
      let chara_x_center = state.x - (state.w / 2)
      let chara_y_center = state.y - (state.h / 2)
      let x_diff = chara_x_center - enemy_x_center
      let y_diff = chara_y_center - enemy_y_center
      let rad = Math.atan2(y_diff, x_diff)

      switch(enemy["type"]){
        case 0:
          enemy["x"] += Math.floor(Math.random() * (enemy_speed * 2 + 1)) - enemy_speed
          enemy["y"] += Math.floor(Math.random() * (enemy_speed * 2 + 1)) - enemy_speed
          break
        case 1:
          if(y_diff*y_diff + x_diff*x_diff >= enemy_distance*enemy_distance){
            enemy["x"] += Math.cos(rad) * enemy_speed
            enemy["y"] += Math.sin(rad) * enemy_speed
          }
          break
        case 2:
          enemy["x"] -= Math.cos(rad) * enemy_speed
          enemy["y"] -= Math.sin(rad) * enemy_speed
          break
      }
      
      // Delete enemy in out of view
      if (enemy["x"] > canvas_width)  { enemy["exist"] = 0 }
      else if (enemy["x"] < 0)        { enemy["exist"] = 0 }
      if (enemy["y"] > canvas_height) { enemy["exist"] = 0 }
      else if (enemy["y"] < 0)        { enemy["exist"] = 0 }

      //Collision check
      if(y_diff*y_diff + x_diff*x_diff <= collision_distance*collision_distance){
        state.scene = 2
      }
    }
  })

}

//Draw
const draw = () => {

  //fill
  ctx.fillStyle = "rgb(0, 0, 0)"
  ctx.fillRect(0, 0, canvas_width, canvas_height);

  // Draw chara
  const chara_img = new Image()
  chara_img.src = "img/chara01.png"
  ctx.drawImage(chara_img, 0, 0, 64, 64, state.x, state.y, state.w, state.h)
  
  // Draw Enemy
  enemy_state.forEach((enemy) => {
    if(enemy["exist"] == 1){
      //TODO:画像のロードは最初の一回のみにした方が良い
      const enemy_img = new Image()
      let src_x = 0
      let src_y = 0
      switch(enemy["type"]){
        case 0:
          enemy_img.src = "img/enemy00.png"
          src_x = 397
          src_y = 388
          break
        case 1:
          enemy_img.src = "img/enemy01.png"
          src_x = 412
          src_y = 436
          break
        case 2:
          enemy_img.src = "img/enemy02.png"
          src_x = 246
          src_y = 323
          break
      }
      ctx.drawImage(
        enemy_img, 
        0, 0,
        src_x, src_y,  
        enemy["x"], enemy["y"], 
        enemy["w"], enemy["h"])

      //Debug
      drawCircle(enemy["x"] + enemy["w"]/2, enemy["y"] + enemy["h"]/2, enemy["w"]/2)
    }
  })

  //Print text
  ctx.fillStyle = "orange"
  ctx.font = "24px serif"
  ctx.fillText("Slash count:" + state.slash_count, 10, 20)
  ctx.fillText("Attack itvl:" + state.attack_interval, 10, 40)
  ctx.fillText("Wepon level:" + state.wepon_level, 10, 60)

  //Debug
  //Chara
  drawCircle(state.x + state.w/2, state.y + state.h/2, state.w/2)
  //Attack area
  drawCircle(state.x + state.w/2, state.y + state.h/2, state.w/2 + state.wepon_level*tiliW/2)
}

const gameover = () =>{
  //Input
  if(state.mouse.left_click){
    state.scene = 0
  }

  //Draw
  //fill
  ctx.fillStyle = "rgb(0, 0, 0)"
  ctx.fillRect(0, 0, canvas_width, canvas_height);
  //Print text
  ctx.fillStyle = "orange"
  ctx.font = "48px serif"
  ctx.fillText("GAME OVER", 
    canvas_width / 2 - 50 , 
    canvas_height / 2 - 20)

}

//Main loop
const loop = (timestamp) => {
  var progress = timestamp - lastRender

  switch(state.scene){
    case 0: //Game title
      title()
      break
    case 1: //Game play
      update(progress)
      draw()
      break
    case 2: //Game over
      gameover()
      break
  }

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop)

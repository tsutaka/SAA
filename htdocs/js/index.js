
// Global 
const width = 1280
const height = 720
const tiliW = 64
const tileH = 64
let state = {
  x: (width / 2),
  y: (height / 2),
  w: tiliW,
  h: tileH,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  },
  clickMouse: {
    x: false,
    y: false
  }
}

// Enemy state
const enemy_speed = 3
const enemy_distance = 64
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
/*
//create moster test
enemy_state[0]["exist"] = 1
enemy_state[0]["type"] = 0
enemy_state[0]["w"] = tiliW
enemy_state[0]["h"] = tileH
enemy_state[0]["x"] = width / 2 - enemy_state[0]["w"] / 2
enemy_state[0]["y"] = height / 2 - enemy_state[0]["h"] / 2
enemy_state[0]["hp"] = 5
*/

let keyMap = {
  68: 'right',  //D
  65: 'left',   //A
  87: 'up',     //W
  83: 'down'    //S
}
keydown = (event) => {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = true
}
keyup = (event) => {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}
onClick = (e) =>{
  var rect = e.target.getBoundingClientRect();
  state.clickMouse[x] = e.clientX - rect.left;
  state.clickMouse[y] = e.clientY - rect.top;
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)

//utils function

//random 0-num
random = (num) => {
  return Math.floor(Math.random() * (num + 1))
}

// Windwo initialize
window.onload = () => {
}

//Update
update = (progress) => {

  //Key input
  if (state.pressedKeys.left)   { state.x -= progress }
  if (state.pressedKeys.right)  { state.x += progress }
  if (state.pressedKeys.up)     { state.y -= progress }
  if (state.pressedKeys.down)   { state.y += progress }

  // Flip position at boundaries
  if (state.x > width)  { state.x -= width }
  else if (state.x < 0) { state.x += width }
  if (state.y > height) { state.y -= height }
  else if (state.y < 0) { state.y += height }

  //Enemy Create
  if(random(appearance_interval) == 0){
    for(let i = 0; i < enemy_state.length; i++){
      if(enemy_state[i]["exist"] == 0){
        enemy_state[i]["exist"] = 1
        enemy_state[i]["type"] = random(2)
        enemy_state[i]["w"] = tiliW
        enemy_state[i]["h"] = tileH
        enemy_state[i]["x"] = random(width - 1)
        enemy_state[i]["y"] = random(height - 1)
        enemy_state[i]["hp"] = 5
        break
      }
    }
  }

  //Enemy update
  enemy_state.forEach((enemy) => {
    if(enemy["exist"] == 1){
      switch(enemy["type"]){
        case 0:
          enemy["x"] += Math.floor(Math.random() * (enemy_speed * 2 + 1)) - enemy_speed
          enemy["y"] += Math.floor(Math.random() * (enemy_speed * 2 + 1)) - enemy_speed
          break
        case 1:
          enemy_x_center = enemy["x"] - (enemy["w"] / 2)
          enemy_y_center = enemy["y"] - (enemy["h"] / 2)
          chara_x_center = state.x - (state.w / 2)
          chara_y_center = state.y - (state.h / 2)
          x_diff = chara_x_center - enemy_x_center
          y_diff = chara_y_center - enemy_y_center
          let rad1 = Math.atan2(y_diff, x_diff)
          if(Math.sqrt(y_diff*y_diff + x_diff*x_diff) >= enemy_distance){
            enemy["x"] += Math.cos(rad1) * enemy_speed
            enemy["y"] += Math.sin(rad1) * enemy_speed
          }
          break
        case 2:
          enemy_x_center = enemy["x"] - (enemy["w"] / 2)
          enemy_y_center = enemy["y"] - (enemy["h"] / 2)
          chara_x_center = state.x - (state.w / 2)
          chara_y_center = state.y - (state.h / 2)
          let rad2 = Math.atan2(
            chara_y_center - enemy_y_center, 
            chara_x_center - enemy_x_center
            )
          enemy["x"] -= Math.cos(rad2) * enemy_speed
          enemy["y"] -= Math.sin(rad2) * enemy_speed
          break
      }
      // Delete enemy in out of view
      if (enemy["x"] > width)   { enemy["exist"] = 0 }
      else if (enemy["x"] < 0)  { enemy["exist"] = 0 }
      if (enemy["y"] > height)  { enemy["exist"] = 0 }
      else if (enemy["y"] < 0)  { enemy["exist"] = 0 }
    }
  })

}

//Draw
draw = () => {
  // canvas
  const board = document.querySelector("#board")
  const ctx = board.getContext("2d")

  //fill
  ctx.fillStyle = "rgb(0, 0, 0)"
  ctx.fillRect(0,0,1280,720);

  // Draw chara
  const chara_img = new Image()
  chara_img.src = "img/chara01.png"
  ctx.drawImage(chara_img, 0, 0, 64, 64, state.x, state.y, state.w, state.h)
  
  // Draw Enemy
  enemy_state.forEach((enemy) => {
    if(enemy["exist"] == 1){
      //TODO:画像のロードは最初の一回のみにした方が良い
      const enemy_img = new Image()
      switch(enemy["type"]){
        case 0:
          enemy_img.src = "img/enemy00.png"
          break
        case 1:
          enemy_img.src = "img/enemy01.png"
          break
        case 2:
          enemy_img.src = "img/enemy02.png"
          break
      }
      ctx.drawImage(
        enemy_img, 
        0, 0,
        397, 388,  
        enemy["x"], enemy["y"], 
        enemy["w"], enemy["h"])
    }
  })

}

//Main loop
loop = (timestamp) => {
  var progress = timestamp - lastRender

  update(progress)
  draw()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop)


// Global 
var width = 1280
var height = 720
var state = {
  x: (width / 2),
  y: (height / 2),
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  }
}

var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down'
}
function keydown(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = true
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)

// Windwo initialize
window.onload = ()=>{
}

//Update
update = (progress) => {

  //Key input
  if (state.pressedKeys.left) {
    state.x -= progress
  }
  if (state.pressedKeys.right) {
    state.x += progress
  }
  if (state.pressedKeys.up) {
    state.y -= progress
  }
  if (state.pressedKeys.down) {
    state.y += progress
  }

  // Flip position at boundaries
  if (state.x > width) {
    state.x -= width
  }
  else if (state.x < 0) {
    state.x += width
  }
  if (state.y > height) {
    state.y -= height
  }
  else if (state.y < 0) {
    state.y += height
  }

}

//Draw
draw = () => {
  // canvas
  const board = document.querySelector("#board")
  const ctx = board.getContext("2d")

  //fill
  ctx.fillStyle = "rgb(0, 0, 0)"
  ctx.fillRect(0,0,1280,720);

  // Load image
  const chara = new Image()
  chara.src = "img/chara01.png"
  ctx.drawImage(chara, 0, 0, 64, 64, state.x, state.y, 64, 64)
  
  // console.log(String(state.x) + String(state.y))
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

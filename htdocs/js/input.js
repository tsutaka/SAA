'use strict'

const keyDown = (event) => {
  var key = KEYMAP[event.keyCode]
  state.pressedKeys[key] = true
}
window.addEventListener('keydown', keyDown, false)

const keyUp = (event) => {
  var key = KEYMAP[event.keyCode]
  state.pressedKeys[key] = false
}
window.addEventListener('keyup', keyUp, false)

const clickMouseLeft = (e) => {
  const rect = board.getBoundingClientRect();
  const point = {
    x: Math.round(e.clientX - rect.left),
    y: Math.round(e.clientY - rect.top)
  }
  state.mouse.left_x = point.x
  state.mouse.left_y = point.y
  let diff_x = point.x - state.x
  let diff_y = point.y - state.y
  state.direction = Math.atan2(diff_y, diff_x)
}
window.addEventListener('click', clickMouseLeft, false)

const mouseDown = (e) => {
  state.mouse.left_click = true
}
window.addEventListener('mousedown', mouseDown, false)

const mouseUp = (e) => {
  state.mouse.left_click = false
}
window.addEventListener('mouseup', mouseUp, false)
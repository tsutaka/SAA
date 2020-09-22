'use strict'

//Require
/*
<script src="js/const.js"></script>
<script src="js/variable.js"></script>
<script src="js/input.js"></script>
<script src="js/util.js"></script>
<script src="js/draw.js"></script>
<script src="js/title_scene.js"></script>
<script src="js/game_scene.js"></script>
<script src="js/gameover_scene.js"></script>
<script src="js/main.js"></script>
*/

// Global 
const board = document.querySelector('#board')
const ctx = board.getContext('2d')

// Windwo initialize
window.onload = () => {
}

//Main loop
const loop = (timestamp) => {
  var progress = timestamp - lastRender

  switch(state.scene){
    case 0: //Game title
      updateTitle()
      drawTitle()
      break
    case 1: //Game play
      updateGame(progress)
      drawGame()
      break
    case 2: //Game over
      updateGameover()
      drawGameover()
      break
  }

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop)

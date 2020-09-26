'use strict'

const CANVAS_WIDTH = 1280
const CANVAS_HEIGHT = 720
const TILE_W = 64
const TILE_H = 64
const ATTACK_INTERVAL_MAX = 20
const LEVELUP_TABLE = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33]
const ENEMY_SPEED = 3
const COLLISION_DISTANCE = TILE_W / 4
const ENEMY_DISTANCE = TILE_W / 5 
const APPEARANCE_INTERVAL = 50
const ENEMY_MAX = 100

const KEYMAP = {
  68: 'right',  //D
  65: 'left',   //A
  87: 'up',     //W
  83: 'down',   //S
  27: 'esc'     //ESC
}

const WEAPON_LEVEL_MAX = 4
const SWORD_R_TABLE = [1.5, 2, 2.5, 3, 3.5]
const SWORD_V_TABLE = [1, 1.2, 1.5, 2, 3]
const SWORD_A_TABLE = [Math.PI/2/3, Math.PI/2/2, Math.PI/2, Math.PI*1.2/2, Math.PI*1.5/2]
const SWORD_S_TABLE = [1, 2, 3, 5, 8]

const ARROW_R_TABLE = [5, 6, 8, 11, 15]
const ARROW_V_TABLE = [10, 8, 6, 4, 2]
const ARROW_A_TABLE = [1, 3, 5, 7, 9]
const ARROW_S_TABLE = [1, 2, 3, 5, 8]
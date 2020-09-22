"use strict"

const CANVAS_WIDTH = 1280
const CANVAS_HEIGHT = 720
const TILE_W = 64
const TILE_H = 64
const ATTACK_INTERVAL_MAX = 20
const LEVELUP_TABLE = [5, 10, 20, 50]
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
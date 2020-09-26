'use strict'

let checkLevelUp = () => {
  if(state.wepon_level < LEVELUP_TABLE.length){
    if(LEVELUP_TABLE[state.wepon_level] <= state.slash_count){
      return true
    }
  }
  return false
}

const levelUp = () => {
  state.wepon_level += 1
  
  //Weapon level up
  if(state.sword_level.range < WEAPON_LEVEL_MAX || 
    state.sword_level.velocity < WEAPON_LEVEL_MAX || 
    state.sword_level.arc < WEAPON_LEVEL_MAX || 
    state.sword_level.strength < WEAPON_LEVEL_MAX){
    for(let i = 0; i < 100; i++){
      let flag = getRandomNum(3)
      if(flag === 0){
        if(state.sword_level.range >= WEAPON_LEVEL_MAX){
          continue
        }
        state.sword_level.range += 1
        break
      }
      else if(flag === 1){
        if(state.sword_level.velocity >= WEAPON_LEVEL_MAX){
          continue
        }
        state.sword_level.velocity += 1
        break
      }
      else if(flag === 2){
        if(state.sword_level.arc >= WEAPON_LEVEL_MAX){
          continue
        }
        state.sword_level.arc += 1
        break
      }
      else if(flag === 3){
        if(state.sword_level.strength >= WEAPON_LEVEL_MAX){
          continue
        }
        state.sword_level.strength += 1
        break
      }

      if(i === 99){
        console.log('level up failed.')
      }
    }
  }
}

const updateGame = (progress) => {

  //Key input
  if (state.pressedKeys.left)   { state.x -= progress * 0.5 }
  if (state.pressedKeys.right)  { state.x += progress * 0.5 }
  if (state.pressedKeys.up)     { state.y -= progress * 0.5 }
  if (state.pressedKeys.down)   { state.y += progress * 0.5 }
  if (state.pressedKeys.esc)    { state.scene = 0 }

  // Flip position at boundaries
  if (state.x > CANVAS_WIDTH)   { state.x -= CANVAS_WIDTH }
  else if (state.x < 0)         { state.x += CANVAS_WIDTH }
  if (state.y > CANVAS_HEIGHT)  { state.y -= CANVAS_HEIGHT }
  else if (state.y < 0)         { state.y += CANVAS_HEIGHT }

  //Attack
  if(state.mouse.left_click &&
    state.attack_interval === 0){
    state.attack_interval = ATTACK_INTERVAL_MAX

    //Attack collision check
    enemy_state.forEach((enemy) => {
      if(enemy.exist === 1){
        let x_diff = enemy.x - state.x
        let y_diff = enemy.y - state.y
        let distance = enemy.w/2 + state.w/2 + state.wepon_level*TILE_W/2
        
        if((x_diff*x_diff + y_diff*y_diff) < (distance*distance)){
          enemy.exist = 0
          state.slash_count += 1

          //Level up
          if(checkLevelUp()){ 
            levelUp()
          }
        }
      }
    })
  }
  if(state.attack_interval > 0){
    state.attack_interval -= SWORD_V_TABLE[state.sword_level.velocity]

    if(state.attack_interval < 0){
      state.attack_interval = 0
    }
  }


  //Enemy Create
  if(getRandomNum(APPEARANCE_INTERVAL) === 0){
    for(let i = 0; i < enemy_state.length; i++){
      if(enemy_state[i]['exist'] === 0){
        enemy_state[i]['exist'] = 1
        enemy_state[i]['type'] = getRandomNum(2)
        enemy_state[i]['w'] = TILE_W
        enemy_state[i]['h'] = TILE_H
        enemy_state[i]['x'] = getRandomNum(CANVAS_WIDTH - 1)
        enemy_state[i]['y'] = getRandomNum(CANVAS_HEIGHT - 1)
        enemy_state[i]['hp'] = 5
        break
      }
    }
  }

  //Enemy update
  enemy_state.forEach((enemy) => {
    if(enemy['exist'] === 1){
      let enemy_x_center = enemy['x'] - (enemy['w'] / 2)
      let enemy_y_center = enemy['y'] - (enemy['h'] / 2)
      let chara_x_center = state.x - (state.w / 2)
      let chara_y_center = state.y - (state.h / 2)
      let x_diff = chara_x_center - enemy_x_center
      let y_diff = chara_y_center - enemy_y_center
      let rad = Math.atan2(y_diff, x_diff)

      switch(enemy['type']){
        case 0:
          enemy['x'] += Math.floor(Math.random() * (ENEMY_SPEED * 2 + 1)) - ENEMY_SPEED
          enemy['y'] += Math.floor(Math.random() * (ENEMY_SPEED * 2 + 1)) - ENEMY_SPEED
          break
        case 1:
          if(y_diff*y_diff + x_diff*x_diff >= ENEMY_DISTANCE*ENEMY_DISTANCE){
            enemy['x'] += Math.cos(rad) * ENEMY_SPEED
            enemy['y'] += Math.sin(rad) * ENEMY_SPEED
          }
          break
        case 2:
          enemy['x'] -= Math.cos(rad) * ENEMY_SPEED
          enemy['y'] -= Math.sin(rad) * ENEMY_SPEED
          break
      }
      
      // Delete enemy in out of view
      if (enemy['x'] > CANVAS_WIDTH)  { enemy['exist'] = 0 }
      else if (enemy['x'] < 0)        { enemy['exist'] = 0 }
      if (enemy['y'] > CANVAS_HEIGHT) { enemy['exist'] = 0 }
      else if (enemy['y'] < 0)        { enemy['exist'] = 0 }

      //Collision check Game Over
      if(y_diff*y_diff + x_diff*x_diff <= COLLISION_DISTANCE*COLLISION_DISTANCE){
        state.scene = 2
      }
    }
  })

}

//Draw
const drawGame = () => {

  // Clear canvas
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


  // Draw attack
  if(state.attack_interval != 0){
    let center_x = state.x + state.w / 2 + Math.cos(state.direction) * 10
    let center_y = state.y + state.h / 2 + Math.sin(state.direction) * 10
    let arcPhase = state.attack_interval / ATTACK_INTERVAL_MAX * SWORD_A_TABLE[state.sword_level.arc]
    let arcStep = SWORD_A_TABLE[state.sword_level.arc] / ATTACK_INTERVAL_MAX * 4 
    let centerArc = state.direction
    let startArc = centerArc - SWORD_A_TABLE[state.sword_level.arc] / 2 + arcPhase
    let endArc = startArc + arcStep
    // drawArc(ctx, center_x, center_y,
    //   TILE_W * SWORD_R_TABLE[state.sword_level.range] / 2, 
    //   -1 * SWORD_A_TABLE[state.sword_level.arc] / 2, 
    //   SWORD_A_TABLE[state.sword_level.arc] / 2, 
    //   'rgb(100, 0, 0)')
    drawSlash(ctx, center_x, center_y, 
      TILE_W * SWORD_R_TABLE[state.sword_level.range] / 2, 
      startArc, 
      endArc, 
      state.sword_level.strength)
  }

  // Draw chara
  const chara_img = new Image()
  chara_img.src = 'img/chara01.png'
  ctx.drawImage(chara_img, 0, 0, 64, 64, state.x, state.y, state.w, state.h)

  // Draw Enemy
  enemy_state.forEach((enemy) => {
    if(enemy['exist'] === 1){
      //TODO:画像のロードは最初の一回のみにした方が良い
      const enemy_img = new Image()
      let src_x = 0
      let src_y = 0
      switch(enemy['type']){
        case 0:
          enemy_img.src = 'img/enemy00.png'
          src_x = 397
          src_y = 388
          break
        case 1:
          enemy_img.src = 'img/enemy01.png'
          src_x = 412
          src_y = 436
          break
        case 2:
          enemy_img.src = 'img/enemy02.png'
          src_x = 246
          src_y = 323
          break
      }
      ctx.drawImage(
        enemy_img, 
        0, 0,
        src_x, src_y,  
        enemy['x'], enemy['y'], 
        enemy['w'], enemy['h'])

      //Debug
      // drawCircle(ctx, enemy['x'] + enemy['w']/2, enemy['y'] + enemy['h']/2, enemy['w']/2)
    }
  })

  //Print text
  ctx.fillStyle = 'orange'
  ctx.font = '24px serif'
  ctx.fillText('Slash count:' + state.slash_count, 10, 20)
  let level_print = 'Sword' + (state.wepon_level+1) + '(R:'
  level_print += state.sword_level.range + '/V:'
  level_print += state.sword_level.velocity + '/A:'
  level_print += state.sword_level.arc + '/S:'
  level_print += state.sword_level.strength + ')'
  ctx.fillText(level_print, 10, 60)


  //Debug
  //Chara
  // drawCircle(ctx, state.x + state.w/2, state.y + state.h/2, state.w/2)
}
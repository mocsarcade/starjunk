var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")

import Junkership from "./Junkership.js"
import Reference from "./Reference.js"
import Score from "./Score.js"
import GameContainer from "./GameContainer.js"
import Projectile from "./Projectile.js"

export default class PowerUp {

  constructor(bulletSpeed, fireRate, projectileType, isRapid) {

      this.bulletSpeed = bulletSpeed
      this.fireRate = fireRate
      this.projectileType = projectileType
      this.isRapid = isRapid

  }

}


export default class TriShotSpread extends PowerUp {

  constructor() {
      super(80,1, "bullet",false)
  }

  shoot(curXpos,curYpos,curShip,wOffset,hOffset) {
      game.addChild(new Projectile(
              curXpos + wOffset,
              curYpos + hOffset,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
      game.addChild(new Projectile(
              curXpos + wOffset,
              curYpos + hOffset - 3,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
      game.addChild(new Projectile(
              curXpos + wOffset,
              curYpos + hOffset + 3,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
  }



}

export default class QuinShotSpread extends PowerUp {

  constructor() {
      super(80,1, "bullet",true)
  }

  shoot(curXpos,curYpos,curShip,wOffset,hOffset) {
      game.addChild(new Projectile(
              curXpos + wOffset,
              curYpos + hOffset,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
      game.addChild(new Projectile(
              curXpos + wOffset,
              curYpos + hOffset - 3,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
      game.addChild(new Projectile(
              curXpos + wOffset,
              curYpos + hOffset + 3,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
      game.addChild(new Projectile(
              curXpos + wOffset,
              curYpos + hOffset - 6,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
      game.addChild(new Projectile(
              curXpos + wOffset,
              curYpos + hOffset + 6,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
  }



}


export default class PeaShoota extends PowerUp {

  constructor() {
      super(80, 1, "bullet", false)
  }

  shoot(curXpos,curYpos,curShip,wOffset,hOffset) {
      game.addChild(new Projectile(
              curXpos + wOffset,
              curYpos + hOffset,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
  }
}

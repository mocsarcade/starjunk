var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")

import Projectile from "./Projectile.js"

export default class PowerUp {
    constructor() {
        this.fireRate = 80
        this.bulletSpeed = 80
        this.projectileType = "bullet"
    }

    fire(curShip) {
        console.log("nope")
    }
}

export class PeaShoota extends PowerUp {
      constructor() {
          super()
          this.fireRate = 80
          this.bulletSpeed = 80
          this.projectileType = "bullet"
      }

      fire(curShip) {

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
      }

}

export class TriShoota extends PowerUp {
      constructor() {
          super()
          this.fireRate = 80
          this.bulletSpeed = 80
          this.projectileType = "bullet"
      }

      fire(curShip) {

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 + 3,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 - 3,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
      }

}

export class FiveShoota extends PowerUp {
      constructor() {
          super()
          this.fireRate = 80
          this.bulletSpeed = 80
          this.projectileType = "bullet"
      }

      fire(curShip) {

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 + 3,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 - 3,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 + 6,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 - 6,
              curShip, this.fireRate, this.bulletSpeed, this.projectileType))
      }

}

var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")
var Victor = require("victor")

import Reference from "./Reference.js"
import Sound from "./Sound.js"
import Projectile from "./Projectile.js"

export default class PowerUp {
    constructor() {
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.projectileType = "bullet"
        this.kickbackFactor = -160
    }

    fire(curShip) {
        console.log("Error: Calling default fire()")
    }
}

export class PeaShoota extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.piercing = false
      }

      fire(curShip) {
          Sound.playSFX("smallshot")

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType, this.piercing))
      }
}

export class TriShoota extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.piercing = false
      }

      fire(curShip) {
          Sound.playSFX("bigshot")

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 + 3,
              this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 - 3,
              this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))
      }

}

export class FiveShoota extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.piercing = false
      }

      fire(curShip) {
          Sound.playSFX("bigshot")

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 + 3,
              this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 - 3,
              this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 + 6,
              this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 - 6,
              this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))
      }

}

export class RapidFire extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = Reference.FAST_BULLET_SPEED
          this.projectileType = "bullet"
          this.rapidFire = true
          this.piercing = false
      }

      fire(curShip) {
          Sound.playSFX("smallshot")

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))
      }

}

export class RapidSprayShot extends PowerUp {

      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.vectorBottom = new Victor(1,0.25)
          this.vectorTop = new Victor(1,-0.25)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.rapidFire = true
          this.piercing = false

          this.vector.normalize()
          this.vectorTop.normalize()
          this.vectorBottom.normalize()
      }

        fire(curShip) {
            Sound.playSFX("bigshot")

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorTop, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorBottom, curShip, this.bulletSpeed, this.projectileType, this.piercing))
        }



}

export class SprayShot extends PowerUp {

      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.vectorBottom = new Victor(1,0.25)
          this.vectorTop = new Victor(1,-0.25)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.piercing = false
      }

        fire(curShip) {
            Sound.playSFX("bigshot")

            this.vector.normalize()
            this.vectorTop.normalize()
            this.vectorBottom.normalize()

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorTop, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorBottom, curShip, this.bulletSpeed, this.projectileType, this.piercing))
        }



}

export class SuperSprayShot extends PowerUp {

      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.vectorBottom = new Victor(1,0.25)
          this.vectorTop = new Victor(1,-0.25)
          this.vectorBottom2 = new Victor(1,0.1)
          this.vectorTop2 = new Victor(1,-0.1)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.piercing = false

          this.vector.normalize()
          this.vectorBottom.normalize()
          this.vectorTop.normalize()
          this.vectorBottom2.normalize()
          this.vectorTop2.normalize()
      }

        fire(curShip) {
            Sound.playSFX("bigshot")

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorBottom, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorTop, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorBottom2, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorTop2, curShip, this.bulletSpeed, this.projectileType, this.piercing))
        }



}

export class CrazySprayShot extends PowerUp {

      constructor() {
          super()
          this.upperBounds = new Victor(0,90)
          this.lowerBounds = new Victor(90,-90)


          this.vector = new Victor(1,0)
          this.vectorBottom = new Victor(1,0)
          this.vectorTop = new Victor(1,0)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.piercing = false

      }

        fire(curShip) {
            Sound.playSFX("crazyshot")

            this.vector.randomizeY(this.upperBounds,this.lowerBounds)
            this.vectorBottom.randomizeY(this.upperBounds,this.lowerBounds)
            this.vectorTop.randomizeY(this.upperBounds,this.lowerBounds)

            this.vector.randomizeX(this.upperBounds,this.lowerBounds)
            this.vectorBottom.randomizeX(this.upperBounds,this.lowerBounds)
            this.vectorTop.randomizeX(this.upperBounds,this.lowerBounds)

            this.vector.normalize()
            this.vectorBottom.normalize()
            this.vectorTop.normalize()

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorBottom, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorTop, curShip, this.bulletSpeed, this.projectileType, this.piercing))
        }
}

export class VertSprayShot extends PowerUp {

      constructor() {
          super()

          this.vectorDown = new Victor(0,1)
          this.vectorLeft = new Victor(0.25,1)
          this.vectorRight = new Victor(-0.25,1)

          this.vectorUp = new Victor(0,-1)
          this.vectorLeft2 = new Victor(0.25,-1)
          this.vectorRight2 = new Victor(-0.25,-1)

          this.vectorLeft.normalize()
          this.vectorRight.normalize()
          this.vectorLeft2.normalize()
          this.vectorRight2.normalize()


          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.piercing = false
      }

        fire(curShip) {
            Sound.playSFX("bigshot")

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorUp, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorLeft, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorRight, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorDown, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorLeft2, curShip, this.bulletSpeed, this.projectileType, this.piercing))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorRight2, curShip, this.bulletSpeed, this.projectileType, this.piercing))
        }
}

export class VertShoota extends PowerUp {
      constructor() {
          super()
          this.vectorDown = new Victor(0,1)
          this.vectorUp = new Victor(0,-1)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.piercing = false
      }

      fire(curShip) {
          Sound.playSFX("smallshot")

          game.addChild(new Projectile(
              curShip.position.x + curShip.width/2,
              curShip.position.y + curShip.height/2, this.vectorUp,
              curShip, this.bulletSpeed, this.projectileType, this.piercing))

          game.addChild(new Projectile(
              curShip.position.x + curShip.width/2,
              curShip.position.y + curShip.height/2, this.vectorDown,
              curShip, this.bulletSpeed, this.projectileType, this.piercing))
      }

}

export class BFG extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = Reference.FAST_BULLET_SPEED
          this.projectileType = "bullet"
          this.BFGrapid = true
          this.piercing = false
      }

      BfgFire(curShip,delta) {
          Sound.playSFX("BFG")

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              this.vector, curShip, this.bulletSpeed, this.projectileType, this.piercing))

          curShip.move(this.kickbackFactor*delta, "x")
      }

}

export class Laser extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = Reference.LASER_NORMAL
          this.projectileType = "laser"
          this.piercing = false
      }

      fire(curShip) {

          var laser = new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType, this.piercing)
          laser.scale.x = 50
          game.addChild(laser)
      }
}

export class PiercingLaser extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = Reference.LASER_NORMAL
          this.projectileType = "laser"
          this.piercing = true
      }

      fire(curShip) {

          var laser = new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType, this.piercing)
          laser.scale.x = Reference.GAME_WIDTH - curShip.position.x
          game.addChild(laser)
      }
}

export class SuperLaser extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = Reference.LASER_NORMAL
          this.projectileType = "laser"
          this.piercing = true
      }

      fire(curShip) {
          var laser2 = new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + 10 + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType, this.piercing)
          laser2.scale.x = Reference.GAME_WIDTH - curShip.position.x
          game.addChild(laser2)

          var laser3 = new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y - 6 + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType, this.piercing)
          laser3.scale.x = Reference.GAME_WIDTH - curShip.position.x
          game.addChild(laser3)

          var laser = new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType, this.piercing)
          laser.scale.x = Reference.GAME_WIDTH - curShip.position.x
          laser.scale.y = 3
          game.addChild(laser)
      }
}

export class Mine extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(0,0)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.piercing = false
      }

      fire(curShip) {
          var mine = new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType, this.piercing)
          game.addChild(mine)
      }
}

var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")
var Victor = require("victor")

import Projectile from "./Projectile.js"

export default class PowerUp {
    constructor() {
        this.bulletSpeed = 1.75
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
          this.bulletSpeed = 1.75
          this.projectileType = "bullet"
      }

      fire(curShip) {

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType))
      }
}

export class TriShoota extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = 1.75
          this.projectileType = "bullet"
      }

      fire(curShip) {
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              this.vector, curShip, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 + 3,
              this.vector, curShip, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 - 3,
              this.vector, curShip, this.bulletSpeed, this.projectileType))
      }

}

export class FiveShoota extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = 1.75
          this.projectileType = "bullet"
      }

      fire(curShip) {

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              this.vector, curShip, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 + 3,
              this.vector, curShip, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 - 3,
              this.vector, curShip, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 + 6,
              this.vector, curShip, this.bulletSpeed, this.projectileType))
          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2 - 6,
              this.vector, curShip, this.bulletSpeed, this.projectileType))
      }

}

export class RapidFire extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = 3
          this.projectileType = "bullet"
          this.rapidFire = true
      }

      fire(curShip) {

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              this.vector, curShip, this.bulletSpeed, this.projectileType))
      }

}

export class RapidSprayShot extends PowerUp {

      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.vectorBottom = new Victor(1,0.25)
          this.vectorTop = new Victor(1,-0.25)
          this.bulletSpeed = 1.75
          this.projectileType = "bullet"
          this.rapidFire = true

          this.vector.normalize()
          this.vectorTop.normalize()
          this.vectorBottom.normalize()
      }

        fire(curShip) {

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorTop, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorBottom, curShip, this.bulletSpeed, this.projectileType))
        }



}

export class SprayShot extends PowerUp {

      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.vectorBottom = new Victor(1,0.25)
          this.vectorTop = new Victor(1,-0.25)
          this.bulletSpeed = 1.75
          this.projectileType = "bullet"
      }

        fire(curShip) {

            this.vector.normalize()
            this.vectorTop.normalize()
            this.vectorBottom.normalize()

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorTop, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorBottom, curShip, this.bulletSpeed, this.projectileType))
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
          this.bulletSpeed = 1.75
          this.projectileType = "bullet"

          this.vector.normalize()
          this.vectorBottom.normalize()
          this.vectorTop.normalize()
          this.vectorBottom2.normalize()
          this.vectorTop2.normalize()
      }

        fire(curShip) {

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorBottom, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorTop, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorBottom2, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorTop2, curShip, this.bulletSpeed, this.projectileType))
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
          this.bulletSpeed = 1.75
          this.projectileType = "bullet"

      }

        fire(curShip) {

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
            this.vector, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorBottom, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorTop, curShip, this.bulletSpeed, this.projectileType))
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


          this.bulletSpeed = 1.75
          this.projectileType = "bullet"
      }

        fire(curShip) {

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorUp, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorLeft, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorRight, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorDown, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorLeft2, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorRight2, curShip, this.bulletSpeed, this.projectileType))
        }



}

export class VertShoota extends PowerUp {
      constructor() {
          super()
          this.vectorDown = new Victor(0,1)
          this.vectorUp = new Victor(0,-1)
          this.bulletSpeed = 1.75
          this.projectileType = "bullet"
      }

      fire(curShip) {


          game.addChild(new Projectile(
              curShip.position.x + curShip.width/2,
              curShip.position.y + curShip.height/2, this.vectorUp,
              curShip, this.bulletSpeed, this.projectileType))

          game.addChild(new Projectile(
              curShip.position.x + curShip.width/2,
              curShip.position.y + curShip.height/2, this.vectorDown,
              curShip, this.bulletSpeed, this.projectileType))
      }

}

export class BFG extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = 3
          this.projectileType = "bullet"
          this.BFGrapid = true
      }

      BfgFire(curShip,delta) {

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              this.vector, curShip, this.bulletSpeed, this.projectileType))

          curShip.move(this.kickbackFactor*delta, "x")
      }

}

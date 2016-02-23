var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")
var Victor = require("victor")

import Projectile from "./Projectile.js"

export default class PowerUp {
    constructor() {
        this.bulletSpeed = 1
        this.projectileType = "bullet"
    }

    fire(curShip) {
        console.log("nope")
    }
}

export class PeaShoota extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = 1
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
          this.bulletSpeed = 1
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
          this.bulletSpeed = 1
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
          this.bulletSpeed = 2
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
          this.vectorN = new Victor(1,0.25)
          this.vectorP = new Victor(1,-0.25)
          this.bulletSpeed = 1
          this.projectileType = "bullet"
          this.rapidFire = true
      }

        fire(curShip) {

            this.vector.normalize()
            this.vectorN.normalize()
            this.vectorP.normalize()

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorP, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorN, curShip, this.bulletSpeed, this.projectileType))
        }



}

export class SprayShot extends PowerUp {

      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.vectorN = new Victor(1,0.25)
          this.vectorP = new Victor(1,-0.25)
          this.bulletSpeed = 1
          this.projectileType = "bullet"
      }

        fire(curShip) {

            this.vector.normalize()
            this.vectorN.normalize()
            this.vectorP.normalize()

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorP, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorN, curShip, this.bulletSpeed, this.projectileType))
        }



}

export class SuperSprayShot extends PowerUp {

      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.vectorN = new Victor(1,0.25)
          this.vectorP = new Victor(1,-0.25)
          this.vectorN2 = new Victor(1,0.1)
          this.vectorP2 = new Victor(1,-0.1)
          this.bulletSpeed = 1
          this.projectileType = "bullet"
      }

        fire(curShip) {
            this.vector.normalize()
            this.vectorN.normalize()
            this.vectorP.normalize()
            this.vectorN2.normalize()
            this.vectorP2.normalize()

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorP, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorN, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorP2, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorN2, curShip, this.bulletSpeed, this.projectileType))
        }



}

export class CrazySprayShot extends PowerUp {

      constructor() {
          super()
          this.upperBounds = new Victor(0,90)
          this.lowerBounds = new Victor(90,-90)


          this.vector = new Victor(1,0)
          this.vectorN = new Victor(1,0)
          this.vectorP = new Victor(1,0)
          this.bulletSpeed = 1
          this.projectileType = "bullet"
      }

        fire(curShip) {

            this.vector.randomizeY(this.upperBounds,this.lowerBounds)
            this.vectorN.randomizeY(this.upperBounds,this.lowerBounds)
            this.vectorP.randomizeY(this.upperBounds,this.lowerBounds)

            this.vector.randomizeX(this.upperBounds,this.lowerBounds)
            this.vectorN.randomizeX(this.upperBounds,this.lowerBounds)
            this.vectorP.randomizeX(this.upperBounds,this.lowerBounds)

            this.vector.normalize()
            this.vectorN.normalize()
            this.vectorP.normalize()

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorP, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vectorN, curShip, this.bulletSpeed, this.projectileType))
        }



}

export class VertSprayShot extends PowerUp {

      constructor() {
          super()

          this.vector = new Victor(0,1)
          this.vectorN = new Victor(0.25,1)
          this.vectorP = new Victor(-0.25,1)

          this.vector2 = new Victor(0,-1)
          this.vectorN2 = new Victor(0.25,-1)
          this.vectorP2 = new Victor(-0.25,-1)

          this.bulletSpeed = 1
          this.projectileType = "bullet"
      }

        fire(curShip) {

            this.vector.normalize()
            this.vectorN.normalize()
            this.vectorP.normalize()
            this.vectorN2.normalize()
            this.vectorP2.normalize()

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorP, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorN, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vector2, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorP2, curShip, this.bulletSpeed, this.projectileType))

            game.addChild(new Projectile(
            curShip.position.x + curShip.width/2,
            curShip.position.y + curShip.height/2,
            this.vectorN2, curShip, this.bulletSpeed, this.projectileType))
        }



}

export class VertShoota extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(0,1)
          this.vector2 = new Victor(0,-1)
          this.bulletSpeed = 1
          this.projectileType = "bullet"
      }

      fire(curShip) {


          game.addChild(new Projectile(
              curShip.position.x + curShip.width/2,
              curShip.position.y + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType))

          game.addChild(new Projectile(
              curShip.position.x + curShip.width/2,
              curShip.position.y + curShip.height/2, this.vector2,
              curShip, this.bulletSpeed, this.projectileType))
      }

}

export class BFG extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(1,0)
          this.bulletSpeed = 2
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

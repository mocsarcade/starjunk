var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")
var Victor = require("victor")

import Reference from "./Reference.js"
import Sound from "./Sound.js"
import Projectile from "./Projectile.js"

class PowerUp {
    constructor() {
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.projectileType = "bullet"
        this.kickbackFactor = -160
        this.name = "Power Up"
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
          this.name = "PEA SHOOTER"
      }

      fire(curShip) {
          Sound.playSFX("smallshot")

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
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.name = "TRI SHOT"
      }

      fire(curShip) {
          Sound.playSFX("bigshot")

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
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.name = "FIVE SHOT"
      }

      fire(curShip) {
          Sound.playSFX("bigshot")

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
          this.bulletSpeed = Reference.FAST_BULLET_SPEED
          this.projectileType = "bullet"
          this.rapidFire = true
          this.reloadInterval = 10
          this.name = "RAPID FIRE"
      }

      fire(curShip) {
          Sound.playSFX("smallshot")

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
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.rapidFire = true
          this.reloadInterval = 10
          this.name = "RAPID SPRAY"

          this.vector.normalize()
          this.vectorTop.normalize()
          this.vectorBottom.normalize()
      }

        fire(curShip) {
            Sound.playSFX("bigshot")

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
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.name = "SPRAY SHOT"
      }

        fire(curShip) {
            Sound.playSFX("bigshot")

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
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.name = "SUPER SPRAY"

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
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.name = "CRAZY SPRAY"

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
          this.name = "VERTICAL SPRAY"

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
      }

        fire(curShip) {
            Sound.playSFX("bigshot")

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
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "bullet"
          this.name = "VERTICAL SHOT"
      }

      fire(curShip) {
          Sound.playSFX("smallshot")

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
          this.bulletSpeed = Reference.FAST_BULLET_SPEED
          this.projectileType = "bullet"
          this.BFGrapid = true
          this.reloadInterval = 2.5
          this.name = "BFG"
      }

      fire(curShip,delta) {
          Sound.playSFX("BFG")

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              this.vector, curShip, this.bulletSpeed, this.projectileType))

          curShip.move(this.kickbackFactor*delta, "x")
      }

}

export class Laser extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(5,0)
          this.bullestSpeed = Reference.NORMAL_LASER_SPEED
          this.projectileType = "laser"
          this.name = "LASER"
      }

      fire(curShip) {
          Sound.playSFX("crazyshot")
          var laser = new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2,
              this.vector, curShip, this.bulletSpeed, this.projectileType
          )
          laser.scale.x = 5
          game.addChild(laser)
      }
}

export class PiercingLaser extends PowerUp {
     constructor() {
         super()
         this.vector = new Victor(5,0)
         this.bullestSpeed = Reference.NORMAL_LASER_SPEED
         this.projectileType = "piercinglaser"
         this.name = "PIERCING LASER"
     }

     fire(curShip) {
         Sound.playSFX("bigshot")
         var laser = new Projectile(
             curShip.position.x + curShip.width,
             curShip.position.y + curShip.height/2,
             this.vector, curShip, this.bulletSpeed, this.projectileType
         )
         laser.scale.x = 5
         game.addChild(laser)
     }
}

export class SuperLaser extends PowerUp {
    constructor() {
        super()
        this.vector = new Victor(0,0)
        this.bullestSpeed = Reference.NORMAL_LASER_SPEED
        this.projectileType = "superlaser"
        this.name = "SUPER LASER"
    }

    fire(curShip) {
        Sound.playSFX("bigshot")
        var laser = new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2 - 3,
            this.vector, curShip, this.bulletSpeed, this.projectileType
        )
        laser.scale.x = 25
        laser.scale.y = .05
        game.addChild(laser)
    }
}

export class Mine extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(0,0)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "mine"
          this.name = "MINE"
      }

      fire(curShip) {
          Sound.playSFX("smallshot")

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType))
      }
}

export class SuperMine extends PowerUp {
      constructor() {
          super()
          this.vector = new Victor(0,0)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "superMine"
          this.x
          this.y
          this.name = "SUPER MINE"
      }

      fire(curShip) {
          Sound.playSFX("bigshot")

          this.x = curShip.position.x
          this.y = curShip.position.y

          game.addChild(new Projectile(
              curShip.position.x + curShip.width,
              curShip.position.y + curShip.height/2, this.vector,
              curShip, this.bulletSpeed, this.projectileType))
      }
}

export class PaintShot extends PowerUp {

      constructor() {
          super()
          this.upperBounds = new Victor(0,15)
          this.lowerBounds = new Victor(15,-15)


          this.vector = new Victor(1,0)
          this.vectorBottom = new Victor(1,0)
          this.vectorTop = new Victor(1,0)
          this.vector2 = new Victor(1,0)
          this.vectorBottom2 = new Victor(1,0)
          this.vectorTop2 = new Victor(1,0)
          this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
          this.projectileType = "paintShot"
          this.name = "PAINT GUN"
      }

        fire(curShip) {
            Sound.playSFX("crazyshot")

            this.vector.randomizeY(this.upperBounds,this.lowerBounds)
            this.vectorBottom.randomizeY(this.upperBounds,this.lowerBounds)
            this.vectorTop.randomizeY(this.upperBounds,this.lowerBounds)

            this.vector.randomizeX(this.upperBounds,this.lowerBounds)
            this.vectorBottom.randomizeX(this.upperBounds,this.lowerBounds)
            this.vectorTop.randomizeX(this.upperBounds,this.lowerBounds)

            this.vector2.randomizeY(this.upperBounds,this.lowerBounds)
            this.vectorBottom2.randomizeY(this.upperBounds,this.lowerBounds)
            this.vectorTop2.randomizeY(this.upperBounds,this.lowerBounds)

            this.vector2.randomizeX(this.upperBounds,this.lowerBounds)
            this.vectorBottom2.randomizeX(this.upperBounds,this.lowerBounds)
            this.vectorTop2.randomizeX(this.upperBounds,this.lowerBounds)

            this.vector.normalize()
            this.vectorBottom.normalize()
            this.vectorTop.normalize()

            this.vector2.normalize()
            this.vectorBottom2.normalize()
            this.vectorTop2.normalize()

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
            this.vector2, curShip, this.bulletSpeed, this.projectileType))

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

export class SineShot extends PowerUp {
    constructor() {
        super()
        this.vector = new Victor(1,0)
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.rapidFire = true
        this.reloadInterval = 12
        this.name = "SINE SHOT"
    }

    fire(curShip) {
        Sound.playSFX("smallshot")

        game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, "sineup"))
    }
}

export class DoubleSineShot extends PowerUp {
    constructor() {
        super()
        this.vector = new Victor(1,0)
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.rapidFire = true
        this.reloadInterval = 12
        this.name = "DOUBLE SINE SHOT"
    }

    fire(curShip) {
        Sound.playSFX("smallshot")

        game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, "sineup"))

        game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, "sinedown"))
    }
}

export class Sword extends PowerUp {
    constructor() {
        super()
        this.vector = new Victor(0,0)
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.name = "SWORD"
        this.projectileType = "sword"
    }

    fire(curShip) {
        Sound.playSFX("crazyshot")
        this.curSword = new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2, this.vector,
            curShip, this.bulletSpeed, this.projectileType)
        game.addChild(this.curSword)
    }


}

export class Shield extends PowerUp {
    constructor() {
        super()
        this.vector = new Victor(0,0)
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.name = "shield"
        this.projectileType = "shield"
    }

    fire(curShip) {
        Sound.playSFX("crazyshot")
        this.curShield = new Projectile(
            curShip.position.x - 25,
            curShip.position.y - 20, this.vector,
            curShip, this.bulletSpeed, this.projectileType)
        game.addChild(this.curShield)
    }


}

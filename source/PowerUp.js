var Victor = require("victor")
import Reference from "./Reference.js"
import Sound from "./Sound.js"
import Projectile, * as Projectiles from "./Projectile.js"

class PowerUp {
    constructor() {
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.projectileType = "bullet"
        this.name = "Power Up"
    }

    fire(curShip) {
        console.log("Error: Calling default fire()")
    }

    destroy() {

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

        for (var i = 0; i < 3; i++) {
            game.addChild(new Projectile(
                curShip.position.x + curShip.width,
                curShip.position.y + curShip.height/2 + 3 * (i - 1),
                this.vector, curShip, this.bulletSpeed, this.projectileType))
        }
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

        for (var i = 0; i < 5; i++) {
            game.addChild(new Projectile(
                curShip.position.x + curShip.width,
                curShip.position.y + curShip.height/2 + 3 * (i - 2),
                this.vector, curShip, this.bulletSpeed, this.projectileType))
        }
    }
}

export class RapidFire extends PowerUp {
    constructor() {
        super()
        this.vector = new Victor(1,0)
        this.bulletSpeed = Reference.FAST_BULLET_SPEED
        this.projectileType = "bullet"
        this.reload = {
            time: 0,
            limit: 10
        }
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

class AbstractSprayShot extends PowerUp {
    constructor() {
        super()
        this.vectors = []
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.projectileType = "bullet"
    }

    fire(curShip) {
        Sound.playSFX("bigshot")

        this.vectors.forEach((vector) => {
            game.addChild(new Projectile(
                curShip.position.x + curShip.width,
                curShip.position.y + curShip.height/2,
                vector, curShip, this.bulletSpeed, this.projectileType))
        })
    }
}

export class SprayShot extends AbstractSprayShot {
    constructor() {
        super()
        for (var i = 0; i < 3; i++) {
            var yDirection = (i - 1) / 4
            var vector = new Victor(1, yDirection).normalize()
            this.vectors.push(vector)
        }
        this.name = "SPRAY SHOT"
    }
}

export class SuperSprayShot extends AbstractSprayShot {
    constructor() {
        super()
        for (var i = 0; i < 5; i++) {
            var yDirection = (i - 2) / 8
            var vector = new Victor(1, yDirection).normalize()
            this.vectors.push(vector)
        }
        this.name = "SUPER SPRAY"
    }
}

export class RapidSprayShot extends AbstractSprayShot {
    constructor() {
        super()
        for (var i = 0; i < 3; i++) {
            var yDirection = (i - 1) / 4
            var vector = new Victor(1, yDirection).normalize()
            this.vectors.push(vector)
        }
        this.reload = {
            time: 0,
            limit: 10
        }
        this.name = "RAPID SPRAY"
    }
}

export class CrazyShot extends PowerUp {
    constructor() {
        super()
        this.upperBounds = new Victor(0,90)
        this.lowerBounds = new Victor(90,-90)
        this.vector = new Victor(1,0)
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.projectileType = "bullet"
        this.name = "CRAZY SPRAY"
    }

    fire(curShip) {
        Sound.playSFX("crazyshot")

        for (var i = 0; i < 3; i++) {
            this.vector.randomizeY(this.upperBounds,this.lowerBounds)
            this.vector.randomizeX(this.upperBounds,this.lowerBounds)
            this.vector.normalize()
            game.addChild(new Projectile(
                curShip.position.x + curShip.width,
                curShip.position.y + curShip.height/2,
                this.vector, curShip, this.bulletSpeed, this.projectileType))
        }
    }

}

export class VertSprayShot extends AbstractSprayShot {
    constructor() {
        super()
        for (var i = 0; i < 3; i++) {
            var xDirection = (i - 1) / 4
            var upVector = new Victor(xDirection, -1).normalize()
            var downVector = new Victor(xDirection, 1).normalize()
            this.vectors.push(upVector)
            this.vectors.push(downVector)
        }
        this.name = "VERTICAL SPRAY"
    }
}

export class VertShoota extends PowerUp {
    constructor() {
        super()
        this.vectors = [new Victor(0,1), new Victor(0,-1)]
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.projectileType = "bullet"
        this.name = "VERTICAL SHOT"
    }

    fire(curShip) {
        Sound.playSFX("smallshot")

        this.vectors.forEach((vector) => {
            game.addChild(new Projectile(
                curShip.position.x + curShip.width,
                curShip.position.y + curShip.height/2,
                vector, curShip, this.bulletSpeed, this.projectileType))
        })
    }

}

export class BFG extends PowerUp {
    constructor() {
        super()
        this.vector = new Victor(1,0)
        this.bulletSpeed = Reference.FAST_BULLET_SPEED
        this.projectileType = "bullet"
        this.BFGrapid = true
        this.reload = {
            time: 0,
            limit: 2.5
        }
        this.kickbackFactor = -160
        this.name = "BFG"
    }

    fire(curShip,delta) {
        Sound.playSFX("BFG")

        game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2,
            this.vector, curShip, this.bulletSpeed, this.projectileType))

        curShip.move(this.kickbackFactor * delta, "x")
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
        var laser = new Projectiles.LaserProjectile(
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
        var laser = new Projectiles.LaserProjectile(
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
        this.cooldown = {
            time: 1 * 1000,
            limit: Reference.LONG_COOLDOWN
        }
    }

    fire(curShip) {
        Sound.playSFX("bigshot")
        var laser = new Projectiles.LaserProjectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2 - 3,
            this.vector, curShip, this.bulletSpeed, this.projectileType
        )
        laser.scale.x = 25
        laser.scale.y = .05
        game.addChild(laser)
    }
}

class AbstractMine extends PowerUp {
    constructor() {
        super()
        this.vector = new Victor(0,0)
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.mines = []
    }

    fire(curShip) {
        Sound.playSFX("smallshot")
        var mine = new Projectiles.MineProjectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2, this.vector,
            curShip, this.bulletSpeed, this.projectileType)
        if(this.mines.length > Reference.MAX_MINES) {
            var destroyMine = this.mines.shift()
            if(destroyMine != null) {
                destroyMine.destroy()
            }
        }
        this.mines.push(mine)
        mine.scale.x = 3
        game.addChild(mine)
        return mine
    }

    destroy() {
        while (this.mines.length > 0) {
            var mine = this.mines.pop()
            if (mine != null && mine !== undefined) {
                mine.destroy()
            }
        }
    }
}

export class Mine extends AbstractMine {
    constructor() {
        super()
        this.projectileType = "mine"
        this.name = "MINE"
    }
}

export class SuperMine extends AbstractMine {
    constructor() {
        super()
        this.projectileType = "superMine"
        this.name = "SUPER MINE"
    }

    fire(curShip) {
        var mine = super.fire(curShip)
        mine.scale.y = 3
    }
}

export class PaintShot extends PowerUp {

    constructor() {
        super()
        this.upperBounds = new Victor(0,15)
        this.lowerBounds = new Victor(15,-15)
        this.vector = new Victor(1,0)
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.projectileType = "paintShot"
        this.name = "PAINT GUN"
        this.cooldown = {
            time: 1 * 1000,
            limit: Reference.SHORT_COOLDOWN
        }
    }

    fire(curShip) {
        Sound.playSFX("crazyshot")
        for (var i = 0; i < 6; i++) {
            this.vector.randomizeY(this.upperBounds,this.lowerBounds)
            this.vector.randomizeX(this.upperBounds,this.lowerBounds)
            this.vector.normalize()
            game.addChild(new Projectiles.PaintProjectile(
                curShip.position.x + curShip.width,
                curShip.position.y + curShip.height/2,
                this.vector, curShip, this.bulletSpeed, this.projectileType))
        }
    }

}

export class SineShot extends PowerUp {
    constructor() {
        super()
        this.vector = new Victor(1,0)
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.reload = {
            time: 0,
            limit: 12
        }
        this.name = "SINE SHOT"
    }

    fire(curShip) {
        Sound.playSFX("smallshot")

        game.addChild(new Projectiles.SineProjectile(
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
        this.reload = {
            time: 0,
            limit: 12
        }
        this.name = "DOUBLE SINE SHOT"
    }

    fire(curShip) {
        Sound.playSFX("smallshot")

        game.addChild(new Projectiles.SineProjectile(
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
    constructor(junkership) {
        super()
        this.vector = new Victor(0,0)
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.name = "SWORD"
        this.projectileType = "sword"
        this.fire(junkership)
        Sound.playSFX("crazyshot")
    }

    fire(curShip) {
        this.curSword = new Projectiles.SwordProjectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2, this.vector,
            curShip, this.bulletSpeed, this.projectileType)
        game.addChild(this.curSword)
    }

    destroy() {
        if (this.curSword != null && this.curSword != undefined) {
            this.curSword.destroy()
        }
    }
}

export class ShieldWeapon extends PowerUp {
    constructor(junkership) {
        super()
        this.vector = new Victor(1,0)
        this.bulletSpeed = Reference.NORMAL_BULLET_SPEED
        this.projectileType = "bullet"
        this.name = "SHIELD"

        if (junkership.shield) {
            game.removeChild(junkership.shield)
            junkership.shield = null
        }
        Sound.playSFX("shield")
        junkership.shield = new Shield(junkership)
        game.addChild(junkership.shield)
    }

    fire(curShip) {
        Sound.playSFX("smallshot")

        game.addChild(new Projectile(
            curShip.position.x + curShip.width,
            curShip.position.y + curShip.height/2, this.vector,
            curShip, this.bulletSpeed, this.projectileType))
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

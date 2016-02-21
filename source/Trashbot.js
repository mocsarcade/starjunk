var Pixi = require("pixi.js")
var Utility = require("./Utility")

import Reference from "./Reference.js"
import Projectile from "./Projectile.js"
import Junkership from "./Junkership.js"
import Junk from "./Junk.js"

export default class Trashbot extends Pixi.Sprite {
    constructor(x, y, speed, health) {
        super(PIXI.loader.resources.trashbot.texture)
        this.speed = 60
        this.health = health
        this.position.x = x
        this.position.y = y
        this.initialY = y
    }

    update(delta) {
        var killedBy
        game.children.forEach((child) => {
            if (child instanceof Projectile) {
                if (Utility.hasCollision(this, child)) {
                    killedBy = child
                    child.onCollision(this)
                }
            } else if (child instanceof Junkership) {
                if (Utility.hasCollision(this, child.hitBox)) {
                    child.onCollision(this)
                }
            }
        })
        if (killedBy) {
            this.onCollision(killedBy)
        }
    }

    die() {
        var finalPosition = this.position
        game.removeChild(this)
        this.destroy()
        game.untilJunk(finalPosition.x, finalPosition.y)
    }

    onCollision(collidedWith) {
        this.health--
        if (this.health === 0) {
            this.die()
        }
        game.spawnWave()
    }
}



Trashbot.Movement = {
    LINEAR: function(trashbot, delta) {
        trashbot.position.x -= trashbot.speed * delta
    },
    SINUSOIDAL: function(trashbot, delta, amplitude, period) {
        trashbot.position.x -= trashbot.speed * delta
        trashbot.position.y = trashbot.initialY - amplitude * Math.sin(2 * Math.PI * trashbot.position.x / period)
    },
    TRIANGLE_WAVE: function(trashbot, delta, amplitude, period) {
        trashbot.position.x -= trashbot.speed * delta
        trashbot.position.y = trashbot.initialY - 4 * amplitude / period * (Math.abs(trashbot.position.x % period - period / 2) - period / 4)
    }

}
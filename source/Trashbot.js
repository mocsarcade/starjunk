var Pixi = require("pixi.js")
var Utility = require("./Utility")

import Reference from "./Reference.js"
import Projectile from "./Projectile.js"
import Junkership from "./Junkership.js"
import Junk from "./Junk.js"

export default class Trashbot extends Pixi.Sprite {
    constructor(position, speed, health, texture) {
        super(texture)
        this.speed = 60
        this.health = health
        this.position = position
        this.position.t = 0
        this.initial = {
            x: position.x,
            y: position.y
        }
        this.rage = false
    }

    update(delta) {
        this.position.t += this.speed * delta
        if (this.position.x + this.width < 0) {
            this.position.x = Reference.GAME_WIDTH
            this.position.t = 0
            if (!this.rage) {
                this.rage = true
                this.speed = this.speed * Reference.TRASHBOT.MOVEMENT.RAGE_MULTIPLIER
            }
        }

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
            game.spawnWave()
        }

    }
}



Trashbot.Movement = {
    LINEAR: function(trashbot) {
        trashbot.position.x = trashbot.initial.x - trashbot.position.t
    },
    SINUSOIDAL: function(trashbot, amplitude, period) {
        trashbot.position.x = trashbot.initial.x - trashbot.position.t
        trashbot.position.y = trashbot.initial.y - amplitude * Math.sin(2 * Math.PI * trashbot.position.t / period)
    },
    TRIANGLE_WAVE: function(trashbot, amplitude, period) {
        trashbot.position.x = trashbot.initial.x - Math.abs(2*(trashbot.position.t / amplitude) - Math.floor(trashbot.position.t / amplitude + 1/2))
        trashbot.position.y = trashbot.initial.y - 4 * amplitude / period * (Math.abs(trashbot.position.x % period - period / 2) - period / 4)
    }

}
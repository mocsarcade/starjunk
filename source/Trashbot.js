var Pixi = require("pixi.js")
var Utility = require("./Utility")
import Reference from "./Reference.js"
import Projectile from "./Projectile.js"
import Junkership from "./Junkership.js"
import {Junk} from "./Junk.js"
import Sound from "./Sound.js"
import Explosion from "./Explosion.js"

export default class Trashbot extends Pixi.Sprite {
    constructor(position, speed, health, texture) {
        super(texture)
        Trashbot.Inventory.push(this)
        this.speed =  Reference.TRASHBOT.MOVEMENT.SPEED
        this.health = Math.floor(health * game.difficulty.HEALTH_MULTIPLIER)
        this.position = position
        this.position.t = 0
        this.INITIAL = {
            x: position.x,
            y: position.y
        }
        this.inRage = false
        this.onDeath = new Explosion()
    }

    update(delta) {
        this.position.t += this.speed * delta
        if (this.position.x + this.width < 0) {
            this.respawn()
        }

        var killedBy
        var junkershipProjectile
        for(var i = 0; i < Projectile.FriendlyInventory.length; i++ ) {
            junkershipProjectile = Projectile.FriendlyInventory[i]
            if (Utility.hasCollision(this, junkershipProjectile)) {
                killedBy = junkershipProjectile
                junkershipProjectile.onCollision(this)
                break
            }
        }
        for(var i = 0; i < Junkership.Inventory.length; i++ ) {
            var thisShip = Junkership.Inventory[i]
            if (thisShip.active && Utility.hasCollision(this, thisShip.hitBox)) {
                Junkership.Inventory[i].onCollision(this)
                break
            }
        }
        if (killedBy) {
            this.onCollision(killedBy)
        }
    }

    destroy() {
        Sound.playSFX("smallboom")
        this.onDeath.explodeEnemy(this)
        var finalPosition = this.position
        game.removeChild(this)
        Trashbot.Inventory.splice(Trashbot.Inventory.indexOf(this), 1)
        super.destroy()
        delete this.position
        game.untilJunk(finalPosition.x, finalPosition.y)
    }

    onCollision(collidedWith) {
        this.health--
        if (this.health === 0) {
            this.destroy()
        } else {
            Sound.playSFX("hit")
        }
    }

    respawn(yPosition) {
        this.position.y = (yPosition === undefined) ? Reference.GAME_HEIGHT * Math.random() : yPosition
        this.position.x = Reference.GAME_WIDTH
        this.position.t = 0
        if (!this.inRage) {
            this.rage()
        }
    }

    rage() {
        this.inRage = true
        this.speed = this.speed * Reference.TRASHBOT.MOVEMENT.RAGE_MULTIPLIER
        this.tint = 0xFF1144
    }
}

Trashbot.Inventory = []

Trashbot.MovementStrategy = {
    LINEAR: function(trashbot) {
        trashbot.position.x = trashbot.INITIAL.x - trashbot.position.t
    },
    SINUSOIDAL: function(trashbot, period, amplitude) {
        var xChange = trashbot.INITIAL.x - trashbot.position.t
        var yChange = trashbot.INITIAL.y - amplitude * Math.sin(2 * Math.PI * trashbot.position.t / period)
        var xDifference = trashbot.position.x - xChange
        var yDifference = trashbot.position.y - yChange
        trashbot.rotation = yDifference / (Math.abs(yDifference) + Math.abs(xDifference)) * Math.PI / 2
        trashbot.position.x = xChange
        trashbot.position.y = yChange
    },
    TRIANGLE_WAVE: function(trashbot, period, amplitude) {
        trashbot.position.x = trashbot.INITIAL.x - trashbot.position.t

        if (1/4 * period < (trashbot.position.t % period) && (trashbot.position.t % period) <= 3/4 * period) {
            trashbot.position.y += amplitude / (period / 4)
        } else {
            trashbot.position.y -= amplitude / (period / 4)
        }
    },
    MOVE_STOP: function(trashbot, period) {
        period = period / 2
        var baseT = Math.floor(trashbot.position.t / period) * period
        if ((baseT / period) % 2 === 0) {
            trashbot.position.x = trashbot.INITIAL.x - trashbot.position.t + baseT/2
        }
    },
    MOVE_TO_POSITION: function(trashbot, period) {
        if (trashbot.position.t < period) {
            trashbot.position.x = trashbot.INITIAL.x - trashbot.position.t
        }
    }

}

Trashbot.ShootStrategy = {
    INTERVAL: function(trashbot, period) {
        period = period / 2
        var baseT = Math.floor(trashbot.position.t / period) * period
        if ((baseT / period) % 2 === 0) {
            this.fired = false
        } else if (this.fired === false) {
            this.fired = true
            var target = Junkership.Inventory[Utility.randomNumber(0, Junkership.Inventory.length - 1)]
            trashbot.fire(target)
        }
    },
    RANDOM: function(trashbot, period) {
        var random = Utility.randomNumber(0, period)
        if (random === 0) {
            var target = Junkership.Inventory[Utility.randomNumber(0, Junkership.Inventory.length - 1)]
            trashbot.fire(target)
        }
    }
}

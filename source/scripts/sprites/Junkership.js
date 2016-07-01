var Pixi = require("pixi.js")
var Keyb = require("keyb")
var Utility = require("scripts/data/Utility")

import {ControlScheme} from "scripts/layers/Controls.js"
import Reference from "scripts/data/Reference.js"
import Projectile from "scripts/sprites/Projectile.js"
import Score from "scripts/ui/Score.js"
import Sound from "scripts/layers/Sound.js"
import {PeaShoota} from "scripts/PowerUp.js"
import Explosion from "scripts/sprites/Explosion.js"
import JunkName from "scripts/ui/JunkName.js"
import Shield from "scripts/sprites/Shield.js"

export default class Junkership extends Pixi.Sprite {
    constructor(cont) {
        super(checkTex())
        Junkership.Inventory.push(this)
        this.speed = Reference.PLAYER_SPEED
        this.score = new Score(Junkership.Inventory.length)
        this.powerUp = new PeaShoota()
        this.controls = cont
        this.x = 10
        this.y = Reference.GAME_HEIGHT / 2
        this.hitBox = new Pixi.Rectangle(
            this.x + 1 , // Left offset
            this.y + 1 , // Top offset
            this.width - 3 , // Right offset + left offset
            this.height - 3 )// Bottom offset + top offset
        this.createdTime = Date.now()
        this.active = true
    }

    update(delta) {
        if (this.active) {
            var relativeSpeed = this.speed * delta

            this.controls.resolveConflicts()
            if(this.controls.isDown("up")) {
                this.move(-relativeSpeed, "y")
            }
            if(this.controls.isDown("down")) {
                this.move(relativeSpeed, "y")
            }
            if(this.controls.isDown("left")) {
                this.move(-relativeSpeed, "x")
            }
            if(this.controls.isDown("right")) {
                this.move(relativeSpeed, "x")
            }
            if(this.controls.justDown("fire") && this.powerUp.reload === undefined) {
                if (this.powerUp.cooldown !== undefined) {
                    if (this.powerUp.cooldown.time > this.powerUp.cooldown.limit) {
                        this.powerUp.fire(this)
                        this.powerUp.cooldown.time = 0
                    }
                } else {
                    this.powerUp.fire(this)
                }
            }
            if(this.controls.isDown("fire") && this.powerUp.reload !== undefined) {
                if(this.powerUp.reload.time >= this.powerUp.reload.limit) {
                    this.powerUp.fire(this, delta)
                    this.powerUp.reload.time = 0
                }
            }
            if (this.powerUp.cooldown !== undefined) {
                this.powerUp.cooldown.time++
            }
            if (this.powerUp.reload !== undefined) {
                this.powerUp.reload.time++
            }

            var killedBy
            var enemyProjectile
            for(var i = 0; i < Projectile.EnemyInventory.length; i++ ) {
                enemyProjectile = Projectile.EnemyInventory[i]
                if (Utility.hasCollision(this, enemyProjectile)) {
                    killedBy = enemyProjectile
                    enemyProjectile.onCollision(this)
                    break
                }
            }
            if (killedBy) {
                this.onCollision(killedBy)
            }
        }
    }

    onCollision(collidedWith) {
        if (this.shield) {
            game.removeChild(this.shield)
            this.shield = null
            this.changePowerUp(new PeaShoota())
            if (!collidedWith.projectileType) {
                collidedWith.destroy()
            }
        } else {
            this.destroy()
        }
    }

    destroy() {
        this.powerUp.destroy()
        game.removeChild(this)
        this.score.reset()
        game.endShip(this)
        Sound.playSFX("bigboom")
        new Explosion().explodePlayer(this)
        this.active = false
    }

    move(distance, direction) {
        var newPosition = this.position[direction] + distance
        var maxBottom = Reference.GAME_HEIGHT - this.height
        var maxRight = Reference.GAME_WIDTH - this.width
        if (newPosition < 0) {
            newPosition = 0
        } else if (direction === "x" && newPosition > maxRight) {
            newPosition = maxRight
        } else if (direction === "y" && newPosition > maxBottom) {
            newPosition = maxBottom
        }

        this.position[direction] = newPosition

        this.hitBox.x = this.x + 1
        this.hitBox.y = this.y + 1
    }

    changePowerUp(newPowerUp) {
        this.powerUp.destroy()
        this.powerUp = newPowerUp
        new JunkName(newPowerUp.name, this.x, this.y)
    }

    releaseControls() {
        if (this.controls.type == "keyb") {
            ControlScheme.keys[this.controls.index].inUse = false
        } else {
            ControlScheme.padsInUse[this.controls.index] = false
        }
    }
}

Junkership.Inventory = []

var checkTex = function() {
    switch (Junkership.Inventory.length) {
    case 0:
        return PIXI.loader.resources.redJunkership.texture
    case 1:
        return PIXI.loader.resources.yellowJunkership.texture
    case 2:
        return PIXI.loader.resources.greenJunkership.texture
    case 3:
        return PIXI.loader.resources.blueJunkership.texture
    }
}

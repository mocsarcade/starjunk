var Pixi = require("pixi.js")
var Keyb = require("keyb")
var Utility = require("./Utility")

import {ControlScheme} from "./Controls.js"
import Reference from "./Reference.js"
import Projectile from "./Projectile.js"
import Score from "./Score.js"
import Sound from "./Sound.js"
import {Shield} from "./PowerUp.js"
import Explosion from "./Explosion.js"
import JunkName from "./JunkName.js"

export default class Junkership extends Pixi.Sprite {
    constructor(cont) {
        super(checkTex())
        Junkership.Inventory.push(this)
        this.mineArray = []
        this.speed = 115
        this.score = new Score(Junkership.Inventory.length)
        this.powerUp = new Shield()
        this.reloadTime = 0
        this.swordActive = false
        this.controls = cont
        this.cooldownTimer = 1000
        this.x = 10
        this.y = Reference.GAME_HEIGHT / 2
        this.hitBox = new Pixi.Rectangle(
            this.x + 1 , // Left offset
            this.y + 1 , // Top offset
            this.width - 3 , // Right offset + left offset
            this.height - 3 )// Bottom offset + top offset
        this.justFired = false // Only used with gamepad
        this.onDeath = new Explosion()
        this.createdTime = Date.now()
        this.active = true
    }

    update(delta) {
        if (this.active) {
            var relativeSpeed = this.speed * delta

            if (this.controls.justDown("up")) {
                this.ignoreY = "down"
            }
            if (this.controls.justDown("down")) {
                this.ignoreY = "up"
            }
            if (this.controls.justDown("left")) {
                this.ignoreX = "right"
            }
            if (this.controls.justDown("right")) {
                this.ignoreX = "left"
            }
            if (this.controls.justUp("up") || this.controls.justUp("down")) {
                this.ignoreY = null
            }
            if (this.controls.justUp("left") || this.controls.justUp("right")) {
                this.ignoreX = null
            }
            if(this.controls.isDown("up") && this.ignoreY != "up") {
                this.move(-relativeSpeed, "y")
            }
            if(this.controls.isDown("down") && this.ignoreY != "down") {
                this.move(relativeSpeed, "y")
            }
            if(this.controls.isDown("left") && this.ignoreX != "left") {
                this.move(-relativeSpeed, "x")
            }
            if(this.controls.isDown("right") && this.ignoreX != "right") {
                this.move(relativeSpeed, "x")
            }
            if(this.controls.justDown("fire") && this.powerUp.reloadInterval === undefined) {
                if(this.powerUp.projectileType == "paintShot") {
                    if(this.cooldownTimer > Reference.SHORT_COOLDOWN) {
                        this.powerUp.fire(this)
                        this.cooldownTimer = 0
                    }
                } else if(this.powerUp.projectileType == "superlaser") {
                    if(this.cooldownTimer > Reference.LONG_COOLDOWN) {
                        this.powerUp.fire(this)
                        this.cooldownTimer = 0
                    }
                } else {
                    this.powerUp.fire(this)
                }
            }

            if(this.controls.isDown("fire")) {
                this.reloadTime += 1
                if (this.powerUp.reloadInterval !== undefined) {
                    if(this.reloadTime >= this.powerUp.reloadInterval) {
                        this.powerUp.fire(this, delta)
                        this.reloadTime = 0
                    }
                }
            }

            if(this.powerUp.projectileType == "sword" && this.swordActive != true) {
                this.powerUp.fire(this)
                this.swordActive = true
            }

            this.cooldownTimer++
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
        this.destroy()
    }

    destroy() {
        while (this.mineArray.length > 0) {
            var mine = this.mineArray.pop()
            if (mine != null) {
                mine.destroy()
            }
        }
        game.removeChild(this)
        this.score.reset()
        game.endShip(this)
        Sound.playSFX("bigboom")
        this.onDeath.explodePlayer(this)
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
        this.powerUp = newPowerUp
        this.swordActive = false
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

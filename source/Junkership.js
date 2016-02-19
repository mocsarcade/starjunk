var Pixi = require("pixi.js")
var Keyb = require("keyb")

import Reference from "./Reference.js"
import Projectile from "./Projectile.js"
import Score from "./Score.js"
import {PeaShoota, PowerUp, TriShoota, FiveShoota} from "./PowerUp.js"


export default class Junkership extends Pixi.Sprite {
    constructor() {
        super(PIXI.loader.resources.redJunkership.texture)
        game.playerCount++
        this.speed = 60
        this.score = new Score()
        this.powerUp = new PeaShoota()
        this.hitBox = new Pixi.Rectangle(
            this.x + 1 , // Left offset
            this.y + 1 , // Top offset
            this.width - 3 , // Right offset + left offset
            this.height - 3 )// Bottom offset + top offset

    }
    update(delta) {
        // Ugly kludge
        if (this.width === 1) {
            this.onCollision()
        }

        var relativeSpeed = this.speed * delta

        if (Keyb.isJustDown("<up>")) {
            this.ignoreY = "down"
        }
        if (Keyb.isJustDown("<down>")) {
            this.ignoreY = "up"
        }
        if (Keyb.isJustDown("<left>")) {
            this.ignoreX = "right"
        }
        if (Keyb.isJustDown("<right>")) {
            this.ignoreX = "left"
        }
        if (Keyb.isJustUp("<up>") || Keyb.isJustUp("<down>")) {
            this.ignoreY = null
        }
        if (Keyb.isJustUp("<left>") || Keyb.isJustUp("<right>")) {
            this.ignoreX = null
        }
        if(Keyb.isDown("<up>") && this.ignoreY != "up") {
            this.move(-relativeSpeed, "y")
        }
        if(Keyb.isDown("<down>") && this.ignoreY != "down") {
            this.move(relativeSpeed, "y")
        }
        if(Keyb.isDown("<left>") && this.ignoreX != "left") {
            this.move(-relativeSpeed, "x")
        }
        if(Keyb.isDown("<right>") && this.ignoreX != "right") {
            this.move(relativeSpeed, "x")
        }

        if(Keyb.isJustDown("<space>")) {
            this.powerUp.fire(this)
        }

        if(Keyb.isJustDown("1")) {
            this.changePowerUp(new TriShoota)
        }

        if(Keyb.isJustDown("2")) {
            this.changePowerUp(new FiveShoota)
        }
    }
    onCollision(collidedWith) {
        game.removeChild(this)
        this.score.reset()
        this.destroy()
        game.playerCount--
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
    }


}

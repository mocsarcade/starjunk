var Pixi = require("pixi.js")
var Keyb = require("keyb")

import Reference from "./Reference.js"
import Projectile from "./Projectile.js"
import Score from "./Score.js"

var junkerTex = Pixi.Texture.fromImage(require("./images/blue-starship.png"))

export default class Junkership extends Pixi.Sprite {
    constructor() {
        super(junkerTex)
        game.playerCount++
        this.speed = 60
        this.score = new Score()
    }
    update(delta) {
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
            this.shoot()
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
    }

    shoot() {
        game.addChild(new Projectile(
            this.x + this.width,
            this.y + this.height/2,
            this))
    }

}

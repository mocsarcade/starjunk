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
        if(Keyb.isDown("<up>")) {
            this.position.y = this.move(this.position.y - relativeSpeed)
        }
        if(Keyb.isDown("<down>")) {
            var maxBottom = Reference.GAME_HEIGHT - this.height
            this.position.y = this.move(this.position.y + relativeSpeed, maxBottom)
        }
        if(Keyb.isDown("<left>")) {
            this.position.x = this.move(this.position.x - relativeSpeed)
        }
        if(Keyb.isDown("<right>")) {
            var maxRight = Reference.GAME_WIDTH - this.width
            this.position.x = this.move(this.position.x + relativeSpeed, maxRight)
        }
        if(Keyb.isJustDown("<space>")) {
            this.shoot()
        }

        this.score.update()
        // console.log("Score: " + this.score.getScore())
    }
    onCollision(collidedWith) {
        game.removeChild(this)
        this.score.destroy()
        this.destroy()
        game.playerCount--
    }

    move(newPosition, maxPosition) {
        if (maxPosition !== undefined && newPosition > maxPosition) {
            newPosition = maxPosition
        } else if (newPosition < 0) {
            newPosition = 0
        }
        return newPosition
    }

    shoot() {
        game.addChild(new Projectile(
            this.x + this.width,
            this.y + this.height/2,
            this))
    }

}

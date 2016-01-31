var Pixi = require("pixi.js")
var Utility = require("./Utility")

import Reference from "./Reference.js"
import Projectile from "./Projectile.js"

var trashbotTex = Pixi.Texture.fromImage(require("./images/enemy-starship.png"))

export default class Trashbot extends Pixi.Sprite {
    constructor(x, y) {
        super(trashbotTex)
        this.speed = 40
        this.position.x = x
        this.position.y = y
    }
    update(delta) {
        this.position.x -= this.speed * delta
        if (this.position.x + this.width < 0) {
            this.position.x = Reference.GAME_WIDTH
        }
        game.children.forEach((toCompare) => {
            if (toCompare instanceof Projectile) {
                if(Utility.hasCollision(this, toCompare)) {
                    this.onCollision(toCompare)
                    toCompare.onCollision(this)
                }
            }
        })
    }

    onCollision(collidedWith) {
        game.removeChild(this)
        this.destroy()
        collidedWith.shotBy.score++
    }
}

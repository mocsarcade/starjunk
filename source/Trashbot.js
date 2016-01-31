var Pixi = require("pixi.js")

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
    update(delta){
        this.position.x -= this.speed * delta
        if (this.position.x + this.width < 0){
            this.position.x = Reference.GAME_WIDTH
        }
        this.collisionCheck()
    }

    collisionCheck(){
        var x1 = this.position.x
        var y1 = this.position.y
        var w1 = this.width
        var h1 = this.height

        var x2, y2, w2, h2

        game.children.forEach((toCompare) => {
            if (toCompare instanceof Projectile){
                x2 = toCompare.position.x
                y2 = toCompare.position.y
                w2 = toCompare.width
                h2 = toCompare.height

                if (x1 < x2 + w2 && x1 + w1 > x2 &&
                    y1 < y2 + h2 && h1 + y1 > y2) {
                        this.onCollision(toCompare)
                        toCompare.onCollision(this)
                }
            }
        })
    }

    onCollision(collidedWith){
        game.removeChild(this)
        this.destroy()
        collidedWith.shotBy.score++
    }
}

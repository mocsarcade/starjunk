var Pixi = require("pixi.js")

import Reference from "./Reference.js"

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
    }
    onCollision(){
        game.removeChild(this)
        this.destroy()
        game.score++
    }
}

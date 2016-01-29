var Pixi = require("pixi.js")
var Reference = require("Reference.js")

var projectileTex = Pixi.Texture.fromImage(require("./images/projectile.png"))

export default class Projectile extends Pixi.Sprite {
    constructor(x, y) {
        super(projectileTex)
        this.x = x
        this.y = y
        this.speed = 80
        console.log("Creating projectile")
    }
    update(delta){
            this.position.x += this.speed * delta
            if (this.position.x < 0 || this.position.x > Reference.GAME_WIDTH ||
                this.position.y < 0 || this.position.y > Reference.GAME_HEIGHT){
                console.log("Destroying projectile")
                game.removeChild(this)
                this.destroy()
            }
    }
}

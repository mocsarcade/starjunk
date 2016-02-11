var Pixi = require("pixi.js")
var Reference = require("Reference.js")

export default class Projectile extends Pixi.Sprite {
    constructor(x, y, shotBy) {
        super(PIXI.loader.resources.projectile.texture)
        this.x = x
        this.y = y
        this.speed = 80
        this.shotBy = shotBy
        console.log("Creating projectile")
    }

    update(delta) {
        this.position.x += this.speed * delta
        if (this.position.x < 0 || this.position.x > Reference.GAME_WIDTH ||
            this.position.y < 0 || this.position.y > Reference.GAME_HEIGHT) {
            console.log("Destroying projectile")
            game.removeChild(this)
            this.destroy()
        }
    }

    onCollision(collidedWith) {
        game.removeChild(this)
        this.destroy()
    }
}

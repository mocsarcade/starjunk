var Pixi = require("pixi.js")
var Victor = require("victor")

export default class Particle extends Pixi.Sprite {
    constructor(texture, x, y, vector, tint, speed) {
        super(texture)
        this.x = x
        this.y = y
        this.vecX = vector.x
        this.vecY = vector.y
        this.speed = speed
        this.tint = tint
        this.spawnTime = Date.now()
    }

    update(delta) {
        this.position.x += this.vecX * this.speed
        this.position.y += this.vecY * this.speed
        this.alpha -= .04 * Math.random()
        if (this.alpha <= 0) {
            this.destroy()
        }
    }

    destroy() {
        game.removeChild(this)
        super.destroy()
    }
}
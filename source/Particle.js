var Pixi = require("pixi.js")
var Victor = require("victor")

export default class Particle extends Pixi.Sprite {
    constructor(texture, position, vector, speed) {
        super(texture)
        this.x = position.x
        this.y = position.y
        this.vecX = vector.x
        this.vecY = vector.y
        this.speed = speed
        this.spawnTime = Date.now()
    }

    update(delta) {
        this.position.x += this.vecX * this.speed
        this.position.y += this.vecY * this.speed
        this.alpha -= .06 * Math.random()
        if (this.alpha <= 0) {
            this.destroy()
        }
    }

    destroy() {
        this.parent.removeChild(this)
        super.destroy()
    }
}
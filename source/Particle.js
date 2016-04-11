var Pixi = require("pixi.js")
var Reference = require("Reference.js")
var Victor = require("victor")

export default class Particle extends Pixi.Sprite {
    constructor(x, y, vector, tint) {
        super(PIXI.loader.resources.star.texture)
        this.x = x
        this.y = y
        this.vecX = vector.x
        this.vecY = vector.y
        this.bulletSpeed = .5 + (Math.random() * .5)
        this.tint = tint
        this.spawnTime = Date.now()
    }

    update(delta) {
        this.position.x += this.vecX * this.bulletSpeed
        this.position.y += this.vecY * this.bulletSpeed
        this.alpha -= .05
        if (Date.now() - this.spawnTime >= 1000) {
            this.destroy()
        }
    }

    destroy() {
        game.removeChild(this)
        super.destroy()
    }
}
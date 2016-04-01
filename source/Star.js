var Pixi = require("pixi.js")

import Reference from "./Reference.js"

export default class Star extends Pixi.Sprite {
    constructor(parallax) {
        super(PIXI.loader.resources.projectile.texture)
        this.position.x = Math.random() * Reference.GAME_WIDTH
        this.position.y = Math.random() * Reference.GAME_HEIGHT
        this.tint = Reference.STAR_COLORS[Math.floor(Math.random() * Reference.STAR_COLORS.length)]
        this.alpha = parallax * .1
        this.speed = parallax * .5
    }

    update(delta) {
        this.position.x -= this.speed
        if (this.position.x < -this.width) {
            this.position.x *= -1
            this.position.x += Reference.GAME_WIDTH
            this.position.y = Math.random() * Reference.GAME_HEIGHT
        }
    }
}
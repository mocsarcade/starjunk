var Pixi = require("pixi.js")

import Reference from "./Reference.js"
import Utility from "./Utility.js"

export default class StarStreak extends Pixi.Sprite {
    constructor() {
        super(PIXI.loader.resources.star.texture)
        this.position.x = Math.random() * Reference.GAME_WIDTH
        this.position.y = Math.random() * Reference.GAME_HEIGHT
        this.speed = 50
        this.scale.x = 50
        this.alpha = 0
        this.lastStreak = Date.now()
        this.timeToStreak = Utility.randomNumber(Reference.TIME_TO_STREAK.lower * 1000, Reference.TIME_TO_STREAK.upper * 1000)
    }

    update(delta) {
        this.position.x -= this.speed
        if (this.position.x < -this.width) {
            this.alpha = 1
            if (Date.now() - this.lastStreak >= this.timeToStreak) {
                this.position.x = Reference.GAME_WIDTH
                this.position.y = Math.random() * Reference.GAME_HEIGHT
                this.tint = Reference.STAR_COLORS[Math.floor(Math.random() * Reference.STAR_COLORS.length)]
                this.lastStreak = Date.now()
            }
        }
    }
}
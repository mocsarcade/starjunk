var Pixi = require("pixi.js")
var Utility = require("./Utility")

import Reference from "./Reference.js"
import Junkership from "./Junkership.js"
import Trashbot from "./Trashbot.js"
import Score from "./Score.js"

export default class Junk extends Pixi.Sprite {
    constructor(x, y) {
        super(PIXI.loader.resources.junk.texture)
        this.position.x = x
        this.position.y = y
        this.spawnTime = Date.now()
        this.hasWeapon = Utility.randomNumber(Reference.WEAPON_RANGE.lower, Reference.WEAPON_RANGE.upper)
    }

    update(delta) {
        if (Date.now() - this.spawnTime >= Reference.TIME_TO_DESPAWN) {
            game.removeChild(this)
            this.destroy()
        } else
            game.children.forEach((child) => {
                if (child instanceof Junkership) {
                    if (Utility.hasCollision(this, child)) {
                        game.removeChild(this)
                        this.destroy()
                        child.score.incrementScore()
                        child.changePowerUp(this.hasWeapon)
                    }
                }
            })
    }
}
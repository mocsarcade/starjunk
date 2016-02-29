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
    }

    update(delta) {
        if (Date.now() - this.spawnTime >= Reference.TIME_TO_DESPAWN) {
            this.destroy()
        } else {
            for(var i = 0; i < Junkership.Inventory.length; i++) {
                var junkership = Junkership.Inventory[i]
                if (Utility.hasCollision(this, junkership)) {
                    junkership.score.incrementScore()
                    var weaponIndex = Utility.randomNumber(0, junkership.WeaponList.length - 1)
                    junkership.changePowerUp(weaponIndex)
                    this.destroy()
                    break
                }
            }
        }
    }

    destroy() {
        game.removeChild(this)
        super.destroy()
    }
}
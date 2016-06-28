var Pixi = require("pixi.js")

import Utility from "scripts/data/Utility.js"

export default class Shield extends Pixi.Sprite {
    constructor(ship) {
        super(PIXI.loader.resources.shield.texture)
        this.owner = ship
        this.position.x = ship.x + ship.width / 2
        this.position.y = ship.y + ship.height / 2
        this.tint = this.checkTint(ship)
        this.anchor = new Pixi.Point(.5,.5)
    }

    update(delta) {
        var shieldScale = Utility.randomFloatNumber(.75, 1.25)
        this.position.x = this.owner.x + this.owner.width / 2
        this.position.y = this.owner.y + this.owner.height / 2
        this.scale.x = this.scale.y = shieldScale
    }

    checkTint(ship) {
        switch (ship.texture) {
        case PIXI.loader.resources.redJunkership.texture:
            return 0xC44040
        case PIXI.loader.resources.yellowJunkership.texture:
            return 0xD89000
        case PIXI.loader.resources.greenJunkership.texture:
            return 0x339D33
        case PIXI.loader.resources.blueJunkership.texture:
            return 0x4A508A
        default:
            console.log ("Shield texture error")
            return 0xFFFFFF
        }
    }
}

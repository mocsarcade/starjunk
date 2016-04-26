var Pixi = require("pixi.js")

export default class Shield extends Pixi.Sprite {
    constructor(ship) {
        super(PIXI.loader.resources.shield.texture)
        this.owner = ship
        this.position.x = ship.x
        this.position.y = ship.y
    }

    update(delta) {
        this.position.x = this.owner.x
        this.position.y = this.owner.y
    }
}

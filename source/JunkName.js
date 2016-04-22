var Pixi = require("pixi.js")

import Reference from "./Reference.js"

export default class JunkName extends Pixi.Text {
    constructor(name, x, y) {
        super(name,{font: "12pt box", fill: "white"})
        this.x = x
        this.y = y
        this.scale.x = this.scale.y = .75
        this.spawnTime = Date.now()
        this.blendMode = Pixi.BLEND_MODES.SCREEN
    }

    update() {
        if (Date.now() - this.spawnTime > Reference.NAME_DESPAWN) {
            game.removeChild(this)
            this.destroy()
        }
    }
}

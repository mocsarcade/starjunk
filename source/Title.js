var Pixi = require("pixi.js")

import Reference from "./Reference.js"

export default class Junkership extends Pixi.Sprite {
    constructor(cont) {
        super(PIXI.loader.resources.title.texture)
        this.x = 0
        this.y = Reference.GAME_HEIGHT / 10
    }

    update() {
        // keeping title on top
        if (this.visible) {
            var parent = this.parent
            parent.removeChild(this)
            parent.addChild(this)
        }
    }

    hideTitle() {
        this.visible=false
    }

    showTitle() {
        this.visible=true
    }
}

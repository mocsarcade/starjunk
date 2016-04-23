var Pixi = require("pixi.js")

import Reference from "./Reference.js"

export default class Title extends Pixi.Sprite {
    constructor(cont) {
        super(PIXI.loader.resources.title.texture)
        this.x = 0
        this.y = Reference.GAME_HEIGHT / 10
        this.delayTimestamp = -1
    }

    update() {
        // keeping title on top
        if (this.visible) {
            var parent = this.parent
            parent.removeChild(this)
            parent.addChild(this)
        } else if (this.delayTimestamp > 0 &&
            Date.now() - this.delayTimestamp > Reference.TITLE_DELAY) {
            this.visible = true
            this.delayTimestamp = -1
        }
    }

    hideTitle() {
        this.visible=false
    }

    showTitle() {
        this.delayTimestamp = Date.now()
    }
}

var Pixi = require("pixi.js")
var $ = require("jquery")

import Reference from "scripts/data/Reference.js"

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
            $("#high-score-list").show()
            this.delayTimestamp = -1
        }
    }

    hideTitle() {
        this.visible=false
        $("#high-score-list").hide()
    }

    showTitle() {
        this.delayTimestamp = Date.now()
    }
}

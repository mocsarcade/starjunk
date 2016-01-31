var Pixi = require("pixi.js")

import Junkership from "./Junkership.js"

export default class GameContainer extends Pixi.Container {
    constructor() {
        super()
        this.playerCount = 0
    }
    gameOver() {
        console.log("Respawning Junkership")
        game.addChild(new Junkership())
    }
}

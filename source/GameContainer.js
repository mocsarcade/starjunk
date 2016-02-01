var Pixi = require("pixi.js")

import Junkership from "./Junkership.js"
import Trashbot from "./Trashbot.js"
import Reference from "./Reference.js"

export default class GameContainer extends Pixi.Container {
    constructor() {
        super()
        this.playerCount = 0
    }
    gameOver() {
        console.log("Respawning Junkership")
        game.addChild(new Junkership())
    }
    spawnWave() {
        this.addChild(new Trashbot(Reference.GAME_WIDTH, Reference.GAME_HEIGHT/2))
    }
}

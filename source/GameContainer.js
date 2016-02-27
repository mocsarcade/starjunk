var Pixi = require("pixi.js")
var Keyb = require("keyb")

import Junkership from "./Junkership.js"
import Trashbot from "./Trashbot.js"
import Reference from "./Reference.js"
import Textures from "./Textures.js"
import Junk from "./Junk.js"
import Utility from "./Utility.js"

export default class GameContainer extends Pixi.Container {
    constructor() {
        super()
        this.playerCount = 0
        this.countdownToJunk = Utility.randomNumber(Reference.JUNK_FREQUENCY_RANGE.lower, Reference.JUNK_FREQUENCY_RANGE.upper)
        Textures.initTex()

    }

    gameOver() {
        console.log("Respawning Junkership")
        game.addChild(new Junkership(Reference.ControlScheme.WASD))
    }

    spawnWave() {
        this.addChild(new Trashbot(Reference.GAME_WIDTH, Reference.GAME_HEIGHT / 2))
    }

    untilJunk(x, y) {
        if (this.countdownToJunk == 0) {
            this.countdownToJunk = Utility.randomNumber(Reference.JUNK_FREQUENCY_RANGE.lower, Reference.JUNK_FREQUENCY_RANGE.upper)
            console.log(this.countdownToJunk)
            this.addChild(new Junk(x, y))
        } else this.countdownToJunk--
    }

    checkPlayerSpawn() {
        for (var i = 0; i < Reference.controlTypeCount; i++) {
            if (!Reference.ControlScheme.keys[i].inUse && (
                Keyb.isDown(Reference.ControlScheme.keys[i].up) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].down) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].left) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].right))) {
                Reference.ControlScheme.keys[i].inUse = true

                game.addChild(new Junkership(i))
            }
        }
    }
}

var Pixi = require("pixi.js")
var Keyb = require("keyb")

import Junkership from "./Junkership.js"
import SpawnWave from "./SpawnWave.js"
import Reference from "./Reference.js"
import Textures from "./Textures.js"
import Junk from "./Junk.js"
import Utility from "./Utility.js"
import Controls from "./Controls.js"

export default class GameContainer extends Pixi.Container {
    constructor() {
        super()
        this.countdownToJunk = Utility.randomNumber(Reference.JUNK_FREQUENCY_RANGE.lower, Reference.JUNK_FREQUENCY_RANGE.upper)
        this.spawnWaveInterval = 0
        this.waves = []
        this.difficulty = Reference.DIFFICULTY[0]
        Textures.initTex()
        this.gamepads = navigator.getGamepads()
    }

    gameOver() {
        // TODO High score and stat reporting logic
    }

    spawnWave() {
        if (Junkership.Inventory.length > 0 && this.waves.length < game.difficulty.SPAWN_WAVE.MAX_WAVES) {
            var height = Utility.randomNumber(1, game.difficulty.SPAWN_WAVE.MAX_HEIGHT)
            var width = Utility.randomNumber(1, game.difficulty.SPAWN_WAVE.MAX_WIDTH)
            this.waves.push(new SpawnWave(height, width))
        }
    }

    untilJunk(x, y) {
        if (this.countdownToJunk == 0) {
            this.countdownToJunk = Utility.randomNumber(Reference.JUNK_FREQUENCY_RANGE.lower, Reference.JUNK_FREQUENCY_RANGE.upper)
            this.addChild(new Junk(x, y))
        } else this.countdownToJunk--
    }

    checkPlayerSpawn() {
        for (var i = 0; i < Controls.controlTypeCount; i++) {
            if (!Controls.ControlScheme.keys[i].inUse && (
                Controls.isDown(true, i, "up") ||
                Controls.isDown(true, i, "down") ||
                Controls.isDown(true, i, "left") ||
                Controls.isDown(true, i, "right") ||
                Controls.isDown(true, i, "fire"))) {
                Controls.ControlScheme.keys[i].inUse = true

                game.addChild(new Junkership(true, i))
            }
        }
        for (var i = 0; i < this.gamepads.length; i++) {
            if (this.gamepads[i]) {
                if (!Controls.ControlScheme.padsInUse[i] && (
                    Controls.isDown(false, i, "up") ||
                    Controls.isDown(false, i, "down") ||
                    Controls.isDown(false, i, "left") ||
                    Controls.isDown(false, i, "right") ||
                    Controls.isDown(false, i, "fire"))) {

                    Controls.ControlScheme.padsInUse[i] = true
                    game.addChild(new Junkership(false, i))
                }
            }
        }
    }
}

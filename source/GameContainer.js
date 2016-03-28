var Pixi = require("pixi.js")
var Keyb = require("keyb")
import Junkership from "./Junkership.js"
import SpawnWave from "./SpawnWave.js"
import Reference from "./Reference.js"
import Textures from "./Textures.js"
import Junk from "./Junk.js"
import Utility from "./Utility.js"

export default class GameContainer extends Pixi.Container {
    constructor() {
        super()
        this.spawnWaveInterval = 0
        this.waves = []
        this.difficulty = Reference.DIFFICULTY[0]
        this.countdownToJunk = Utility.randomNumber(this.difficulty.JUNK_FREQUENCY_RANGE.lower, this.difficulty.JUNK_FREQUENCY_RANGE.upper)
        Textures.initTex()
    }

    gameOver() {
        // TODO High score and stat reporting logic
    }

    spawnWave() {
        if (Junkership.Inventory.length > 0 && this.waves.length < game.difficulty.SPAWN_WAVE.MAX_WAVES) {
            var height = game.difficulty.SPAWN_WAVE.MAX_HEIGHT
            var width = game.difficulty.SPAWN_WAVE.MAX_WIDTH
            this.waves.push(new SpawnWave(height, width))
        }
    }

    untilJunk(x, y) {
        if (this.countdownToJunk == 0) {
            this.countdownToJunk = Utility.randomNumber(this.difficulty.JUNK_FREQUENCY_RANGE.lower, this.difficulty.JUNK_FREQUENCY_RANGE.upper)
            this.addChild(new Junk(x, y))
        } else this.countdownToJunk--
    }

    checkPlayerSpawn() {
        for (var i = 0; i < Reference.controlTypeCount; i++) {
            if (!Reference.ControlScheme.keys[i].inUse && (
                Keyb.isDown(Reference.ControlScheme.keys[i].up) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].down) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].left) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].right) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].fire))) {
                Reference.ControlScheme.keys[i].inUse = true

                game.addChild(new Junkership(i))
            }
        }
    }
}

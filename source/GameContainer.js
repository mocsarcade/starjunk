var Pixi = require("pixi.js")
var Keyb = require("keyb")

import Junkership from "./Junkership.js"
import SpawnWave from "./SpawnWave.js"
import Reference from "./Reference.js"
import Textures from "./Textures.js"
import Junk from "./Junk.js"
import Utility from "./Utility.js"
import Star from "./Star.js"
import StarStreak from "./StarStreak.js"
import {
    ControlScheme, controlTypeCount, padCont, keybCont, keybArray, padArray,
    isDown, justdown, justUp
}
from "./Controls.js"

export default class GameContainer extends Pixi.Container {
    constructor() {
        super()
        this.spawnWaveInterval = 0
        this.waves = []
        this.difficulty = Reference.DIFFICULTY[0]
        this.countdownToJunk = Utility.randomNumber(this.difficulty.JUNK_FREQUENCY_RANGE.lower, this.difficulty.JUNK_FREQUENCY_RANGE.upper)
        Textures.initTex()
        this.gamepads = navigator.getGamepads()
        this.stars = 0
    }

    starfield() {
        if (this.stars < Reference.STAR_COUNT) {
            if (this.stars < 5) {
                this.addChild(new StarStreak())
            }
            this.addChild(new Star(this.stars % 10 + 1))
            this.stars++
        }
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
        for (var i = 0; i < controlTypeCount; i++) {
            if (!ControlScheme.keys[i].inUse && (
                    keybArray[i].isDown("up") ||
                    keybArray[i].isDown("down") ||
                    keybArray[i].isDown("left") ||
                    keybArray[i].isDown("right") ||
                    keybArray[i].isDown("fire"))) {
                ControlScheme.keys[i].inUse = true

                game.addChild(new Junkership(keybArray[i]))
            }
        }
        for (var i = 0; i < this.gamepads.length; i++) {
            if (this.gamepads[i]) {
                if (!ControlScheme.padsInUse[i] && (
                        padArray[i].isDown("up") ||
                        padArray[i].isDown("down") ||
                        padArray[i].isDown("left") ||
                        padArray[i].isDown("right") ||
                        padArray[i].isDown("fire"))) {

                    ControlScheme.padsInUse[i] = true
                    game.addChild(new Junkership(padArray[i]))
                }
            }
        }
    }
}
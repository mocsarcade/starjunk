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
import Sound from "./Sound.js"
import Metrics from "./Metrics.js"
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
        this.metrics = new Metrics(Reference.FIREBASE_URL)
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

    gameOver(junkership) {
        this.metrics.submitMetrics(junkership)
        var score = junkership.score.getScore()
        if (this.metrics.isTopScore(score)) {
            junkership.score.setTextToPromptHighScore()
            setTimeout(function() {
                junkership.score.gainControls(junkership.controls)
            }, 1500)

        } else {
            junkership.releaseControls()
            junkership.score.reset()
        }
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
                    keybArray[i].justDown("up") ||
                    keybArray[i].justDown("down") ||
                    keybArray[i].justDown("left") ||
                    keybArray[i].justDown("right") ||
                    keybArray[i].justDown("fire"))) {
                ControlScheme.keys[i].inUse = true
                Sound.playSFX("spawn")
                game.addChild(new Junkership(keybArray[i]))
            }
        }
        for (var i = 0; i < this.gamepads.length; i++) {
            if (this.gamepads[i]) {
                if (!ControlScheme.padsInUse[i] && (
                        padArray[i].justDown("up") ||
                        padArray[i].justDown("down") ||
                        padArray[i].justDown("left") ||
                        padArray[i].justDown("right") ||
                        padArray[i].justDown("fire"))) {
                    ControlScheme.padsInUse[i] = true
                    Sound.playSFX("spawn")
                    game.addChild(new Junkership(padArray[i]))
                }
            }
        }
    }
}

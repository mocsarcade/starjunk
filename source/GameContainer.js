var Pixi = require("pixi.js")
var Keyb = require("keyb")

import Junkership from "./Junkership.js"
import Trashbot from "./Trashbot.js"
import SpawnWave from "./SpawnWave.js"
import Reference from "./Reference.js"
import Textures from "./Textures.js"
import {Junk} from "./Junk.js"
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
import Title from "./Title.js"

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
        this.startedAt = Date.now()
        this.waitingForScores = [false, false, false, false]
        this.playerSpawnAllowed = true
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

    endShip(junkership) {
        this.metrics.submitMetrics(junkership)
        var score = junkership.score.getScore()
        if (this.metrics.isTopScore(score)) {
            junkership.score.setTextToPromptHighScore()
            setTimeout(function() {
                junkership.score.gainControls(junkership.controls)
                this.waitingForScores[junkership.score.playerNumber - 1] = true
            }, 1500)
        } else {
            this.waitingForScores[junkership.score.playerNumber - 1] = false
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

    gameOver() {
        for (var i = 0; i < Junkership.Inventory.length; i++) {
            var ship = Junkership.Inventory[i]
            ship.releaseControls()
            ship.score.reset()
            Junkership.Inventory.splice(Junkership.Inventory.indexOf(ship), 1)
        }
        Sound.stopBGM()
        while (Trashbot.Inventory.length >0) {
            Trashbot.Inventory[0].destroy()
        }
        while (Junk.Inventory.length >0) {
            Junk.Inventory[0].destroy()
        }
        this.spawnWaveInterval = 0
        this.difficulty = Reference.DIFFICULTY[0]
        this.countdownToJunk = Utility.randomNumber(this.difficulty.JUNK_FREQUENCY_RANGE.lower, this.difficulty.JUNK_FREQUENCY_RANGE.upper)
        for (var i = 0; i < controlTypeCount; i++) {
            ControlScheme.keys[i].inUse = false
        }
        for (var i = 0; i < 4; i++) {
            ControlScheme.padsInUse[i] = false
        }
        this.title.showTitle()
    }

    loadTitle() {
        this.title = new Title()
        this.addChild(this.title)
    }

    resetCheck() {
        var doneCount = 0
        for (var i = 0; i < Junkership.Inventory.length; i++) {
            if (!Junkership.Inventory[i].active) {
                doneCount++
            }
        }
        if (doneCount > 0 && doneCount == Junkership.Inventory.length) {
            this.gameOver()
            this.playerSpawnAllowed = false
        }
    }

    checkPlayerSpawn() {
        if (!this.playerSpawnAllowed) {
            if (!this.waitingForScores[0] &&
                !this.waitingForScores[1] &&
                !this.waitingForScores[2] &&
                !this.waitingForScores[3]) {
                setTimeout(function() {
                    this.playerSpawnAllowed = true
                }.bind(this), Reference.TITLE_DELAY)
            }
        } else if (Date.now() - this.startedAt > 750 // spawn delay
            && this.playerSpawnAllowed) { // reset check
            for (var i = 0; i < controlTypeCount; i++) {
                if (!ControlScheme.keys[i].inUse && (
                        keybArray[i].justDown("up") ||
                        keybArray[i].justDown("down") ||
                        keybArray[i].justDown("left") ||
                        keybArray[i].justDown("right") ||
                        keybArray[i].justDown("fire"))) {
                    this.title.hideTitle()
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
                        this.title.hideTitle()
                        ControlScheme.padsInUse[i] = true
                        Sound.playSFX("spawn")
                        game.addChild(new Junkership(padArray[i]))
                    }
                }
            }
        }
    }
}

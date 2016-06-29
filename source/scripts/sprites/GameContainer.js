var Pixi = require("pixi.js")
var Keyb = require("keyb")

import Junkership from "scripts/sprites/Junkership.js"
import Trashbot from "scripts/sprites/Trashbot.js"
import SpawnWave from "scripts/SpawnWave.js"
import Reference from "scripts/data/Reference.js"
import Textures from "scripts/data/Textures.js"
import {Junk} from "scripts/sprites/Junk.js"
import Utility from "scripts/data/Utility.js"
import Star from "scripts/sprites/Star.js"
import StarStreak from "scripts/sprites/StarStreak.js"
import Sound from "scripts/layers/Sound.js"
import Metrics from "scripts/layers/Metrics.js"
import {
    ControlScheme, padCont, keybCont, keybArray, padArray,
    isDown, justdown, justUp
}
from "scripts/layers/Controls.js"
import Title from "scripts/ui/Title.js"

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
        this.waitingForScores = Array(4).fill(false)
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
            }, 1500)
            this.waitingForScores[junkership.score.playerNumber - 1] = true
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
            ship.score.reset()
            Junkership.Inventory.splice(Junkership.Inventory.indexOf(ship), 1)
        }
        if(ship.powerUp.curSword !== undefined) {
            ship.powerUp.curSword.destroy()
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
        for (var i = 0; i < ControlScheme.keys.length; i++) {
            ControlScheme.keys[i].inUse = false
        }
        for (var i = 0; i < ControlScheme.padsInUse.length; i++) {
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
            if (this.waitingForScores.every(e => !e)) {
                setTimeout(function() {
                    this.playerSpawnAllowed = true
                }.bind(this), Reference.TITLE_DELAY)
            }
        } else if (Date.now() - this.startedAt > Reference.SPAWN_DELAY * 1000 // spawn delay
            && this.playerSpawnAllowed) { // reset check
            // Check for button press on all keyboard controls and gamepads, and return
            // which one was used, then add a new junkership with these controls
            var controls = ControlScheme.activateControls()
            if (controls !== null) {
                this.title.hideTitle()
                Sound.playSFX("spawn")
                game.addChild(new Junkership(controls))
            }
        }
    }
}

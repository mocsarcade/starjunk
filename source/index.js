var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")

import Junkership from "./Junkership.js"
import Reference from "./Reference.js"
import Score from "./Score.js"
import GameContainer from "./GameContainer.js"
import PowerUp from "./PowerUp.js"
import Sound from "./Sound.js"
import Trashbot from "./Trashbot.js"

var renderer = Pixi.autoDetectRenderer(Reference.GAME_WIDTH, Reference.GAME_HEIGHT)
renderer.backgroundColor = 0x222222
renderer.roundPixels = true

var mount = document.getElementById("mount")
mount.insertBefore(renderer.view, mount.firstChild)
window.game = new GameContainer()

var loop = new Afloop(function (delta) {
    navigator.getGamepads()
    game.starfield()
    game.children.forEach((child) => {
        child.update(delta)
    })
    game.waves.forEach((wave) => {
        wave.update(delta)
    })

    if (Junkership.Inventory.length < Reference.MAX_PLAYERS) {
        game.checkPlayerSpawn()
    }
    if (Junkership.Inventory.length > 0 && game.playerSpawnAllowed) {
        Sound.playBGM()
    }
    Score.Inventory.forEach((score) => {
        score.update()
    })
    renderer.render(game)

    game.spawnWaveInterval += delta
    if (game.spawnWaveInterval >= game.difficulty.SPAWN_WAVE.INTERVAL) {
        game.spawnWave()
        game.spawnWaveInterval = 0
    }
    game.resetCheck()
})

var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")

import Junkership from "./Junkership.js"
import Trashbot from "./Trashbot.js"
import Reference from "./Reference.js"
import Projectile from "./Projectile.js"
import GameContainer from "./GameContainer.js"

var renderer = Pixi.autoDetectRenderer(Reference.GAME_WIDTH, Reference.GAME_HEIGHT)
renderer.backgroundColor = 0x222222
renderer.roundPixels = true

document.getElementById("mount").appendChild(renderer.view)
window.game = new GameContainer()
game.addChild(new Junkership())

game.spawnWave()

var loop = new Afloop(function(delta) {
    game.children.forEach((child) => {
        child.update(delta)
    })
    if (game.playerCount === 0) {
        game.gameOver()
    }
    renderer.render(game)
})

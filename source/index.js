var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")

import Junkership from "./Junkership.js"
import Trashbot from "./Trashbot.js"
import Reference from "./Reference.js"
import Projectile from "./Projectile.js"

var renderer = Pixi.autoDetectRenderer(Reference.GAME_WIDTH, Reference.GAME_HEIGHT)
renderer.backgroundColor = 0x222222
renderer.roundPixels = true

document.getElementById("mount").appendChild(renderer.view)
window.game = new Pixi.Container()
game.playerCount = 0
game.addChild(new Junkership())

game.addChild(new Trashbot(Reference.GAME_WIDTH, Reference.GAME_HEIGHT/2))

var loop = new Afloop(function(delta) {
    game.children.forEach((child) => {
        child.update(delta)
    })
    if (game.playerCount === 0) {
        gameOver()
    }
    renderer.render(game)
})

var gameOver = function () {
    console.log("Respawning Junkership")
    game.addChild(new Junkership())
}

var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")

import Player from "./player.js"

window.GAME_WIDTH = 230
window.GAME_HEIGHT = 130

var renderer = Pixi.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT)
renderer.backgroundColor = 0x222222
renderer.roundPixels = true

document.getElementById("mount").appendChild(renderer.view)
window.game = new Pixi.Container()
game.addChild(new Player())

var loop = new Afloop(function(delta) {
    game.children.forEach((child) => {
        child.update(delta)
    })
    renderer.render(game)
})

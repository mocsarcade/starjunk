import Pixi from "pixi.js"
import Afloop from "afloop"

import Reference from "scripts/data/Reference.js"

import Game from "scripts/sprites/Game.js"

var renderer = Pixi.autoDetectRenderer()
renderer.resize(Reference.GAME_WIDTH, Reference.GAME_HEIGHT)
renderer.backgroundColor = 0x222222
renderer.roundPixels = true

// We should really move out the DOM.
var mount = document.getElementById("mount")
mount.insertBefore(renderer.view, mount.firstChild)

// Oof.. a global variable??
window.game = new Game()

var loop = new Afloop(function(delta) {
    
    // Is it okay for us to be calling this
    // each and every iteration of the loop?
    navigator.getGamepads()
    
    game.update(delta)
    
    renderer.render(game)
})

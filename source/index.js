var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")

var WIDTH = 230, HEIGHT = 130

var renderer = Pixi.autoDetectRenderer(WIDTH, HEIGHT)
renderer.backgroundColor = 0x222222
renderer.roundPixels = true

document.getElementById("mount").appendChild(renderer.view)

var game = new Pixi.Container()
var loop = new Afloop(function(delta) {
    renderer.render(game)
})

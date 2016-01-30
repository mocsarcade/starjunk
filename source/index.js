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
game.addChild(new Junkership())
game.score=0

game.addChild(new Trashbot(Reference.GAME_WIDTH, Reference.GAME_HEIGHT/2))

var loop = new Afloop(function(delta) {
    game.children.forEach((child) => {
        child.update(delta)

        if (child instanceof Trashbot ||
            child instanceof Junkership){
            collisionCheck(child)
        }
    })
    renderer.render(game)
    console.log("Score: " + game.score)
})

function collisionCheck(child){
    var x1 = child.position.x
    var y1 = child.position.y
    var w1 = child.width
    var h1 = child.height

    var x2, y2, w2, h2

    game.children.forEach((toCompare) => {
        if (child instanceof Trashbot && toCompare instanceof Projectile){
            x2 = toCompare.position.x
            y2 = toCompare.position.y
            w2 = toCompare.width
            h2 = toCompare.height

            if (x1 < x2 + w2 && x1 + w1 > x2 &&
                y1 < y2 + h2 && h1 + y1 > y2) {
                    child.onCollision()
                    toCompare.onCollision()
                }
        }
    })
}

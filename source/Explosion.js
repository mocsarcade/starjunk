var Pixi = require("pixi.js")
var Victor = require("victor")

import Utility from "./Utility.js"
import Particle from "./Particle.js"
import Reference from "./Reference.js"

export default class Explosion {
    constructor() {}

    explodeEnemy(thisShip) {
        this.maxParticles = 50
        for (var i = 0; i < this.maxParticles; i++) {
            game.addChild(new Particle(thisShip.position.x, thisShip.position.y, this.vector = new Victor(Utility.randomFloatNumber(-1.0, 1.0), Utility.randomFloatNumber(-1.0, 1.0)), 0xFFFFFF))
        }
    }

    explodePlayer(thisShip) {
        this.maxParticles = 200
        for (var i = 0; i < this.maxParticles; i++) {
            game.addChild(new Particle(thisShip.position.x, thisShip.position.y, this.vector = new Victor(Utility.randomFloatNumber(-1.0, 1.0), Utility.randomFloatNumber(-1.0, 1.0)), 0xFF0000))
        }
    }
}
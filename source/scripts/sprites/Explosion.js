var Pixi = require("pixi.js")
var Victor = require("victor")

import Utility from "scripts/data/Utility.js"
import Particle from "scripts/sprites/Particle.js"
import Reference from "scripts/data/Reference.js"

export default class Explosion {
    constructor() {
    }

    explodeEnemy(ship) {
        this.maxParticles = 200 * Utility.randomFloatNumber(0.5, 1)
        var container = this.createParticleContainer()
        for (var i = 0; i < this.maxParticles; i++) {
            if (i % 3 === 0) {
                container.addChild(new Particle(Explosion.particles.white, ship.position, this.randomVector(), .4 * Math.random()))
            }
            container.addChild(new Particle(Explosion.particles.black, ship.position, this.randomVector(), .4 * Math.random()))
            container.addChild(new Particle(Explosion.particles.orange, ship.position, this.randomVector(), .5 * Math.random()))
            container.addChild(new Particle(Explosion.particles.orange, ship.position, this.randomVector(), .6 * Math.random()))
        }
    }

    explodePlayer(ship) {
        this.maxParticles = 100
        var container = this.createParticleContainer()
        for (var i = 0; i < this.maxParticles; i++) {
            container.addChild(new Particle(Explosion.particles.white, ship.position, this.randomVector(), 1))
        }
    }

    createParticleContainer() {
        var container = new PIXI.ParticleContainer(1200, [false, true, false, false, true])
        container.update = function(delta) {
            this.children.forEach((child) => {
                child.update(delta)
            })
            if (this.children.length === 0) {
                this.parent.removeChild(this)
                this.destroy()
            }
        }
        game.addChild(container)
        return container
    }

    randomVector() {
        return new Victor(Utility.randomFloatNumber(-1, 1), Utility.randomFloatNumber(-1, 1))
    }
}

PIXI.loader.on("complete", function() {
    var boomSheet = PIXI.loader.resources.boom.texture.baseTexture
    Explosion.particles = {
        white: new PIXI.Texture(boomSheet, new PIXI.Rectangle(0, 1, 2, 2)),
        orange: new PIXI.Texture(boomSheet, new PIXI.Rectangle(1, 0, 1, 1)),
        yellow: new PIXI.Texture(boomSheet, new PIXI.Rectangle(0, 0, 1, 1)),
        black: new PIXI.Texture(boomSheet, new PIXI.Rectangle(0, 3, 2, 2))
    }
})

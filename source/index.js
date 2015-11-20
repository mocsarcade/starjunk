var Pixi = require("pixi.js")
var Keyb = require("keyb")
var Loop = require("./systems/Loop")

const WIDTH = 80
const HEIGHT = 45

var renderer = Pixi.autoDetectRenderer(WIDTH, HEIGHT)
document.getElementById("frame").appendChild(renderer.view)

renderer.roundPixels = true
renderer.backgroundColor = 0x0F380F

var Imagine = require("./systems/Imagine")

var Colors = {
    0: "#9CBD0F",
    1: "#8CAD0F",
    2: "#306230",
    3: "#0F380F",
}

var Images = {
    "defender": Pixi.Texture.fromImage(Imagine(Colors, [
        [ , , , , ,0, , , , , ,],
        [ , , , ,0,0,0, , , , ,],
        [0, , , ,0,0,0, , , ,0,],
        [0,0, , ,0,0,0, , ,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,],
        [ ,0,0,0,0,0,0,0,0,0, ,],
    ])),
    "invader1": Pixi.Texture.fromImage(Imagine(Colors, [
        [ , ,1, , , , , ,1, , ,],
        [1, , ,1, , , ,1, , ,1,],
        [1, ,1,1,1,1,1,1,1, ,1,],
        [1,1,1,3,1,1,1,3,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,],
        [ ,1,1,1,1,1,1,1,1,1, ,],
        [ , ,1, , , , , ,1, , ,],
        [ ,1, , , , , , , ,1, ,],
    ])),
    "invader2": Pixi.Texture.fromImage(Imagine(Colors, [
        [ , ,1, , , , , ,1, , ,],
        [ , , ,1, , , ,1, , , ,],
        [ , ,1,1,1,1,1,1,1, , ,],
        [ ,1,1,3,1,1,1,3,1,1, ,],
        [1,1,1,1,1,1,1,1,1,1,1,],
        [1, ,1,1,1,1,1,1,1, ,1,],
        [1, ,1, , , , , ,1, ,1,],
        [ , , ,1,1, ,1,1, , , ,],
    ])),
    "projectile": Pixi.Texture.fromImage(Imagine(Colors, [
        [0,],
        [0,],
        [0,],
        [0,],
    ])),
}

class Defender extends Pixi.Sprite {
    constructor() {
        super(Images.defender)
        this.position.x = WIDTH / 2
        this.position.y = HEIGHT - 2
        this.anchor.x = 0.5
        this.anchor.y = 1

        this.speed = 10
    }
    update(tick) {
        if(Keyb.isDown("A")
        || Keyb.isDown("<left>")) {
            this.position.x -= this.speed * tick
        } if(Keyb.isDown("D")
        || Keyb.isDown("<right>")) {
            this.position.x += this.speed * tick
        } if(Keyb.isJustDown("<space>")) {
            stage.addChild(new Projectile({
                x: this.position.x,
                y: this.position.y
            }))
        }
    }
}

class Projectile extends Pixi.Sprite {
    constructor(protoprojectile) {
        super(Images.projectile)
        this.position.x = protoprojectile.x || 0
        this.position.y = HEIGHT - 6
        this.anchor.x = 0.5
        this.anchor.y = 1
        this.speed = 200
    }
    update(tick) {
        this.position.y -= this.speed * tick
        if(this.position.y < 0) {
             this.parent.removeChild(this)
        }
        for(var key in invaders.children) {
            var invader = invaders.children[key]
            if(Math.abs(invader.position.y - this.position.y) < 8
            && Math.abs(invader.position.x - this.position.x) < 6) {
                invaders.removeChild(invader)
            }
        }
    }
}

class Invader extends Pixi.Sprite {
    constructor(protoinvader) {
        super(Images.invader2)
        this.position.x = protoinvader.x
        this.position.y = protoinvader.y
        this.anchor.x = 0.5
        this.anchor.y = 0.5
    }
}

var stage = new Pixi.Container()
stage.addChild(new Defender())
var invaders = new Pixi.Container()
stage.addChild(invaders)
invaders.addChild(new Invader({
    x: 6+8, y: 4+8
}))
invaders.addChild(new Invader({
    x: 6+8+11+3, y: 4+8
}))

var loop = new Loop(function(tick) {
    for(var key in stage.children) {
        if(!!stage.children[key].update) {
            stage.children[key].update(tick)
        }
    }
    renderer.render(stage)
})

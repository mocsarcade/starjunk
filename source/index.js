var Pixi = require("pixi.js")
var Keyb = require("keyb")
var Loop = require("./systems/Loop")
var ShortID = require("shortid")

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

class SuperContainer extends Pixi.Container {
    constructor() {
        super(arguments)
    }
    update(tick) {
        for(var key in this.children) {
            if(!!this.children[key].update) {
                this.children[key].update(tick)
            }
        }
    }
    addChild(label, child) {
        child = child || label
        super.addChild(child)
        if(label != child) {
            child.label = label
            this[label] = this[label] || {}
            child.id = ShortID.generate()
            this[label][child.id] = child
        }
    }
    removeChild(child) {
        super.removeChild(child)
        if(!!child.label && !!this[child.label]) {
            delete this[child.label][child.id]
        }
    }
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
            stage.addChild("projectile", new Projectile({
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
        this.speed = 50
    }
    update(tick) {
        this.position.y -= this.speed * tick
        if(this.position.y < 0) {
             this.parent.removeChild(this)
        }
        for(var key in stage.invaders) {
            var invader = stage.invaders[key]
            if(Math.abs(invader.position.y - this.position.y) < 8
            && Math.abs(invader.position.x - this.position.x) < 6) {
                stage.removeChild(this)
                stage.removeChild(invader)
                if(Object.keys(stage.invaders).length == 0) {
                    console.log("You win!")
                }
            }
        }
    }
}

class Invader extends Pixi.Sprite {
    constructor(protoinvader) {
        super(protoinvader.image)
        this.position.x = protoinvader.x
        this.position.y = protoinvader.y
        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.maxstrafe = protoinvader.strafe
        this.direction = +1
        this.strafe = 0
        this.speed = 20
    }
    update(tick) {
        this.position.x += this.speed * this.direction * tick
        this.strafe += this.speed * tick
        if(this.strafe > this.maxstrafe) {
            this.strafe -= this.maxstrafe
            this.direction *= -1
            this.position.y += 2
            if(this.position.y > HEIGHT - 16) {
                console.log("You lose!")
            }
        }
    }
}

var stage = new SuperContainer()
stage.addChild(new Defender())

stage.addChild("invaders", new Invader({
    x: 6+8, y: 4+8,
    image: Images.invader1,
    strafe: 24
}))
stage.addChild("invaders", new Invader({
    x: 6+8+11+3, y: 4+8,
    image: Images.invader2,
    strafe: 24
}))
stage.addChild("invaders", new Invader({
    x: 6+8+((11+3)*2), y: 4+8,
    image: Images.invader1,
    strafe: 24
}))

var loop = new Loop(function(tick) {
    stage.update(tick)
    renderer.render(stage)
})

// use tickly for loop
// better update loop

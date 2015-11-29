var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")

var WIDTH = 160, HEIGHT = 90

var renderer = Pixi.autoDetectRenderer(WIDTH, HEIGHT)
document.getElementById("frame").appendChild(renderer.view)

renderer.roundPixels = true
renderer.backgroundColor = 0x0F380F

var Images = {
    "defender": Pixi.Texture.fromImage(require("./images/defender.png")),
    "invader1": Pixi.Texture.fromImage(require("./images/invader1.png")),
    "invader2": Pixi.Texture.fromImage(require("./images/invader2.png")),
    "projectile": Pixi.Texture.fromImage(require("./images/projectile.png"))
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
        this.speed = 50
    }
    update(tick) {
        this.position.y -= this.speed * tick
        if(this.position.y < 0) {
             this.parent.removeChild(this)
        }
        for(var key in stage.children) {
            if(stage.children[key].constructor.name == "Invader") {
                var invader = stage.children[key]
                if(Math.abs(invader.position.y - this.position.y) < 8
                && Math.abs(invader.position.x - this.position.x) < 6) {
                    stage.removeChild(this)
                    stage.removeChild(invader)
                }
            }
        }
    }
}

class Invader extends Pixi.Sprite {
    constructor(protoinvader) {
        super(Images.invader1)
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
        }
    }
}

var stage = new Pixi.Container()
stage.addChild(new Defender())
stage.addChild(new Invader({x: 6+8, y: 4+8, strafe: 24}))
stage.addChild(new Invader({x: 6+8+11+3, y: 4+8, strafe: 24}))
stage.addChild(new Invader({x: 6+8+((11+3)*2), y: 4+8, strafe: 24}))

var loop = new Afloop(function(tick) {
    stage.children.forEach(function(child) {
        if(child.update != undefined) {
            child.update(tick)
        }
    })
    renderer.render(stage)
})

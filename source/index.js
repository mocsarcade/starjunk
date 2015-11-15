"use strict"

var Pixi = require("pixi.js")

var WIDTH = 80, HEIGHT = 45

var renderer = Pixi.autoDetectRenderer(WIDTH, HEIGHT)
document.getElementById("frame").appendChild(renderer.view)

var Texture = function(colors, pixels) {
    var canvas = document.createElement("canvas")
    var context = canvas.getContext("2d")

    canvas.width = pixels[pixels.length-1].length
    canvas.height = pixels.length

    for(var y = 0; y < pixels.length; y++) {
        for(var x = 0; x < pixels[y].length; x++) {
            var pixel = pixels[y][x]
            if(pixel != undefined) {
                context.fillStyle = colors[pixel]
                context.fillRect(x, y, 1, 1)
            }
        }
    }

    return Pixi.Texture.fromImage(canvas.toDataURL())
}

var Colors = {
    0: "#5C415D",
    1: "#74526C",
    2: "#AA767C",
    3: "#D6A2AD",
    4: "#EEC584"
}

var Images = {
    "onetapship": Texture(Colors, [
        [1,1,0,1,1, , , , , , ],
        [0,1,0,0,1,1,0,0, , , ],
        [1,1,0,0,0,0,0,1,0,0, ],
        [0,1,0,0,1,0,1,0,0,1,1],
        [1,1,0,1,1,0,0,1,0,0,1],
    ]),
    "projectile": Texture(Colors, [
        [1,2,3,2]
    ])
}

var stage = new Pixi.Container()

class Onetapship extends Pixi.Sprite {
    constructor() {
        super(Images.onetapship)
        this.position.x = 15.5
        this.position.y = 15.5
        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.speed = 500
        this.firerate = 0
        this.maxfirerate = 0.1
    }
    update(tick) {
        if(Input.isDown("<space>")) {
            if(this.position.y < HEIGHT - 15.5) {
                this.position.y += this.speed * tick
                if(this.position.y > HEIGHT - 15.5) {
                    this.position.y = HEIGHT - 15.5
                }
            }
        } else {
            if(this.position.y > 15.5) {
                this.position.y -= this.speed * tick
                if(this.position.y < 15.5) {
                    this.position.y = 15.5
                }
            }
        }
        if(this.position.y == 15.5
        || this.position.y == HEIGHT - 15.5) {
            this.firerate += tick
            if(this.firerate > this.maxfirerate) {
                this.firerate -= this.maxfirerate
                this.parent.addChild(new Projectile({
                    x: this.position.x + (this.width / 2),
                    y: this.position.y + (this.height / 2) - 1
                }))
            }
        }
    }
}

var pulser = new Onetapship()
stage.addChild(pulser)

class Projectile extends Pixi.Sprite {
    constructor(protoprojectile) {
        super(Images.projectile)
        this.position.x = protoprojectile.x || 0
        this.position.y = protoprojectile.y || 0
        this.anchor.y = 0.5

        this.speed = 200
    }
    update(tick) {
        this.position.x += this.speed * tick
        if(this.position.x > WIDTH) {
            this.parent.removeChild(this)
        }
    }
}

var Loop = require("./systems/Loop")
var Input = require("./systems/Input")

var loop = new Loop(function(tick) {
    for(var key in stage.children) {
        if(!!stage.children[key].update) {
            stage.children[key].update(tick)
        }
    }
    renderer.render(stage)
})

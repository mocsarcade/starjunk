var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")

var WIDTH = 256 * 0.9, HEIGHT = 144 * 0.9

var renderer = Pixi.autoDetectRenderer(WIDTH, HEIGHT)
document.getElementById("frame").appendChild(renderer.view)

renderer.roundPixels = true
renderer.backgroundColor = 0x222222

class Jitexture extends Pixi.Texture {
    constructor(colors, pixels) {
        var canvas = document.createElement("canvas")
        var context = canvas.getContext("2d")

        canvas.width = pixels[0].length
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

        super(new Pixi.BaseTexture(canvas, Pixi.SCALE_MODES.NEAREST))
    }
}

var Colors = [
    "#C44040", //red
    "#D89000", //gold
    "#4A508A", //blue
    "#339D33", //green
    "#E5E4E2", //white
    "#111111", //black
]

var Images = {
    stars: [
        new Jitexture([Colors[0]], [[0]]),
        new Jitexture([Colors[1]], [[0]]),
        new Jitexture([Colors[2]], [[0]]),
        new Jitexture([Colors[3]], [[0]]),
        new Jitexture([Colors[4]], [[0]]),
    ],
    projectile: new Jitexture([Colors[4]], [[0]]),
    junkerships: [
        new Jitexture(Colors, [
            [0, , , , , , , , , , , , , , ,],
            [0,0,0,0,0,0, , , , , , , , , ,],
            [0,5,5,5,5,5,0,0,0, , , , , , ,],
            [ ,0,5,5,5,5,5,5,5,0,0, , , , ,],
            [0,5,5,5,5,5,5,5,5,5,5,0, , , ,],
            [0,5,5,5,5,5,5,5,4,4,4,4,0, , ,],
            [0,5,5,5,5,5,5,5,5,5,5,5,0,0, ,],
            [ ,0,5,5,5,5,5,5,5,5,5,5,5,5,0,],
            [0,5,5,5,5,5,5,5,5,5,5,5,5,5,0,],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0, ,],
        ]),
        new Jitexture(Colors, [
            [ , , , , ,1,1,1,1,1, , , , , ,],
            [ , , , ,1,5,5,5,5,5,1, , , , ,],
            [ , , ,1,5,5,5,5,5,5,5,1, , , ,],
            [ , , ,1,5,5,5,5,4,4,4,1, , , ,],
            [ , ,1,5,5,5,5,5,5,5,5,5,1, , ,],
            [ ,1,5,5,5,5,5,5,5,5,5,5,5,1, ,],
            [1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,],
            [1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,],
            [ ,1,1,5,5,5,5,5,5,5,5,5,1,1, ,],
            [ , , ,1,1,1,1,1,1,1,1,1, , , ,],
        ]),
        new Jitexture(Colors, [
            [ , , ,2,2,2, , ,2,2,2,2, , , ,],
            [ ,2,2,5,5,5,2,2,5,5,5,5,2,2, ,],
            [ ,2,5,5,5,5,5,5,5,5,5,5,5,5,2,],
            [2,5,5,5,5,5,5,5,5,5,5,2,2,2,2,],
            [2,5,5,5,5,5,5,4,4,4,2, , , , ,],
            [2,5,5,5,5,5,5,5,5,5,2, , , , ,],
            [2,5,5,5,5,5,5,5,5,5,5,2,2,2,2,],
            [ ,2,5,5,5,5,5,5,5,5,5,5,5,5,2,],
            [ ,2,2,5,5,5,2,2,5,5,5,5,2,2, ,],
            [ , , ,2,2,2, , ,2,2,2,2, , , ,],
        ]),
        new Jitexture(Colors, [
            [ , , , , , , , ,3,3,3,3, , , ,],
            [ , , , , , , ,3,5,5,5,5,3,3, ,],
            [ , ,3,3,3, ,3,5,5,5,5,5,5,3, ,],
            [ ,3,5,5,5,3,3,5,5,5,5,4,4,4,3,],
            [3,5,5,5,5,5,5,5,5,5,5,5,5,5,3,],
            [3,5,5,5,5,5,5,5,5,5,5,5,5,5,3,],
            [ ,3,5,5,5,5,5,5,5,5,5,5,5,3, ,],
            [3,5,5,5,5,5,5,5,3,5,5,5,5,5,3,],
            [ ,3,3,3,3,3,3,3, ,3,3,3,3,3, ,],
        ])
    ]
}

var Guns = {
    spray: function() {
        stage.addChild(new Projectile({
            flare: 0.15,
            rotation: -30,
            position: {
                x: this.position.x + (this.width / 2) + 2,
                y: this.position.y
            }
        }))
        stage.addChild(new Projectile({
            flare: 0.15,
            rotation: 0,
            position: {
                x: this.position.x + (this.width / 2) + 2,
                y: this.position.y
            }
        }))
        stage.addChild(new Projectile({
            flare: 0.15,
            rotation: +30,
            position: {
                x: this.position.x + (this.width / 2) + 2,
                y: this.position.y
            }
        }))
    },
    spread: function() {
        stage.addChild(new Projectile({
            flare: 0.05,
            rotation: 0,
            position: {
                x: this.position.x + (this.width / 2) + 2,
                y: this.position.y - (this.height / 2)
            }
        }))
        stage.addChild(new Projectile({
            flare: 0.05,
            rotation: 0,
            position: {
                x: this.position.x + (this.width / 2) + 2,
                y: this.position.y
            }
        }))
        stage.addChild(new Projectile({
            flare: 0.05,
            rotation: 0,
            position: {
                x: this.position.x + (this.width / 2) + 2,
                y: this.position.y + (this.height / 2)
            }
        }))
    }
}

class Star extends Pixi.Sprite {
    constructor(protostar) {
        super(protostar.image)

        this.position.x = Math.floor(Math.random() * WIDTH)
        this.position.y = Math.floor(Math.random() * HEIGHT)

        this.speed = protostar.speed * 15
    }
    update(tick) {
        this.position.x -= this.speed * tick
        if(this.position.x + this.scale.x < 0) {
            this.position.x = WIDTH + this.scale.x
            this.position.y = Math.floor(Math.random() * HEIGHT)
        }
    }
}

class Junkership extends Pixi.Sprite {
    constructor(protoship) {
        super(Images.junkerships[0])

        this.position.x = WIDTH / 4
        this.position.y = HEIGHT / 2

        this.anchor.x = 0.5
        this.anchor.y = 0.5

        this.speed = 50

        this.gun = Guns.spray
    }
    update(tick) {
        if(Keyb.isDown("W") || Keyb.isDown("<up>")) {
            this.position.y -= this.speed * tick
            if(this.position.y < 0) {
                this.position.y = 0
            }
        } if(Keyb.isDown("S") || Keyb.isDown("<down>")) {
            this.position.y += this.speed * tick
            if(this.position.y > HEIGHT) {
                this.position.y = HEIGHT
            }
        } if(Keyb.isDown("A") || Keyb.isDown("<left>")) {
            this.position.x -= this.speed * tick
            if(this.position.x < 0) {
                this.position.x = 0
            }
        } if(Keyb.isDown("D") || Keyb.isDown("right>")) {
            this.position.x += this.speed * tick
            if(this.position.x > WIDTH) {
                this.position.x = WIDTH
            }
        } if(Keyb.isJustDown("<space>")) {
            this.gun()
        }
    }
}

class Antijunkership extends Pixi.Sprite {}

class Projectile extends Pixi.Sprite {
    constructor(protoprojectile) {
        super(Images.projectile)

        this.position = protoprojectile.position

        if(protoprojectile.randomness) {
            if(protoprojectile.randomness.x) {
                this.position.x += Math.random() * protoprojectile.randomness.x
                this.position.x -= protoprojectile.randomness.x / 2
            } if(protoprojectile.randomness.y) {
                this.position.y += Math.random() * protoprojectile.randomness.y
                this.position.y -= protoprojectile.randomness.y / 2
            }
        }

        this.scale.x = 5
        this.scale.y = 3

        if(protoprojectile.flare > 0) {
            this.flare = protoprojectile.flare
            this.scale.y *= 2
        }

        this.anchor.x = 0
        this.anchor.y = 0.5

        this.rotation = protoprojectile.rotation * (Math.PI / 180)

        this.speed = 150
    }
    update(tick) {
        this.position.x += this.speed * Math.cos(this.rotation) * tick
        this.position.y += this.speed * Math.sin(this.rotation) * tick

        if(this.flare > 0) {
            this.flare -= tick
            if(this.flare <= 0) {
                this.scale.y /= 2
            }
        }

        if(this.position.x < 0
        || this.position.y < 0
        || this.position.x > WIDTH
        || this.position.y > HEIGHT ) {
            stage.removeChild(this)
        }
    }
}

class Junkbox extends Pixi.Sprite {}

var stage = new Pixi.Container()

for(var i = 0; i < 9 * 5; i++) {
    stage.addChild(new Star({
        speed: Math.random() + 1,
        image: Images.stars[i % Images.stars.length],
    }))
}

stage.addChild(new Junkership())

var text = new Pixi.Text("Hello World!!", {
    font: "10px Arial",
    fill: Colors[4],
    strokeThickness: 5,
})
text.blendMode = PIXI.BLEND_MODES.ADD
stage.addChild(text)

var loop = new Afloop(function(tick) {
    tick = Math.min(tick, 0.5)
    stage.children.forEach(function(child) {
        if(child.update != undefined) {
            child.update(tick)
        }
    })
    renderer.render(stage)
})

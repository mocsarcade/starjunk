var Pixi = require("pixi.js")
var Keyb = require("keyb")

import Reference from "./Reference.js"
import Projectile from "./Projectile.js"
import Score from "./Score.js"
import {PeaShoota, PowerUp, TriShoota, FiveShoota, RapidFire, SprayShot,
        SuperSprayShot, CrazySprayShot, VertSprayShot, VertShoota,
        RapidSprayShot, BFG} from "./PowerUp.js"


export default class Junkership extends Pixi.Sprite {
    constructor(controlScheme) {
        super(PIXI.loader.resources.redJunkership.texture)
        game.playerCount++
        this.speed = 60
        this.score = new Score()
        this.powerUp = new PeaShoota()
        this.reloadTime = 0
        this.controls = controlScheme
        this.hitBox = new Pixi.Rectangle(
            this.x + 1 , // Left offset
            this.y + 1 , // Top offset
            this.width - 3 , // Right offset + left offset
            this.height - 3 )// Bottom offset + top offset
        this.WeaponList = [PeaShoota, TriShoota, FiveShoota, RapidFire,
                           SprayShot, SuperSprayShot, CrazySprayShot,
                           VertSprayShot, VertShoota, RapidSprayShot, BFG]
    }

    update(delta) {
        // Ugly kludge
        if (this.width === 1) {
            this.onCollision()
        }

        var relativeSpeed = this.speed * delta

        if (Keyb.isJustDown(Reference.ControlScheme.keys[this.controls].up)) {
            this.ignoreY = "down"
        }
        if (Keyb.isJustDown(Reference.ControlScheme.keys[this.controls].down)) {
            this.ignoreY = "up"
        }
        if (Keyb.isJustDown(Reference.ControlScheme.keys[this.controls].left)) {
            this.ignoreX = "right"
        }
        if (Keyb.isJustDown(Reference.ControlScheme.keys[this.controls].right)) {
            this.ignoreX = "left"
        }
        if (Keyb.isJustUp(Reference.ControlScheme.keys[this.controls].up)
            || Keyb.isJustUp(Reference.ControlScheme.keys[this.controls].down)) {
            this.ignoreY = null
        }
        if (Keyb.isJustUp(Reference.ControlScheme.keys[this.controls].left)
            || Keyb.isJustUp(Reference.ControlScheme.keys[this.controls].right)) {
            this.ignoreX = null
        }
        if(Keyb.isDown(Reference.ControlScheme.keys[this.controls].up)
           && this.ignoreY != "up") {
            this.move(-relativeSpeed, "y")
        }
        if(Keyb.isDown(Reference.ControlScheme.keys[this.controls].down)
           && this.ignoreY != "down") {
            this.move(relativeSpeed, "y")
        }
        if(Keyb.isDown(Reference.ControlScheme.keys[this.controls].left)
           && this.ignoreX != "left") {
            this.move(-relativeSpeed, "x")
        }
        if(Keyb.isDown(Reference.ControlScheme.keys[this.controls].right)
           && this.ignoreX != "right") {
            this.move(relativeSpeed, "x")
        }

        if(Keyb.isJustDown(Reference.ControlScheme.keys[this.controls].fire)) {
            this.powerUp.fire(this)
        }

        if(Keyb.isDown(Reference.ControlScheme.keys[this.controls].fire)) {
            this.reloadTime += 1
            if(this.powerUp.rapidFire == true) {
                if(this.reloadTime >= 10) {
                    this.powerUp.fire(this)
                    this.reloadTime = 0
                }
            }

            if(this.powerUp.BFGrapid == true) {
                if(this.reloadTime >= 2.5) {
                    this.powerUp.BfgFire(this,delta)
                    this.reloadTime = 0
                }
            }
        }
    }

    onCollision(collidedWith) {
        game.removeChild(this)
        this.score.reset()
        this.destroy()
        game.playerCount--
    }

    move(distance, direction) {
        var newPosition = this.position[direction] + distance
        var maxBottom = Reference.GAME_HEIGHT - this.height
        var maxRight = Reference.GAME_WIDTH - this.width
        if (newPosition < 0) {
            newPosition = 0
        } else if (direction === "x" && newPosition > maxRight) {
            newPosition = maxRight
        } else if (direction === "y" && newPosition > maxBottom) {
            newPosition = maxBottom
        }

        this.position[direction] = newPosition

        this.hitBox.x = this.x + 1
        this.hitBox.y = this.y + 1
    }

    changePowerUp(newPowerUp) {
        this.powerUp = new this.WeaponList[newPowerUp]
    }
}

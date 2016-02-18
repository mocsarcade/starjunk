var Pixi = require("pixi.js")
var Afloop = require("afloop")
var Keyb = require("keyb")

import Junkership from "./Junkership.js"
import Reference from "./Reference.js"
import Score from "./Score.js"
import GameContainer from "./GameContainer.js"
import Projectile from "./Projectile.js"

export default function powerUp(curPower) {

    this.curPower = curPower
    this.bulletSpeed = 80
    this.fireRate = 1
    this.projectileType = "bullet"

    this.peaShoota = peaShoota
    this.triShoot = triShoot

    function peaShoota(curXpos,curYpos,curShip,wOffset,hOffset) {
        game.addChild(new Projectile(
                curXpos + wOffset,
                curYpos + hOffset,
                curShip, this.fireRate, this.bulletSpeed, this.projectileType))
    }


    function triShoot(curXpos,curYpos,curShip,wOffset,hOffset) {
        game.addChild(new Projectile(
                curXpos + wOffset,
                curYpos + hOffset,
                curShip, this.fireRate, this.bulletSpeed, this.projectileType))
        game.addChild(new Projectile(
                curXpos + wOffset,
                curYpos + hOffset + 3,
                curShip, this.fireRate, this.bulletSpeed, this.projectileType))
        game.addChild(new Projectile(
                curXpos + wOffset,
                curYpos + hOffset - 3,
                curShip, this.fireRate, this.bulletSpeed, this.projectileType))
    }
}

var Pixi = require("pixi.js")
var Keyb = require("keyb")

import Reference from "./Reference.js"
import Projectile from "./Projectile.js"

var junkerTex = Pixi.Texture.fromImage(require("./images/blue-starship.png"))

export default class Junkership extends Pixi.Sprite {
    constructor() {
        super(junkerTex)
        this.speed = 60
        this.score = 0
    }
    update(delta){
        if(Keyb.isDown("<up>") && this.position.y > 0){
            this.position.y -= this.speed * delta
        }
        if(Keyb.isDown("<down>") &&
            (this.position.y + this.height) < Reference.GAME_HEIGHT){
            this.position.y += this.speed * delta
        }
        if(Keyb.isDown("<left>") && this.position.x > 0){
            this.position.x -= this.speed * delta
        }
        if(Keyb.isDown("<right>") &&
            (this.position.x + this.width) < Reference.GAME_WIDTH){
            this.position.x += this.speed * delta
        }
        if(Keyb.isJustDown("<space>")){
            game.addChild(new Projectile(
                this.x + this.width,
                this.y + this.height/2,
                this))
        }
        console.log("Score: " + this.score)
    }

    collisionCheck(){
        //var x1 = this.position.x
        //var y1 = this.position.y
        //var w1 = this.width
        //var h1 = this.height

        //var x2, y2, w2, h2

        //TODO: Complete Player Collision logic
    }

    onCollision(collidedWith){

    }

}

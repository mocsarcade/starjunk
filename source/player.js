var Pixi = require("pixi.js")
var Keyb = require("keyb")

export default class Player extends Pixi.Sprite {
    constructor() {
        var playerTex =
            Pixi.Texture.fromImage(require("./images/blue-starship.png"))
        super(playerTex)
        this.speed = 60
    }
    update(delta){
        if(Keyb.isDown("<up>") && this.position.y > 0){
            this.position.y -= this.speed * delta
        }
        if(Keyb.isDown("<down>") &&
            (this.position.y + this.height) < window.GAME_HEIGHT){
            this.position.y += this.speed * delta
        }
        if(Keyb.isDown("<left>") && this.position.x > 0){
            this.position.x -= this.speed * delta
        }
        if(Keyb.isDown("<right>") &&
            (this.position.x + this.width) < window.GAME_WIDTH){
            this.position.x += this.speed * delta
        }
    }
}

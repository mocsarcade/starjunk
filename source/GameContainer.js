var Pixi = require("pixi.js")

export default class GameContainer extends Pixi.Container {
    constructor() {
        super()
        this.playerCount = 0
    }
}

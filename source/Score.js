var $ = require("jquery")
import Reference from "./Reference.js"


export default class Score {
    constructor(playerNumber) {
        this.count = 0
        this.playerNumber = (playerNumber === undefined) ? game.playerCount : playerNumber
        this.domElement = $("#player-" + this.playerNumber + "-score")
        $(this.domElement).addClass("player-score-value")
        this.update()
    }

    update() {
        $(this.domElement).text(this.getScore())
    }

    getScore() {
        return this.count
    }

    incrementScore(increaseAmount) {
        increaseAmount = (increaseAmount !== undefined) ? increaseAmount : 1
        this.count += increaseAmount
        this.update()
    }

    reset() {
        $(this.domElement).text(Reference.JOIN_GAME_TEXT)
        $(this.domElement).removeClass("player-score-value")
    }

    static resetAll() {
        $(".player-score").each(function() {
            $(this).text(Reference.JOIN_GAME_TEXT)
            $(this).removeClass("player-score-value")
        })
    }
}
var $ = require("jquery")
import Reference from "./Reference.js"
import Junkership from "./Junkership.js"


export default class Score {
    constructor(playerNumber) {
        this.count = 0
        this.playerNumber = playerNumber
        this.domElement = $("#p" + this.playerNumber + "-score")
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

        if (this.count * Junkership.Inventory.length >= game.difficulty.SCORE_LIMIT) {
            game.difficulty = Reference.DIFFICULTY[game.difficulty.LEVEL + 1]
        }
    }

    reset() {
        $(this.domElement).text("")
    }

    static resetAll() {
        $("[id$=-score]").each(function () {
            $(this).text("")
        })
    }
}
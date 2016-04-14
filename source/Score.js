var $ = require("jquery")
import Junkership from "./Junkership.js"
import Reference from "./Reference.js"
import {ControlScheme} from "./Controls.js"

export default class Score {
    constructor(playerNumber) {
        this.count = 0
        this.playerNumber = playerNumber
        this.domElement = $("#p" + this.playerNumber + "-score")
        this.update()
        this.input = {
            indices: [1, 1, 1],
            slot:    0,
            name:    "AAA"
        }
    }

    update() {
        if (this.controls === undefined) {
            $(this.domElement).text(this.getScore())
        } else {
            if (this.controls.justDown("up")) {
                this.input.indices[this.input.slot]++
                this.input.indices[this.input.slot] %= Reference.HIGH_SCORE_NAME_VALUES.length
                this.setText()
            }
            if (this.controls.justDown("down")) {
                this.input.indices[this.input.slot]--
                this.input.indices[this.input.slot] %= Reference.HIGH_SCORE_NAME_VALUES.length
                this.setText()
            }
            if (this.controls.justDown("left") && this.input.slot > 0) {
                this.input.slot--
            }
            if (this.controls.justDown("right") && this.input.slot < (this.input.indices.length - 1)) {
                this.input.slot++
            }
            if(this.controls.justDown("fire")) {
                this.releaseControls()
                game.metrics.submitHighScore(this.input.name, this.count)
            }
        }
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

    gainControls(controls) {
        this.controls = controls
        Score.Inventory.push(this)
        this.setText()
    }

    releaseControls() {
        if (this.controls.type == "keyb") {
            ControlScheme.keys[this.controls.index].inUse = false
        } else {
            ControlScheme.padsInUse[this.controls.index] = false
        }
        this.controls = undefined
        Score.Inventory.splice(Score.Inventory.indexOf(this), 1)
        this.reset()
    }

    setText() {
        var text = ""
        this.input.indices.forEach((currentSlot) => {
            text += Reference.HIGH_SCORE_NAME_VALUES.substr(currentSlot, 1)
        })
        $(this.domElement).text(text)
        this.input.name = text
    }
}

Score.Inventory = []


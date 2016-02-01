import Reference from "./Reference.js"


export default class Score {
    constructor(playerNumber) {
        this.count = 0
        this.playerNumber = (playerNumber === undefined) ? game.playerCount : playerNumber
        this.domElement = document.createElement("div")
        this.domElement.className += " player-score"
        this.domElement.style.position = "absolute"
        this.domElement.style.textAlign = "center"
        var whiteText = document.createElement("div")
        var colorText = document.createElement("div")
        whiteText.className += " foreground-score"
        colorText.id = "player-" + this.playerNumber + "-score"
        colorText.className += " shadow-score"
        this.domElement.appendChild(whiteText)
        this.domElement.appendChild(colorText)
        document.body.appendChild(this.domElement)
        this.gameCanvas = document.getElementById("gameCanvas")
        this.update()

    }

    update(delta) {
        var scoreElementWidth = this.gameCanvas.offsetWidth * 0.995 / game.playerCount
        var scoreLeftOffset = this.gameCanvas.offsetLeft + scoreElementWidth * (this.playerNumber - 1)
        var fontSize = (this.gameCanvas.offsetWidth / 23 * 1.5)
        this.domElement.style.top = this.gameCanvas.offsetTop + "px"
        this.domElement.style.left = scoreLeftOffset + "px"
        this.domElement.style.width = scoreElementWidth + "px"
        this.domElement.style.fontSize = fontSize + "px"

        Array.from(this.domElement.children).forEach((child) => {
            child.innerHTML = this.count
            if (child.id === "player-" + this.playerNumber + "-score") {
                child.style.top = - (fontSize - fontSize / 100) + "px"
                child.style.left = (fontSize * 3 / 40) + "px"
            }
        })
    }

    getScore() {
        return this.count
    }

    incrementScore(increaseAmount) {
        if (increaseAmount === undefined) {
            increaseAmount = 1
        }
        this.count += increaseAmount
        this.update()
    }

    destroy() {
        document.body.removeChild(this.domElement)
    }


}
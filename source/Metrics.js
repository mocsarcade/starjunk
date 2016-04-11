var Firebase = require("firebase")
var $ = require("jquery")
import Trashbot from "./Trashbot.js"
import Junkership from "./Junkership.js"

export default class Metrics {
    constructor(firebaseURL) {
        var firebase = new Firebase(firebaseURL)
        this.scoresReference = firebase.child("scores")
        this.metricsReference = firebase.child("metrics")
        this.highScores = []
        this.scoresReference.orderByChild("score").limitToLast(10).on("value", (snapshot) => {
            this.highScores = $.map(snapshot.val(), function(each) {
                return each
            })
        })
    }

    submitMetrics(junkership) {
        var timeAlive = Math.floor((Date.now() - junkership.createdTime) / 1000)
        var data = {
            timeAlive: timeAlive,
            finalPosition: {
                x: junkership.position.x,
                y: junkership.position.y
            },
            score: junkership.score.getScore(),
            trashbots: Trashbot.Inventory.length,
            junkerships: Junkership.Inventory.length,
            lastWeapon: junkership.powerUp.name
        }
        this.metricsReference.push(data)
    }

    submitHighScore(name, score) {
        var data = {
            name: name,
            score: score
        }
        this.scoresReference.push(data)
    }

    isTopScore(score) {
        var isTopScore = false
        if (this.highScores.length >= 10) {
            this.highScores.forEach((eachHighScore) => {
                if (score > eachHighScore.score) {
                    isTopScore = true
                }
            })
        } else {
            isTopScore = true
        }
        return isTopScore
    }
}

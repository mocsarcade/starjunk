import Reference from "./Reference.js"
var Pixi = require("pixi.js")
var $ = require("jquery")

export default class JunkName {
    constructor(name, x, y) {
        this.domElement = $("<div class='junk-text'></div>")
        this.domElement.text(name)
        this.domElement.css({
            left: x /2.25 + "vh",
            top: y /2.25 + "vh"
        })
        $("#mount").append(this.domElement)

        setTimeout(
            function() {
                $(this.domElement).remove()
                this.destroy()
            }.bind(this),
            Reference.NAME_DESPAWN
        )
    }
}

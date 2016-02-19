exports.hasCollision = function hasCollision(a, b) {
    if (a == null || b == null) {
        return false
    } else {
        var x1 = a.x
        var y1 = a.y
        var w1 = a.width
        var h1 = a.height

        var x2 = b.x
        var y2 = b.y
        var w2 = b.width
        var h2 = b.height

        if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && h1 + y1 > y2) {
            return true
        } else {
            return false
        }
    }
}

exports.randomNumber = function randomNumber(min, max) {
    return max - Math.floor(Math.random() * min)
}
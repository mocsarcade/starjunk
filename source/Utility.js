exports.hasCollision = function hasCollision(a, b) {
    if ( a == null || b == null) {
        return false
    } else {
        var x1 = a.position.x
        var y1 = a.position.y
        var w1 = a.width
        var h1 = a.height

        var x2 = b.position.x
        var y2 = b.position.y
        var w2 = b.width
        var h2 = b.height

        if(x1 < x2 + w2 && x1 + w1 > x2
        && y1 < y2 + h2 && h1 + y1 > y2) {
            return true
        } else {
            return false
        }
    }
}

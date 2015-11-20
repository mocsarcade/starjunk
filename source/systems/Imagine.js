function Imagine(colors, pixels) {
    var canvas = document.createElement("canvas")
    var context = canvas.getContext("2d")

    canvas.width = pixels[pixels.length-1].length
    canvas.height = pixels.length

    for(var y = 0; y < pixels.length; y++) {
        for(var x = 0; x < pixels[y].length; x++) {
            var pixel = pixels[y][x]
            if(pixel != undefined) {
                context.fillStyle = colors[pixel]
                context.fillRect(x, y, 1, 1)
            }
        }
    }
    
    return canvas.toDataURL()
}

export default Imagine

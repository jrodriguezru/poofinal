function setup() {
    UIInitialization()
    setInterval(movement, timer)


}

function draw() {
    UIUpdate();
    canvas.background(color(colors[theme][0]));
    drawQuadrille(map, {pixelX: 0, pixelY: 0, cellLength: length, outline: color(255, 0), board:false});
    drawQuadrille(snake, {row: snakeRow, col: snakeCol, cellLength: length, outline: color(255, 0), board: false})
    
}
function setup() {
    UIInitialization();
    setInterval(movement, timer);
    setInterval(fruitCollect, timer);


}

function draw() {
    UIUpdate();
    canvas.background(color(colors[theme][0]));
    drawQuadrille(map, {pixelX: 0, pixelY: 0, cellLength: length, outline: color(255, 0), board:false});
    for (let i = 0; i < snakeArray.length; i++) {
        drawQuadrille(snakeArray[i], {row: snakePosition[i][0], col: snakePosition[i][1], cellLength: length, outline: color(255, 0), board: false});
    }
    
    drawQuadrille(fruit, {row: fruitRow, col: fruitCol, cellLength: length, outline: color(255, 0), board:false});
}
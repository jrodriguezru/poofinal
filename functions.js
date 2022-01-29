// Color = Paredes
function colorArray(originalArray, color) {
    let coloredArray = [...originalArray];
    a = originalArray.length;
    b = originalArray[0].length;
    for (let i =  0; i < a; i++) {
        for (let j = 0; j < b; j++) {
            if (originalArray[i][j] != 0) {
                coloredArray[i][j] = color;
            }
        }
    }
    return coloredArray; 
}

// Entra matriz de colores y el "item" a seleccionar el color aka Serpiente, mapa, paredes, etc...
function getColor(matrix, type) {
    return color(colors[theme][type]);
}

function getMap() {
    return maps[level - 1];
}
/*
function quadrilleMap() {
    return createQuadrille(colorArray(getMap(), getColor(colors, 2)));
}*/

function keyPressed() {
    if (!pause) {
        switch (key) {
            case 'w':
                direction = 0;
                snakeDirections[0] = 0;
                break;
            case 'a':
                direction = 1;
                snakeDirections[0] = 1;
                break;
            case 's':
                direction = 2;
                snakeDirections[0] = 2;
                break;
            case 'd':
                direction = 3;
                snakeDirections[0] = 3;
                break;
            case 'q':
                autoLevelUp();
                break;
        }
    }
}

function movement() {
    if (!pause && noCollision() && !noOwnCollision()) {
        for (let i = 0; i < snakeDirections.length; i++) {
            switch (snakeDirections[i]) {
                case 0: 
                    snakePosition[i][0] -= 1;
                    break;
                case 1:
                    snakePosition[i][1] -= 1;
                    break;
                case 2:
                    snakePosition[i][0] += 1;
                    break;
                case 3:
                    snakePosition[i][1] +=1;
                    break;
            }
        }
        if (snakeDirections.length > 1) {
            let snakeDirectionsCopy = [...snakeDirections];
            for (let i = 0; i < snakeDirections.length - 1; i++) {
                let directionActual = snakeDirectionsCopy.slice(i,i+1);
                snakeDirections[i+1] = directionActual[0];
            }
        }
    }
    else if (!pause && (!noCollision() || noOwnCollision())) {
        gameOverStart();
    }
}

function isEmpty(quadrille) {
    empty = true;
    for (i = 0; i < 20; i++) {
        for (j = 0; j < 20; j++) {
            if (quadrille.read(i,j) != 0) {
                empty = false;
                break;
            }
        }
    }
    return empty;
}

function noCollision() {
    switch (direction) {
        case 0:
            return isEmpty(Quadrille.AND(map, snakeArray[0], snakePosition[0][0]-1, snakePosition[0][1]));
        case 1:
            return isEmpty(Quadrille.AND(map, snakeArray[0], snakePosition[0][0], snakePosition[0][1]-1));
        case 2:
            return isEmpty(Quadrille.AND(map, snakeArray[0], snakePosition[0][0]+1, snakePosition[0][1]));
        case 3:
            return isEmpty(Quadrille.AND(map, snakeArray[0], snakePosition[0][0], snakePosition[0][1]+1));
    }
}

function randomFruit() {
    fruitRow = int(random(1,18));
    fruitCol = int(random(1,18));
    fruit = createQuadrille([getColor(colors, 3)]);
    if (!isEmpty(Quadrille.AND(map, fruit, fruitRow, fruitCol))) {
        randomFruit();
    }
    return fruit;
}

function fruitCollect() {
    clone1 = map.clone();
    clone = Quadrille.OR(clone1, fruit, fruitRow, fruitCol);
    if (!isEmpty(Quadrille.AND(clone, snakeArray[0], snakePosition[0][0], snakePosition[0][1]))) {
        randomFruit();
        let actualSize = snakeArray.length - 1;
        snakeArray[actualSize + 1] = createQuadrille([getColor(colors, 1)]);
        let actualDirection = snakeDirections.slice(actualSize);
        snakeDirections[actualSize + 1] = actualDirection[0];
        snakePosition[actualSize + 1] = [];
        let actualPosition = snakePosition[actualSize].slice();
        switch(actualDirection[0]) {
            case 0:
                snakePosition[actualSize + 1][0] = actualPosition[0] + 1;
                snakePosition[actualSize + 1][1] = actualPosition[1];
                break;
            case 1:
                snakePosition[actualSize + 1][0] = actualPosition[0];
                snakePosition[actualSize + 1][1] = actualPosition[1] + 1;
                break;
            case 2:
                snakePosition[actualSize + 1][0] = actualPosition[0] - 1;
                snakePosition[actualSize + 1][1] = actualPosition[1];
                break;
            case 3:
                snakePosition[actualSize + 1][0] = actualPosition[0];
                snakePosition[actualSize + 1][1] = actualPosition[1] - 1;
                break;
        }
        score += 100;
        levelUp();
    }
}

function noOwnCollision() {
    collide = false;
    clone2 = map.clone();
    let snakeLength = snakeArray.length - 1;
    for (i = 1; i <= snakeLength; i++) {
        clone2 = Quadrille.OR(clone2, snakeArray[i], snakePosition[i][0], snakePosition[i][1]);
    }
    switch (direction) {
        case 0:
            if (!isEmpty(Quadrille.AND(clone2, snakeArray[0], snakePosition[0][0]-1, snakePosition[0][1]))) {
                collide = true;
            }
            break;
        case 1:
            if (!isEmpty(Quadrille.AND(clone2, snakeArray[0], snakePosition[0][0], snakePosition[0][1]-1))) {
                collide = true;
            }
            break;
        case 2:
            if (!isEmpty(Quadrille.AND(clone2, snakeArray[0], snakePosition[0][0]+1, snakePosition[0][1]))) {
                collide = true;
            }
            break;
        case 3:
            if (!isEmpty(Quadrille.AND(clone2, snakeArray[0], snakePosition[0][0], snakePosition[0][1]+1))) {
                collide = true;
            }
            break;
    }
    return collide;
}

function levelUp() {
    if ((score == 1000 * ((level * (level + 1)) / 2)) && (level != 7)) {
        windowSpace = 4;
        pause = true;
        if (level !=7) { 
            level += 1;
        }
        snakeArray = [];
        snakeDirections = [2];
        snakePosition = [[]];
        snakePosition[0][0] = 4;
        snakePosition[0][1] = 4;
        snakeArray[0] = createQuadrille([getColor(colors, 1)]);
        map = createQuadrille(colorArray(getMap(), getColor(colors, 2)));
    }
    else if (level == 7 && score == 533000) {
        let posibleHighScore = score;
        if (posibleHighScore > bestScores[4]) {
            bestScores[4] = posibleHighScore;
            organizeBestScores();
        }
        windowSpace = 5;
        pause = true;
    }
}

function autoLevelUp() {
    if (level != 7) {
        level += 1;
    }
    snakeArray = [];
    snakeDirections = [2];
    snakePosition = [[]];
    snakePosition[0][0] = 4;
    snakePosition[0][1] = 4;
    snakeArray[0] = createQuadrille([getColor(colors, 1)]);
    map = createQuadrille(colorArray(getMap(), getColor(colors, 2)));
}

function gameOverStart() {
    pause = true;
    let posibleHighScore = score;
    if (posibleHighScore > bestScores[4]) {
        bestScores[4] = posibleHighScore;
        organizeBestScores();
    }
    windowSpace = 3;
}

function gameOverRetry() {
    level = 1;
    score = 0;
    snakeArray = [];
    snakeDirections = [0];
    snakePosition = [[]];
    snakePosition[0][0] = 9;
    snakePosition[0][1] = 9;
    snakeArray[0] = createQuadrille([getColor(colors, 1)]);
    map = createQuadrille(colorArray(getMap(), getColor(colors, 2)));
    windowSpace = 0;
    pause = false;
}
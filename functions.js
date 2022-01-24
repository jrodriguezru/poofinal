// Color = Paredes
function colorArray(originalArray, color){
    let coloredArray = [...originalArray];
    a = originalArray.length;
    b = originalArray[0].length;
    for (let i =  0; i < a; i++){
      for (let j = 0; j < b; j++){
        if (originalArray[i][j] != 0) {
          coloredArray[i][j] = color;
        }
      }
    }
    return coloredArray; 
}

// Entra matriz de colores y el "item" a seleccionar el color aka Serpiente, mapa, paredes, etc...
function getColor(matrix, type){
    return color(colors[theme][type]);
}

function getMap() {
    return maps[level - 1];
}
/*
function quadrilleMap() {
    return createQuadrille(colorArray(getMap(), getColor(colors, 2)));
}*/

function keyPressed(){
  if (!pause){
    switch (key){
      case 'w':
        direction = 0;
        break;
      case 'a':
        direction = 1;
        break;
      case 's':
        direction = 2;
        break;
      case 'd':
        direction = 3;
        break;
    }
  }
}

function movement(){
  if (!pause && noCollision()){
    switch (direction){
      case 0: 
        snakeRow -= 1;
        break;
      case 1:
        snakeCol -= 1;
        break;
      case 2:
        snakeRow += 1;
        break;
      case 3:
        snakeCol +=1;
        break;
    }
  }
  else if (!pause && !noCollision()) {
      gameOver();
  }
}

function isEmpty(quadrille){
  empty = true;
  for (i=0; i<20; i++){
    for (j=0; j<20; j++){
      if (quadrille.read(i,j)!=0){
        empty = false;
        break;
      }
    }
  }
  return empty;
}

function noCollision(){
  switch (direction){
    case 0:
      return isEmpty(Quadrille.AND(map, snake, snakeRow-1, snakeCol));
      break;
    case 1:
      return isEmpty(Quadrille.AND(map, snake, snakeRow, snakeCol-1));
      break;
    case 2:
      return isEmpty(Quadrille.AND(map, snake, snakeRow+1, snakeCol));
      break;
    case 3:
      return isEmpty(Quadrille.AND(map, snake, snakeRow, snakeCol+1));
      break;
  }
}


function gameOver() {
    windowSpace = 3;
}
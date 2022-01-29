function UIInitialization() {
    if (localStorage.length == 0) {
        localStorage.setItem("1", "0");
        localStorage.setItem("2", "0");
        localStorage.setItem("3", "0");
        localStorage.setItem("4", "0");
        localStorage.setItem("5", "0");
        for (let i = 0; i < 5; i++) {
            bestScores[i] = 0;
        }
    }
    else if (localStorage.length == 5) {
        for (let i = 0; i < 5; i++) {
            bestScores[i] = int(localStorage.getItem(i + 1));
        } 
    }
    else {
        alert("This page's cache data is damaged, please delete this page's cache in your browser settings to load properly");
    }
    canvas = createCanvas(rows * length, columns * length);
    map = createQuadrille(colorArray(getMap(), getColor(colors, 2)));
    snakeArray[0] = createQuadrille([getColor(colors, 1)]);
    fruit = randomFruit();
    mainTitle = createElement('h1', 'Snake');
    pauseButton = createButton('Play/Pause Game');
    pauseButton.class('btn');
    pauseButton.mousePressed(togglePause);
    themeSelect = createSelect();
    themeSelect.option("Desert", 0); 
    themeSelect.option("Neon Rave", 1);
    themeSelect.option("Retro Gameboy", 2);
    themeSelect.option("Red Room", 3);
    themeSelect.changed(themeChanged);
    themeSelect.class('dropDownMenu');
    themeLabel = createP('Select Theme:');
    darkModeInitialization();
    if (darkMode == 0 ) {
        dmSelector = createCheckbox("", false);
    }
    else if (darkMode == 1) {
        dmSelector = createCheckbox("", true);
    }
    darkModeP = createP('Dark Mode?');
    dmSelector.changed(dmChange);
    settingsButton = createButton('Settings');
    settingsButton.class('btn');
    settingsButton.mousePressed(goToSettings);
    goBackButton = createButton('Go Back');
    goBackButton.class('btn');
    goBackButton.mousePressed(goToGame);
    settingsLabel = createP('Settings');
    settingsLabel.class('mainLabel');
    pauseLabel = createP('Game Paused');
    pauseLabel.class('mainLabel');
    controlMainLabel = createP('Controls:');
    controlsLabel = createP('W - Move Up <br>A - Move Left <br>S - Move Down <br>D - Move Right');
    footerLabel = createP('Nicolás Montaña Cuervo <br> Juan Antonio Rodríguez Rubio <br>UN <br> 2022');
    footerLabel.class('footer');
    gameOverLabel = createP('Game Over');
    gameOverLabel.class('bigLabel');
    gameOverButton = createButton('Retry');
    gameOverButton.class('btn');
    gameOverButton.mousePressed(gameOverRetry);
    scoreLabel = createP('Score:');
    scoreVariable = createP(score);
    scoreVariable.class('lcv');
    levelLabel = createP('Level:');
    levelVariable =  createP(level);
    levelVariable.class('lcv');
    gameOverText = createP('Your score was: ' + score + "<br>The maximum level you reached was: " + level);
    gameOverText.class('centerText');
    bestScoresLabel = createP('High Scores:');
    bestScoresLabel.class('mainLabel');
    bestScoresTable = createP('1 - ' + bestScores[0] + '<br>2 - ' + bestScores[1] + '<br>3 - ' + bestScores[2] + '<br>4 - ' + bestScores[3] + '<br>5 - ' + bestScores[4]);
    nextLevelLabel = createP('Level Up');
    nextLevelLabel.class('bigLabel');
    nextLevelButton = createButton('Continue');
    nextLevelButton.mousePressed(continueToGame);
    nextLevelButton.class('btn');
    endGameLabel = createP('Congratulations!');
    endGameLabel.class('bigLabel');
    endGameText = createP('You have succesfully completd this game. <br>Press the button below to play again.');
    endGameText.class('centerText');
    endGameButton = createButton('Play Again');
    endGameButton.class('btn');
    endGameButton.mousePressed(gameOverRetry);
}

function UIUpdate() {
    if (localStorage.length == 5) {
        for (let i = 0; i < 5; i++) {
            bestScores[i] = int(localStorage.getItem(i + 1));
        }   
    }
    darkModeChange();
    darkModeApply();
    let x = (windowWidth - width) / 2;
    canvas.position(x, 80);
    pauseButton.position(x + 420, 90);
    settingsButton.position(x + 420, 130);
    settingsLabel.position(x + 150, 90);
    themeLabel.position(x + 30, 138);
    themeSelect.position(x + 140, 155);
    darkModeP.position(x + 30, 170);
    dmSelector.position(x + 140, 188);
    goBackButton.position(x + 180, 300);
    pauseLabel.position(x + 138, 100);
    controlMainLabel.position(x + 40, 140);
    controlsLabel.position(x +40, 170);
    footerLabel.position(x + 100, 480);
    gameOverLabel.position(x + 125, 100);
    gameOverButton.position(x + 170, 420);
    bestScoresLabel.position(x + 140, 220);
    bestScoresTable.position(x + 170, 270);
    scoreLabel.position(x + 440, 190);
    scoreVariable.position(x + 420, 220);
    levelLabel.position(x + 440, 250);
    levelVariable.position(x + 420, 280);
    gameOverText.position(x + 55, 170);
    scoreVariable.html(score);
    levelVariable.html(level);
    gameOverText.html('Your score was: ' + score + "<br>The maximum level you reached was: " + level);
    bestScoresTable.html('1 - ' + bestScores[0] + '<br>2 - ' + bestScores[1] + '<br>3 - ' + bestScores[2] + '<br>4 - ' + bestScores[3] + '<br>5 - ' + bestScores[4]);
    nextLevelLabel.position(x + 140, 100);
    nextLevelButton.position(x + 160, 200);
    endGameLabel.position(x + 100, 100);
    endGameText.position(x + 40, 170);
    endGameButton.position(x + 160, 250);
    if (windowSpace == 0) {
        pauseButton.show();
        settingsButton.show();
        scoreLabel.show();
        scoreVariable.show();
        levelLabel.show();
        levelVariable.show();
        canvas.style('opacity', '1');
        themeSelect.hide();
        dmSelector.hide();
        darkModeP.hide();
        themeLabel.hide();
        goBackButton.hide();
        settingsLabel.hide();
        pauseLabel.hide();
        controlMainLabel.hide();
        controlsLabel.hide();
        gameOverButton.hide();
        gameOverLabel.hide();
        gameOverText.hide();
        nextLevelButton.hide();
        nextLevelLabel.hide();
        endGameLabel.hide();
        endGameText.hide();
        endGameButton.hide();
        bestScoresLabel.hide();
        bestScoresTable.hide();
    }
    else if (windowSpace == 1) {
        pauseButton.hide();
        settingsButton.hide();
        canvas.style('opacity', '0.4');
        themeSelect.show();
        dmSelector.show();
        darkModeP.show();
        themeLabel.show();
        goBackButton.show();
        settingsLabel.show();
        pauseLabel.hide();
        controlMainLabel.hide();
        controlsLabel.hide();
        gameOverButton.hide();
        gameOverLabel.hide();
        scoreLabel.hide();
        scoreVariable.hide();
        levelLabel.hide();
        levelVariable.hide();
        gameOverText.hide();
        nextLevelButton.hide();
        nextLevelLabel.hide();
        endGameLabel.hide();
        endGameText.hide();
        endGameButton.hide();
        bestScoresLabel.hide();
        bestScoresTable.hide();
    }
    else if (windowSpace == 2) {
        pauseLabel.show();
        controlMainLabel.show();
        controlsLabel.show();
        canvas.style('opacity', '0.4');
        settingsButton.hide();
        themeSelect.hide();
        dmSelector.hide();
        darkModeP.hide();
        themeLabel.hide();
        goBackButton.hide();
        settingsLabel.hide();
        gameOverButton.hide();
        gameOverLabel.hide();
        scoreLabel.hide();
        scoreVariable.hide();
        levelLabel.hide();
        levelVariable.hide();
        gameOverText.hide();
        nextLevelButton.hide();
        nextLevelLabel.hide();
        endGameLabel.hide();
        endGameText.hide();
        endGameButton.hide();
        bestScoresLabel.hide();
        bestScoresTable.hide();
    }
    else if (windowSpace == 3) {
        gameOverButton.show();
        gameOverLabel.show();
        gameOverText.show();
        bestScoresLabel.show();
        bestScoresTable.show();
        canvas.style('opacity', '0.4');
        pauseButton.hide();
        settingsButton.hide();
        themeSelect.hide();
        dmSelector.hide();
        darkModeP.hide();
        themeLabel.hide();
        goBackButton.hide();
        settingsLabel.hide();
        scoreLabel.hide();
        scoreVariable.hide();
        levelLabel.hide();
        levelVariable.hide();
        nextLevelButton.hide();
        nextLevelLabel.hide();
        endGameLabel.hide();
        endGameText.hide();
        endGameButton.hide();
    }
    else if (windowSpace == 4) {
        nextLevelButton.show();
        nextLevelLabel.show();
        canvas.style('opacity', '0.4');
        pauseButton.hide();
        settingsButton.hide();
        themeSelect.hide();
        dmSelector.hide();
        darkModeP.hide();
        themeLabel.hide();
        goBackButton.hide();
        settingsLabel.hide();
        scoreLabel.hide();
        scoreVariable.hide();
        levelLabel.hide();
        levelVariable.hide();
        gameOverButton.hide();
        gameOverLabel.hide();
        gameOverText.hide();
        endGameLabel.hide();
        endGameText.hide();
        endGameButton.hide();
        bestScoresLabel.hide();
        bestScoresTable.hide();
    }
    else if (windowSpace == 5) {
        endGameLabel.show();
        endGameText.show();
        endGameButton.show();
        bestScoresLabel.show();
        bestScoresTable.show();
        canvas.style('opacity', '0.4');
        pauseButton.hide();
        settingsButton.hide();
        themeSelect.hide();
        dmSelector.hide();
        darkModeP.hide();
        themeLabel.hide();
        goBackButton.hide();
        settingsLabel.hide();
        scoreLabel.hide();
        scoreVariable.hide();
        levelLabel.hide();
        levelVariable.hide();
        gameOverButton.hide();
        gameOverLabel.hide();
        gameOverText.hide();
        nextLevelButton.hide();
        nextLevelLabel.hide();
    }
}

function togglePause() {
    if (windowSpace == 0 && !pause) {
        windowSpace = 2;
    }
    else if (windowSpace == 2) {
        windowSpace = 0;
    }
    pause = !pause;
}

function themeChanged() {
    if (themeSelect.value() == 0) {
        theme = 0;
    }
    else if (themeSelect.value() == 1) {
        theme = 1;
    }
    else if (themeSelect.value() == 2) {
        theme = 2;
    }
    else if (themeSelect.value() == 3) {
        theme = 3;
    }
    else {
        theme = 0;
    }
    for (let i = 0; i < snakeArray.length; i++) {
        snakeArray[i] = createQuadrille([getColor(colors, 1)]);
    }
    map = createQuadrille(colorArray(getMap(), getColor(colors, 2)));
    fruit = createQuadrille([getColor(colors, 3)]);
}

function darkModeInitialization() {
    if (prefersDarkMode) {
        darkMode = 1;
    }
    else {
        darkMode = 0;
    }
}

function darkModeChange() {
    let prefersDarkModeOld = prefersDarkMode;
    prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkModeOld != prefersDarkMode) {
        darkModeInitialization();
        dmSelector.hide();
        dmSelector = createCheckbox("", prefersDarkMode);
        dmSelector.changed(dmChange);
    }
}

function dmChange() {
    if (darkMode == 1) {
        darkMode = 0;
    }
    else if (darkMode == 0) {
        darkMode = 1;
    }
}

function darkModeApply() {
    if (darkMode == 0) {        // Modo claro
        document.body.style.backgroundColor = colors[2][0];
        // Cambiar el color de la letra a negro
        let x = document.getElementsByTagName("P");
        for (let i = 0; i < x.length; i++) {
            x[i].style.color = "black";
        }
        let y = document.getElementsByTagName("H1");
        for (let i = 0; i < y.length; i++) {
            y[i].style.color = "black";
        }
    }
    else if (darkMode == 1) {        // Modo oscuro
        document.body.style.backgroundColor = colors[2][3];
        // Cambiar el color de la letra a blanco
        let x = document.getElementsByTagName("P");
        for (let i = 0; i < x.length; i++) {
            x[i].style.color = "white";
        }
        let y = document.getElementsByTagName("H1");
        for (let i = 0; i < y.length; i++) {
            y[i].style.color = "white";
        }
    }
}

function goToSettings() {
    windowSpace = 1;
    pause = true;
}

function goToGame() {
    windowSpace = 0;
    pause = false;
}

function continueToGame() {
    pause = false;
    windowSpace = 0;
}

function organizeBestScores() {
    bestScores = bestScores.sort();
    bestScores = bestScores.reverse();
    for (let i = 0; i < 5; i++) {
        localStorage.setItem(i + 1, bestScores[i]);
    }
}

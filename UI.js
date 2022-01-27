function UIInitialization() {

    
    canvas = createCanvas(rows * length, columns * length);
    map = createQuadrille(colorArray(getMap(), getColor(colors, 2)));
    snakeArray[0] = createQuadrille([getColor(colors, 1)]);
    fruit = randomFruit();;


    pauseButton = createButton('Play/Pause Game');
    pauseButton.class('btn')
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
    gameOverLabel.class('gameOverLabel');
    gameOverButton = createButton('Retry');
    gameOverButton.class('btn');
    gameOverButton.mousePressed(gameOverRetry)

}

function UIUpdate() {
    darkModeChange();
    darkModeApply();
    let x = (windowWidth - width) / 2;
    canvas.position(x, 80)
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
    controlsLabel.position(x + 40, 170);
    footerLabel.position(x + 100, 480);
    gameOverLabel.position(x + 125, 100);
    gameOverButton.position(x + 170, 200);
    if (windowSpace == 0) {
        pauseButton.show();
        settingsButton.show();
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
    }
    else if (windowSpace == 3) {
        gameOverButton.show();
        gameOverLabel.show();
        canvas.style('opacity', '0.4');
        pauseButton.hide();
        settingsButton.hide();
        themeSelect.hide();
        dmSelector.hide();
        darkModeP.hide();
        themeLabel.hide();
        goBackButton.hide();
        settingsLabel.hide();

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
        darkMode = 1
    }
}

function darkModeApply() {
    if (darkMode == 0) {        // Modo claro
        document.body.style.backgroundColor = "white";
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
        document.body.style.backgroundColor = "black";
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
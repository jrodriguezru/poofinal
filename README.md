# Snake
Snake Final Project for POO 2021-2 UN

## What is it used?
In this project, we used the following:
- Javascript Language
- P5.js Library. (Information can be found at: www.p5js.org)
- P5.Quadrille.js Library (Information can be found at: https://objetos.github.io/p5.quadrille.js/)
- CSS and HTML

## What does it have?
The final project has only 1 html page.


Other files are used to make the game functional.

## What can you do in this page?
The main idea of the project was to build a functional snake game. (Based on the retro game that Nokia phones used to have).


However, we wanted to add a little something, so this game works with levels. Each level have a different map and to pass to the next level, the player has to collect 10 fruits multiplied by the level number.


For example:
- In level 1, the player needs to collect 10 fruits to pass to level 2.
- In level 2, the player needs to collect 20 fruits to pass to level 3.
Level 7 is the final level of this game, and to complete the game, the player needs to collect all 323 available fruits in the map.


We also added a High Scores section. This works storing and updating the score in the browser's cache and retriving it when the page is loaded. A basic verification of data integrity is done while loading. 


In addition to the game, we added a little customization to the game. The player can choose from 4 different color themes. Also, the page have dark/light mode compatibility (The selected mode in the Desktop is applied when the page is opened. And changes if the selected mode in the Desktop changes.)

## Where can I find the published version of the game?
The game is published at: https://jrodriguezru.github.io/poofinal/

## How to play? How does the page work?
The snake moves automatically, and the direction it moves is controlled using keys in the keyboard:
- W: Snake moves up.
- A: Snake moves left.
- S: Snake moves down.
- D: Snake moves right.

## How is score calculated?
It is really simple. Each fruit is worth 100 points.
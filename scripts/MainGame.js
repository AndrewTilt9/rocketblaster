BasicGame.Game = function (game) {};

//Graphical Object
var ship;
var ufos; //Group of Enemy UFOs which drop from the top of the screen
var lives; //Group of Lives which are collected

var bullets; //Bullets which your spaceship fires
var fireRate = 100; // Rate at which bullets are fired
var nextFire = 0;

//Score & Life Objects
var score; //Players Score
var lifeTotal; //Players total number of lives
var scoreText; //Text which is used to display the score
var lifeTotalText; //Text which is used to display the number of lives

//Audio Variables stores the audio in the game
var music;
var bulletAudio;
var explosionAudio;

//Timer Variables stores information about the timer
var seconds; //Number of seconds game has been running
var timer;
var timerText;

//Misc Variables
var cursors; //Keyboard control
var gameOverText; //Game Over message
var restartButton; //Restart game button
var gameOver;

BasicGame.Game.prototype = {

create: function () {
 //Specifying the physics game engine to ARCADE
 this.physics.startSystem(Phaser.Physics.ARCADE);
 //Adding the starfield, logo onto the screen
 this.starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');
 //Adding the ship onto the screen, set the physics and the boundarys
 ship = this.add.sprite((this.world.width / 2), this.world.height -50, 'ship');
 ship.anchor.setTo(0.5,0);
 this.physics.enable(ship, Phaser.Physics.ARCADE);
 ship.body.collideWorldBounds = true;
 
 //Creating Groups
 //Create the ufos group, set the physics and the boundarys
 ufos = this.add.group();
 this.physics.enable(ufos, Phaser.Physics.ARCADE);

 ufos.setAll('outOfBoundsKill', true);
 ufos.setAll('checkWorldBounds', true);
 ufos.setAll('anchor.x', 0.5);
 ufos.setAll('anchor.y', 0.5);

//Create the lives group, set the physics and the boundarys
 lives = this.add.group();
 this.physics.enable(lives, Phaser.Physics.ARCADE);

 lives.setAll('outOfBoundsKill', true);
 lives.setAll('checkWorldBounds', true);
 lives.setAll('anchor.x', 0.5);
 lives.setAll('anchor.y', 0.5);

 //Create the bullets group, set the physics, multiples and boundarys
 bullets = this.add.group();
 bullets.enableBody = true;
 bullets.physicsBodyType = Phaser.Physics.ARCADE;
 bullets.createMultiple(30, 'bullet', 0, false);
 bullets.setAll('anchor.x', 0.5);
 bullets.setAll('anchor.y', 0.5);
 bullets.setAll('outOfBoundsKill', true);
 bullets.setAll('checkWorldBounds', true);

 //Setting up and adding the Score, Life and Timer to the Screen
 scoreText = this.add.text(16, 16, 'Score: 0', {
 font: '32px arial',
 fill: '#fff'
});
 //sets the score to 0 and output to the screen
 score = 0;
 scoreText.text = "Score: " + score;

lifeTotalText = this.add.text(this.world.width - 150, 16, 'Lives:3', {
 font: '32px arial',
 fill: '#fff'
 });
 //sets the lifeTotal to 3 and output to the screen
 lifeTotal = 3;
 lifeTotalText.text = 'Lives: ' + lifeTotal;
 timerText = this.add.text(350, 16, 'Time: 0', {

font: '32px arial',
fill: '#fff'
});
//setup timer
 timer = this.time.create(false);
 seconds = 0;
 timerText.text = 'Time: ' + seconds;

 gameOverText = this.add.text(this.world.centerX, this.world.center Y-50, 'Game Over', {
font: '96px arial',
fill: '#fff',
align: 'center'
 });
gameOverText.anchor.set(0.5);
//hides the gameState text
gameOverText.visible = false;
gameOver = false;

//Create a restart button and hide on screen
restartButton = this.add.button((this.world.width / 2),(this.world.height / 2)+50, 'startButton', this.restartGame);
restartButton.anchor.set(0.5);
restartButton.visible = false;

//Setting the keyboard to accept LEFT, RIGHT and SPACE input
this.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
cursors = this.input.keyboard.createCursorKeys();

//Load the audio into memory, starting music
bulletAudio = this.add.audio('bullet');
explosionAudio = this.add.audio('explosion');
music = this.add.audio('music', 1, true);
music.play('', 0, 1, true);

//Set a TimerEvent to occur every second and start the timer
timer.loop(1000, this.updateTimer, this);
timer.start();
 },
update: function () {
//Scroll the background
this.starfield.tilePosition.y += 2;
 //if lifeTotal is less than 1 or seconds = 60 or gameOver variable
= true then execute 'truegameOver' function
if (lifeTotal < 1 || seconds == 60 || gameOver===true) {

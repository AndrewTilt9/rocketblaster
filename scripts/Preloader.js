var BasicGame = {};
 BasicGame.Preloader = function (game) {
 this.ready = false;
 };
 BasicGame.Preloader.prototype = {
 preload: function () {
 //Displays a loadng screen message while the assets are loaded into
menory
 this.preloaderText = this.add.text(this.world.centerX, this.world.c
enterY, 'Loading...', {
 fontSize: '96px',
 fill: '#fff',
 align: 'center'
 });
 this.preloaderText.anchor.setTo(0.5, 0.5);
 //preload the images, sprites and audio assets into memory
 this.load.image('logo', 'assets/PhaserLogo.png');
 this.load.image('starfield', 'assets/starfield.png');
 this.load.image('startButton', 'assets/startButton.png');
 this.load.image('ship', 'assets/ship.png');
 },
 create: function () {
 },
 update: function () {


var titleMusic;
var mainMusic;
var bossMusic;
var victoryMusic;

var laser;
var explosion;

function startMain () {
  demoMode = false;
  titleMusic.stop();
  this.scene.start('MainScene');
  mainMusic.play();
  normalMode = true;
}

function startBoss () {
  normalMode = false;
  mainMusic.stop();
  this.scene.start('BossScene');
  bossMusic.play();
  bossMode = true;
}

function startTitle () {
  bossMode = false;
  bossMusic.stop();
  this.scene.start('TitleScene');
  titleMusic.play();
  demoMode = true;
}

class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('PreloaderScene');
  }

  preload () {
    this.load.plugin('rextexttypingplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttypingplugin.min.js', true);

    this.load.audio('titlemusic', 'static/assets/sounds/title.wav');
    this.load.audio('mainmusic', 'static/assets/sounds/level.wav');
    this.load.audio('bossmusic', 'static/assets/sounds/boss.wav');
    this.load.audio('victorymusic', 'static/assets/sounds/victory.wav');

    this.load.audio('explosionsfx', 'static/assets/sounds/explosion.wav');
    this.load.audio('lasersfx', 'static/assets/sounds/laser.wav');

    this.load.image('bossbody', 'static/assets/images/boss/bossbody.png');
    this.load.image('bossleftwing', 'static/assets/images/boss/bossleftwing.png');
    this.load.image('bossrightwing', 'static/assets/images/boss/bossrightwing.png');
    this.load.image('bossleftlaser', 'static/assets/images/boss/bossleftlaser.png');
    this.load.image('bossrightlaser', 'static/assets/images/boss/bossrightlaser.png');
    this.load.image('bossweakspot', 'static/assets/images/boss/bossweakspot.png');
    this.load.image('bossgun', 'static/assets/images/boss/bossgun.png');

    this.load.image('goodshot', 'static/assets/images/goodshot.png');
    this.load.image('badshot', 'static/assets/images/badshot.png');

    this.load.image('blast1', 'static/assets/images/blast1.png');
    this.load.image('blast2', 'static/assets/images/blast2.png');
    this.load.image('blast3', 'static/assets/images/blast3.png');
    this.load.image('blast4', 'static/assets/images/blast4.png');
    this.load.image('blast5', 'static/assets/images/blast5.png');
    this.load.image('blast6', 'static/assets/images/blast6.png');

    this.load.image('sky', 'static/assets/images/starbgv.png');

    this.load.image('player1', 'static/assets/images/blueship.png');
    this.load.image('player2', 'static/assets/images/blueship2.png');
    this.load.image('player3', 'static/assets/images/orangeship.png');

    this.load.image('enemy1', 'static/assets/images/orangeship.png');
    this.load.image('enemy2', 'static/assets/images/orangeship2.png');
    this.load.image('enemy3', 'static/assets/images/orangeship3.png');
    this.load.image('enemy4', 'static/assets/images/orangeship4.png');
    this.load.image('enemy5', 'static/assets/images/orangeship5.png');

    this.load.image('cutealien', 'static/assets/images/characters/cute_alien_small.png');
    this.load.image('chris', 'static/assets/images/characters/Christiansmall.png');
    this.load.image('faiz', 'static/assets/images/characters/Faizansmall.png');
    this.load.image('will', 'static/assets/images/characters/Williamsmall.png');

    this.load.image('title', 'static/assets/images/RocketTitle.png');
    this.load.image('victory', 'static/assets/images/VICTORY.png');

    this.load.image('null', 'static/assets/images/null.png');
  }

  create () {
    titleMusic = this.sound.add('titlemusic', { volume: 0.3, loop: true });
    mainMusic = this.sound.add('mainmusic', { volume: 0.3, loop: true });
    bossMusic = this.sound.add('bossmusic', { volume: 0.3, loop: true });
    victoryMusic = this.sound.add('victorymusic', { volume: 0.3, loop: true });
    titleMusic.play();

    laser = this.sound.add('lasersfx', { volume: 0.3, loop: false });
    explosion = this.sound.add('explosionsfx', { volume: 0.3, loop: false });
    this.scene.launch('TitleScene');
  }
}

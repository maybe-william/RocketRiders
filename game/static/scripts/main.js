// how you configure your game - many options
/*var config = {
    // Phaser.CANVAS || Phaser.WEBGL || Phaser.AUTO
        type: Phaser.AUTO,

    // width and height set the size of the canvas element
        width: 800,
        height: 600,

    // -- explained later
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var ships = [];
var texty;
var cursors;
// configuration is passed into the Game obj this will start the process of bring the game to life
var game = new Phaser.Game(config);
// load assets by using the scene function preload. phaser will automatically look for this function when it starts and load anything defined within it.
function preload ()
{
    this.load.image('sky', 'assets/download.png');
    this.load.image('player1', 'static/assets/images/whiteship.png');
    this.load.image('player2', 'static/assets/images/greenship.png');
    this.load.image('player3', 'static/assets/images/orangeship.png');
}

function create ()
{
    this.add.image(400, 300, 'sky');

    let ship = this.physics.add.sprite(100, 450, 'player1');
    ship.setBounce(0.2);
    ship.setCollideWorldBounds(true);
    ships.push(ship)


    ship = this.physics.add.sprite(200, 500, 'player2');
    ship.setBounce(0.2);
    ship.setCollideWorldBounds(true);
    ships.push(ship)

    ship = this.physics.add.sprite(400, 200, 'player3');
    ship.setBounce(0.2);
    ship.setCollideWorldBounds(true);
    ships.push(ship)

    texty = this.add.text(440, 40, "SCORE: 0", {fontSize: '32px', fill: '#fff'});
    ships[0] = new Ship(ships[0], 100, 450, 1, 0);
    ships[1] = new Ship(ships[1], 200, 500, 1, 0);
    ships[2] = new Ship(ships[2], 400, 200, 1, 0);
}

function update ()
{
    let i = 0;
    let cursors = this.input.keyboard.createCursorKeys();
    let kb = this.input.keyboard
    let left, right, up, down = false
    if (cursors.left.isDown) {
        left = true;
    } else if (cursors.right.isDown) {
        right = true;
    }

    if (cursors.down.isDown) {
        down = true
    } else if (cursors.up.isDown) {
        up = true
    }
    ships[0].update(false, false, up, down, right, left, false, false);

    let w = this.input.keyboard.addKey('W');
    let a = this.input.keyboard.addKey('A');
    let s = this.input.keyboard.addKey('S');
    let d = this.input.keyboard.addKey('D');

    left = false;
    right = false;
    up = false;
    down = false;
    if (a.isDown) {
        left = true;
    } else if (d.isDown) {
        right = true;
    }

    if (s.isDown) {
        down = true
    } else if (w.isDown) {
        up = true
    }
    ships[1].update(false, false, up, down, right, left, false, false);
}

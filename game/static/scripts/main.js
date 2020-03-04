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



function bounce(obj1, obj2) {
    //get the object angle for bounce and then reflect.
    ang = get_angle(obj1, obj2);
}





var ships = [];
var cursors;
// configuration is passed into the Game obj this will start the process of bring the game to life
var game = new Phaser.Game(config);
// load assets by using the scene function preload. phaser will automatically look for this function when it starts and load anything defined within it.
var sky;
function preload ()
{
    this.load.image('sky', 'static/assets/images/starbg.png');
    this.load.image('player1', 'static/assets/images/whiteship.png');
    this.load.image('player2', 'static/assets/images/greenship.png');
    this.load.image('player3', 'static/assets/images/orangeship.png');
    this.load.atlas('shapes', 'static/assets/images/shapes.png', 'static/assets/images/shapes.json');
    this.load.text('space_dirt', 'static/assets/images/space_dirt.json');
}

function create ()
{
    sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
    dirt1 = this.add.particles('shapes',  new Function('return ' + this.cache.text.get('space_dirt'))());

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

    ships[0] = new Ship(ships[0], 100, 450, 1, 0);
    ships[1] = new Ship(ships[1], 200, 500, 1, 0);
    ships[2] = new Ship(ships[2], 400, 200, 1, 0);
}

function update ()
{
    sky.tilePositionX = sky.tilePositionX + 1;

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

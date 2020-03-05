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
            debug: true
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

    function shipCollide(ship1, ship2) {
        console.log('collision')
        let x1 = ship1.body.position.x;
        let x2 = ship2.body.position.x;
        let y1 = ship1.body.position.y;
        let y2 = ship2.body.position.y;
        let mirror = new Phaser.Line(x1, y1, x2, y2);

        let xvel1 = ship1.body.velocity.x;
        let yvel1 = ship1.body.velocity.y;
        let line1 = new Phaser.Line(x1 - xvel1, y1 - yvel1, x1, y1);

        let xvel2 = ship2.body.velocity.x;
        let yvel2 = ship2.body.velocity.y;
        let line2 = new Phaser.Line(x2 - xvel2, y2 - yvel2, x2, y2);

        let refl1 = line1.reflect(mirror);
        let xrefl1 = refl1.end.x - x1;
        let yrefl1 = refl1.end.y - y1;

        let refl2 = line2.reflect(mirror);
        let xrefl2 = refl2.end.x - x2;
        let yrefl2 = refl2.end.y - y2;

        ship1.setVelocityX(xrefl1);
        ship1.setVelocityY(yrefl1);

        ship2.setVelocityX(xrefl2);
        ship2.setVelocityY(yrefl2);
    }

    this.physics.add.collider(ships[0], ships[1], shipCollide, null, this);
    this.physics.add.collider(ships[1], ships[2], shipCollide, null, this);
    this.physics.add.collider(ships[0], ships[2], shipCollide, null, this);

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

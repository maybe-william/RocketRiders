
var ships = [];
var enemies = [];
var cursors;
var sky;
var dirt1;

var goodshots = [];
var goodshotsactive = [];
var badshots = [];
var badshotsactive = [];

var normal_mode = true;

var textbox

function makeShot (shipobj) {
    let shots = badshots
    let activeshots = badshotsactive
    if (shipobj.texture.key === 'player1' || shipobj.texture.key === 'player2') {
        shots = goodshots
        activeshots = goodshotsactive
    }
    let shot = shots.pop();
    shot.setPosition(150, 150);
    activeshots.push(shot);
}


class MainScene extends Phaser.Scene {
    constructor () {
        super({key: 'Main'});
    }

    preload ()
    {
        this.load.plugin('rextexttypingplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttypingplugin.min.js', true);
        console.log('this')
        this.load.image('sky', 'static/assets/images/starbg.png');
        this.load.image('player1', 'static/assets/images/whiteship.png');
        this.load.image('player2', 'static/assets/images/greenship.png');
        this.load.image('player3', 'static/assets/images/orangeship.png');
        this.load.atlas('shapes', 'static/assets/images/shapes.png', 'static/assets/images/shapes.json');
        this.load.text('space_dirt', 'static/assets/images/space_dirt.json');
        this.load.image('goodshot', 'static/assets/images/goodshot.png');
        this.load.image('badshot', 'static/assets/images/badshot.png');
    }

    bulletHit(ship, shot) {
        console.log('here')
        if (shot.texture.key === 'goodshot') {
            goodshotsactive = goodshotsactive.filter((item, ind) => (item !== shot));
            goodshots.push(shot);
        } else {
            badshotsactive = badshotsactive.filter((item, ind) => (item !== shot));
            badshots.push(shot);
        }
        shot.setPosition(-100, -100);
        shot.setActive = false;
        shot.setVisible = false;
        ship.setPosition(-200, -200);
    }

    create ()
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

        ships[0] = new Ship(ships[0], 100, 450, 1, 0);
        ships[1] = new Ship(ships[1], 200, 500, 1, 0);


        this.physics.add.collider(ships[0].ph, ships[1].ph, null, null, this);
        this.physics.add.collider(ships[1].ph, ships[0].ph, null, null, this);

        // keep 200 good-guy shots
        let i = 200
        while (i > 0) {
            let shot = this.physics.add.sprite(-100, -100, 'goodshot');
            shot.setVisible = false;
            shot.setActive = false;
            goodshots.push(shot);
            i = i-1;
        }

        // keep 200 bad-guy shots
        i = 200
        while (i > 0) {
            let shot = this.physics.add.sprite(-100, -100, 'badshot');
            this.physics.add.collider(ships[0], shot, this.bulletHit, null, this);
            this.physics.add.collider(ships[1], shot, this.bulletHit, null, this);
            shot.setVisible = false;
            shot.setActive = false;
            badshots.push(shot);
            i = i-1;
        }




        //enemy spawn timer
        this.time.addEvent({
            delay: 1000,
            callback: function() {
                if (normal_mode) {
                    let ship = this.physics.add.sprite(900, Phaser.Math.Between(0, 600), 'player3');
                    ship.setBounce(0.6);
                    let enemy = new Ship(ship, 900, ship.body.position.y, 1, -90);
                    this.physics.add.collider(ships[0].ph, ship, null, null, this);
                    this.physics.add.collider(ships[1].ph, ship, null, null, this);
                    for (let shot of goodshots) {
                        this.physics.add.collider(ship, shot, this.bulletHit, null, this);
                    }
                    for (let shot of goodshotsactive) {
                        this.physics.add.collider(ship, shot, this.bulletHit, null, this);
                    }
                    for (let fellow of enemies) {
                        this.physics.add.collider(ship, fellow.ph, null, null, this);
                    }
                    enemies.push(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });
        textbox = this.make.text({
            x: 0,
            y: 400,
            padding: {
                left: 64,
                right: 16,
                top: 20,
                bottom: 40,
                x: 32,    // 32px padding on the left/right
                y: 16     // 16px padding on the top/bottom
            },
            text: 'Text\nGame Object\nCreated from config',
            
            style: {
                fontSize: '32px',
                fontFamily: 'Oxanum',
                color: '#ffffff',
                align: 'left',  // 'left'|'center'|'right'|'justify'
                backgroundColor: '#fffff',
                wordWrap: {
                    width: 780,
                    useAdvancedWrap: true,
                },
                fixedWidth: 5000,
                fixedHeight: 500
            },
            add: true
        });
        textbox.setDepth(99999);
        textbox = this.plugins.get('rextexttypingplugin').add(textbox, {
        })
        textbox.start("Come on baby, don't fear the reaper\
        Baby take my hand, don't fear the reaper\
        We'll be able to fly, don't fear the reaper\
        Baby I'm your man", 10);
        
        //textbox = this.plugins.get('rextexttypingplugin').add(new Text(this, 200, 200, content, null), {
        //                 wrapWidth: 500,
        //             })
    }
    update ()
    {
        // move sky
        sky.tilePositionX = sky.tilePositionX + 1;

        // get the movement for ship1
        let cursors = this.input.keyboard.createCursorKeys();
        let kb = this.input.keyboard
        let left, right, up, down = false
        let fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown;
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
        ships[0].update(fire, false, up, down, right, left, false, false);
        // get the movement for ship2
        let w = this.input.keyboard.addKey('W');
        let a = this.input.keyboard.addKey('A');
        let s = this.input.keyboard.addKey('S');
        let d = this.input.keyboard.addKey('D');

        left = false;
        right = false;
        up = false;
        down = false;
        fire = false;
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
        ships[1].update(fire, false, up, down, right, left, false, false);

        // move offscreen enemies onscreen and delete enemies after exit.
        for (let enemy of enemies) {
            up = false;
            down = false;
            right = false;
            left = false;
            fire = false;
            if (enemy.ph.body.position.x > 450) {
                up = true;
            }
            enemy.update(false, false, up, down, right, left, false, false);
        }
        let destroyable = enemies.filter((item, ind, arr) => (item.ph.body.position.x < -100));
        enemies = enemies.filter((item, ind, arr) => (item.ph.body.position.x >= -100));
        destroyable.map((item) => (item.ph.destroy()));
    }
    textbox.emit('complete');
}

// set the game config
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
    plugins: {
        global: [{
            key: 'rextexttypingplugin',
            start: true
        }
            // ...
        ]
    },
    scene: [MainScene]
};

// start the game
var game = new Phaser.Game(config);


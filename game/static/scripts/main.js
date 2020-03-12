var p1score = 0;
var p1scoreText;
var p2score = 0;
var p2scoreText;

var ships = [];
var enemies = [];
var blasts;
var cursors;
var sky;
var dirt1;

var spaceheld = false;
var shiftpressed = 0;

var two_player = false;
var zeroheld = false;
var enterpressed = 0;

var goodshots;
var badshots;

var normal_mode = true;

var sin = Math.sin;
var cos = Math.cos;
var pi = Math.PI;
var pmath = Phaser.Math;

function offscreen(x, y) {
    if (x < -200 || y < -200 || x > 1000 || y > 800) {
        return true;
    }
    return false;
}

class MainScene extends Phaser.Scene {




    bulletHit (ship, shot) {
        let blast = blasts.get(shot.body.position.x, shot.body.position.y);
        blast.setActive(true);
        blast.setVisible(true);
        blast.play('blast');
        shot.setPosition(-100, -100);
        shot.setVelocity(0,0);
        shot.setActive(false);
        shot.setVisible(false);

        ship.setPosition(-200, 0);
        ship.setVelocity(0, 0);
        ship.setActive(false);
        ship.setVisible(false);

        setTimeout(function () {
            blast.setActive(false);
            blast.setVisible(false);
            blast.setPosition(-100, -100);
        }, 1000);

        if (ship.texture.key === 'player1' || (ship.texture.key === 'player2' && two_player)) {
            setTimeout(function () {
                ship.setActive(true);
                ship.setVisible(true);
                ship.setPosition(pmath.Between(200, 600), pmath.Between(200, 400));
                ship.setVelocity(0, 0);
            }, 1000);
        } else if (ship.texture.key !== 'player2') {
            if (ship.body.position.x > -20 && ship.body.position.x < 820) {
                if (ship.body.position.y > -20 && ship.body.position.y < 620) {
                    if (shot.shooter === 'player1') {
                        p1score = p1score + 10;
                        p1scoreText.setText('P1 Score: ' + p1score.toString());
                    }
                    if (shot.shooter === 'player2') {
                        p2score = p2score + 10;
                        p2scoreText.setText('P2 Score: ' + p2score.toString());
                    }
                }
            }
        }
    }

    constructor ()
    {
        super('MainScene');
    }


    preload ()
    {

        this.load.image('sky', 'static/assets/images/starbgv.png');
        this.load.image('player1', 'static/assets/images/blueship.png');
        this.load.image('player2', 'static/assets/images/greenship2.png');
        this.load.image('player3', 'static/assets/images/orangeship.png');
        this.load.atlas('shapes', 'static/assets/images/shapes.png', 'static/assets/images/shapes.json');
        this.load.text('space_dirt', 'static/assets/images/space_dirt.json');
        this.load.image('goodshot', 'static/assets/images/goodshot.png');
        this.load.image('badshot', 'static/assets/images/badshot.png');
        this.load.image('blast1', 'static/assets/images/blast1.png');
        this.load.image('blast2', 'static/assets/images/blast2.png');
        this.load.image('blast3', 'static/assets/images/blast3.png');
        this.load.image('blast4', 'static/assets/images/blast4.png');
        this.load.image('blast5', 'static/assets/images/blast5.png');
        this.load.image('blast6', 'static/assets/images/blast6.png');

        this.load.image('null', 'static/assets/images/null.png');
    }



    create ()
    {
        sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
        sky.setDepth(-999);

        p1scoreText = this.add.text(16, 16, 'P1 Score: ' + p1score.toString(), { fontSize: '32px', fill: '#a66f3c' });
        p2scoreText = this.add.text(400, 16, 'P2 Score: ' + p1score.toString(), { fontSize: '32px', fill: '#a66f3c' });
        //dirt1 = this.add.particles('shapes',  new Function('return ' + this.cache.text.get('space_dirt'))());
        //dirt1.setDepth(-999);

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
        ships[1].ph.setActive(false);
        ships[1].ph.setVisible(false);

        this.anims.create({
            key: 'blast',
            frames: [
                { key: 'blast1' },
                { key: 'blast2' },
                { key: 'blast3' },
                { key: 'blast4' },
                { key: 'blast5' },
                { key: 'blast6' },
                { key: 'null' },
            ]
        })

        blasts = this.physics.add.group({
            defaultKey: 'blast1',
            maxSize: 200
        })

        goodshots = this.physics.add.group({
            defaultKey: 'goodshot',
            maxSize: 200
        });

        badshots = this.physics.add.group({
            defaultKey: 'badshot',
            maxSize: 200
        });

        this.physics.add.collider(ships[0].ph, ships[1].ph, null, null, this);
        this.physics.add.collider(ships[1].ph, ships[0].ph, null, null, this);
        this.physics.add.collider(ships[0].ph, badshots, this.bulletHit, null, this);
        this.physics.add.collider(ships[1].ph, badshots, this.bulletHit, null, this);

        //enemy spawn timer
        this.time.addEvent({
            delay: 1000,
            callback: function() {
                if (normal_mode) {
                    let ship = this.physics.add.sprite(pmath.Between(0, 800), -100, 'player3');
                    ship.setBounce(0.6);
                    let enemy = new Ship(ship, 900, ship.body.position.y, 1, 180);
                    this.physics.add.collider(ships[0].ph, ship, null, null, this);
                    this.physics.add.collider(ships[1].ph, ship, null, null, this);
                    this.physics.add.collider(ship, goodshots, this.bulletHit, null, this);
                    for (let fellow of enemies) {
                        this.physics.add.collider(ship, fellow.ph, null, null, this);
                    }
                    enemy.createTime = Date.now();
                    enemy.nonceTime = pmath.Between(0, 6000);
                    //enemy.update = ai1;
                    //enemy.update = ai2;
                    enemy.targetShip = ships[Math.floor(Math.random() * 2)];
                    enemy.ptx = pmath.Between(100, 700);
                    enemy.pty = pmath.Between(100, 500);
                    //enemy.update = ai3;
                    enemy.update = ai4;
                    enemies.push(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });

    }




    update ()
    {
        // move sky
        sky.tilePositionY = sky.tilePositionY - 1;

        // get the movement for ship1
        const kb = this.input.keyboard;
        let four = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR).isDown;
        let six = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX).isDown;
        let eight = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT).isDown;
        let five = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE).isDown;
        let fire =  kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO).isDown;
        let spec =  kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown;
        if (!two_player && spec) {
            ships[1].ph.setActive(true);
            ships[1].ph.setVisible(true);
            ships[1].ph.setPosition(210, 300);
            ships[1].ph.setVelocity(0, 0);
            two_player = true;
            enterpressed = Date.now();
            spec = false;
        }
        if (!fire) {
            zeroheld = false;
        }
        fire = fire && !zeroheld; //only fire on the first press

        if (Date.now() - enterpressed < 6000) {
            spec = false; //only allow shift every 6 seconds
        }
        if (spec) {
            enterpressed = Date.now();
        }

        if (two_player) {
            ships[1].update(fire, spec, eight, five, six, four);
        }

        if (fire) {
            zeroheld = true;
        }

        // get the movement for ship2
        let w = kb.addKey('W').isDown;
        let a = kb.addKey('A').isDown;
        let s = kb.addKey('S').isDown;
        let d = kb.addKey('D').isDown;

        fire = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown;
        spec = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT).isDown;

        if (!fire) {
            spaceheld = false;
        }
        fire = fire && !spaceheld; //only fire on the first press

        if (Date.now() - shiftpressed < 6000) {
            spec = false; //only allow shift every 6 seconds
        }
        if (spec) {
            shiftpressed = Date.now();
        }

        ships[0].update(fire, spec, w, s, d, a);
        if (fire) {
            spaceheld = true;
        }


        // move offscreen enemies onscreen and delete enemies after exit.
        for (let enemy of enemies) {
            let up = false;
            let down = false;
            let right = false;
            let left = false;
            fire = false;
            //if (enemy.ph.body.position.x > 450) {
            //up = true;
            //}
            enemy.update(false, false, up, down, right, left, false, false);
        }
        let destroyable = enemies.filter((item, ind, arr) => (offscreen(item.ph.body.position.x, item.ph.body.position.y)));
        enemies = enemies.filter((item, ind, arr) => (!offscreen(item.ph.body.position.x, item.ph.body.position.y)));
        destroyable.map((item) => (item.ph.destroy()));

        //destroy bullets out of range
        goodshots.children.each(function (shot) {
            if (shot.active) {
                if (offscreen(shot.x, shot.y)) {
                    shot.setActive(false);
                    shot.setVisible(false);
                }
            }
        }.bind(this));

        //destroy bullets out of range
        badshots.children.each(function (shot) {
            if (shot.active) {
                if (offscreen(shot.x, shot.y)) {
                    shot.setActive(false);
                    shot.setVisible(false);
                }
            }
        }.bind(this));

    }
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
    scene: [TitleScene, MainScene]
};

// start the game
var game = new Phaser.Game(config);


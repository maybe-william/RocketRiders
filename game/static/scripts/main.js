var p1score = 0;
var p1scoreText;
var p2score = 0;
var p2scoreText;

var ships = [];
var enemies = [];
var enemies1;
var enemies2;
var enemies3;
var enemies4;
var enemies5;
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

var textbox;

var normal_mode = false;
var enemy1_mode = false;
var enemy2_mode = false;
var enemy3_mode = false;
var enemy4_mode = false;
var enemy5_mode = false;
var boss_mode = false;

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

function spawnEnemy1(x, y) {
    if (enemy1_mode) {
        let ship = enemies1.get(x, y);
        ship.setBounce(0.6);
        ship.setAngle(180)
        ship.setRotation(pi)
        if (ship.casing === undefined) { //if full ship objectnot created already
            let enemy = new Ship(ship, x, y, 1, 0);
            enemy.update = ai1;
            ship.casing = enemy; //just to keep track of having been created already
        }
        ship.setActive(true);
        ship.setVisible(true);
        ship.casing.createTime = Date.now();
        ship.casing.nonceTime = pmath.Between(0, 6000);
    }
}

function spawnEnemy2(x, y) {
    if (enemy2_mode) {
        let ship = enemies2.get(x, y);
        ship.setBounce(0.6);
        ship.setAngle(180)
        ship.setRotation(pi)
        if (ship.casing === undefined) { //if full ship object not created already
            let enemy = new Ship(ship, x, y, 1, 0);
            enemy.update = ai2;
            ship.casing = enemy; //just to keep track of the object wrapper
        }
        ship.setActive(true);
        ship.setVisible(true);
        ship.casing.createTime = Date.now();
        ship.casing.nonceTime = pmath.Between(0, 6000);
        ship.casing.targetShip = ships[Math.floor(Math.random() * 2)];
        //ship.casing.ptx = pmath.Between(100, 700);
        //ship.casing.pty = pmath.Between(100, 500);
    }
}

function spawnEnemy3(x, y) {
    if (enemy3_mode) {
        let ship = enemies3.get(x, y);
        ship.setBounce(0.6);
        ship.setAngle(180)
        ship.setRotation(pi)
        if (ship.casing === undefined) { //if full ship object not created already
            let enemy = new Ship(ship, x, y, 1, 0);
            enemy.update = ai3;
            ship.casing = enemy; //just to keep track of the object wrapper
        }
        ship.setActive(true);
        ship.setVisible(true);
        ship.casing.createTime = Date.now();
        ship.casing.nonceTime = pmath.Between(0, 6000);
        ship.casing.targetShip = ships[Math.floor(Math.random() * 2)];
        ship.casing.ptx = pmath.Between(100, 700);
        ship.casing.pty = pmath.Between(100, 500);
    }
}

function spawnEnemy4(x, y) {
    if (enemy4_mode) {
        let ship = enemies4.get(x, y);
        ship.setBounce(0.6);
        ship.setAngle(180)
        ship.setRotation(pi)
        if (ship.casing === undefined) { //if full ship object not created already
            let enemy = new Ship(ship, x, y, 1, 0);
            enemy.update = ai4;
            ship.casing = enemy; //just to keep track of the object wrapper
        }
        ship.setActive(true);
        ship.setVisible(true);
        ship.casing.createTime = Date.now();
        ship.casing.nonceTime = pmath.Between(0, 6000);
        ship.casing.targetShip = ships[Math.floor(Math.random() * 2)];
        ship.casing.ptx = pmath.Between(100, 700);
        ship.casing.pty = pmath.Between(100, 500);
    }
}

function spawnEnemy5(x, y) {
    if (enemy5_mode) {
        let ship = enemies5.get(x, y);
        ship.setBounce(0.6);
        ship.setAngle(180)
        ship.setRotation(pi)
        if (ship.casing === undefined) { //if full ship object not created already
            let enemy = new Ship(ship, x, y, 1, 0);
            enemy.update = ai5;
            ship.casing = enemy; //just to keep track of the object wrapper
        }
        ship.setActive(true);
        ship.setVisible(true);
        ship.casing.createTime = Date.now();
        ship.casing.nonceTime = pmath.Between(0, 6000);
        ship.casing.targetShip = ships[Math.floor(Math.random() * 2)];
        ship.casing.ptx = pmath.Between(100, 700);
        ship.casing.pty = pmath.Between(100, 500);
    }
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
        this.load.plugin('rextexttypingplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttypingplugin.min.js', true);
        this.load.image('sky', 'static/assets/images/starbgv.png');
        this.load.image('player1', 'static/assets/images/blueship.png');
        this.load.image('player2', 'static/assets/images/greenship2.png');
        this.load.image('enemy1', 'static/assets/images/orangeship.png');
        this.load.image('enemy2', 'static/assets/images/orangeship2.png');
        this.load.image('enemy3', 'static/assets/images/orangeship3.png');
        this.load.image('enemy4', 'static/assets/images/orangeship4.png');
        this.load.image('enemy5', 'static/assets/images/orangeship5.png');
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

        textbox = this.make.text({
            x: 0,
            y: 400,
            padding: {
                left: 64,
                right: 64,
                top: 20,
                bottom: 40,
                x: 32,    // 32px padding on the left/right
                y: 16     // 16px padding on the top/bottom
            },
            text: '',
            style: {
                fontSize: '32px',
                fontFamily: 'Oxanum',
                color: '#ffffff',
                align: 'left',  // 'left'|'center'|'right'|'justify'
                //backgroundColor: '#fffff',
                wordWrap: {
                    width: 750,
                    useAdvancedWrap: true,
                },
                fixedWidth: 800,
                fixedHeight: 500
            },
            add: true
        });
        textbox.setDepth(99999);
        textbox = this.plugins.get('rextexttypingplugin').add(textbox, {
        })

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

        enemies1 = this.physics.add.group({
            defaultKey: 'enemy1',
            maxSize: 100
        });
        enemies2 = this.physics.add.group({
            defaultKey: 'enemy2',
            maxSize: 100
        });
        enemies3 = this.physics.add.group({
            defaultKey: 'enemy3',
            maxSize: 100
        });
        enemies4 = this.physics.add.group({
            defaultKey: 'enemy4',
            maxSize: 100
        });
        enemies5 = this.physics.add.group({
            defaultKey: 'enemy5',
            maxSize: 100
        });


        this.physics.add.collider(ships[0].ph, ships[1].ph, null, null, this);
        this.physics.add.collider(ships[1].ph, ships[0].ph, null, null, this);
        this.physics.add.collider(ships[0].ph, badshots, this.bulletHit, null, this);
        this.physics.add.collider(ships[1].ph, badshots, this.bulletHit, null, this);

        this.physics.add.collider(ships[0].ph, enemies1, null, null, this);
        this.physics.add.collider(ships[1].ph, enemies1, null, null, this);
        this.physics.add.collider(enemies1, goodshots, this.bulletHit, null, this);
        this.physics.add.collider(enemies1, enemies1, null, null, this);

        this.physics.add.collider(ships[0].ph, enemies2, null, null, this);
        this.physics.add.collider(ships[1].ph, enemies2, null, null, this);
        this.physics.add.collider(enemies2, goodshots, this.bulletHit, null, this);
        this.physics.add.collider(enemies2, enemies2, null, null, this);

        this.physics.add.collider(ships[0].ph, enemies3, this.bulletHit, null, this);
        this.physics.add.collider(ships[1].ph, enemies3, this.bulletHit, null, this);
        this.physics.add.collider(enemies3, goodshots, this.bulletHit, null, this);
        this.physics.add.collider(enemies3, enemies3, null, null, this);

        this.physics.add.collider(ships[0].ph, enemies4, null, null, this);
        this.physics.add.collider(ships[1].ph, enemies4, null, null, this);
        this.physics.add.collider(enemies4, goodshots, this.bulletHit, null, this);
        this.physics.add.collider(enemies4, enemies4, null, null, this);

        this.physics.add.collider(ships[0].ph, enemies5, null, null, this);
        this.physics.add.collider(ships[1].ph, enemies5, null, null, this);
        this.physics.add.collider(enemies5, goodshots, this.bulletHit, null, this);
        this.physics.add.collider(enemies5, enemies5, null, null, this);


        this.physics.add.collider(enemies1, enemies2, null, null, this);
        this.physics.add.collider(enemies1, enemies3, null, null, this);
        this.physics.add.collider(enemies1, enemies4, null, null, this);
        this.physics.add.collider(enemies1, enemies5, null, null, this);

        this.physics.add.collider(enemies2, enemies1, null, null, this);
        this.physics.add.collider(enemies2, enemies3, null, null, this);
        this.physics.add.collider(enemies2, enemies4, null, null, this);
        this.physics.add.collider(enemies2, enemies5, null, null, this);

        this.physics.add.collider(enemies3, enemies1, null, null, this);
        this.physics.add.collider(enemies3, enemies2, null, null, this);
        this.physics.add.collider(enemies3, enemies4, null, null, this);
        this.physics.add.collider(enemies3, enemies5, null, null, this);

        this.physics.add.collider(enemies4, enemies1, null, null, this);
        this.physics.add.collider(enemies4, enemies2, null, null, this);
        this.physics.add.collider(enemies4, enemies3, null, null, this);
        this.physics.add.collider(enemies4, enemies5, null, null, this);

        this.physics.add.collider(enemies5, enemies1, null, null, this);
        this.physics.add.collider(enemies5, enemies2, null, null, this);
        this.physics.add.collider(enemies5, enemies3, null, null, this);
        this.physics.add.collider(enemies5, enemies4, null, null, this);


        //enemy spawn timer
        this.time.addEvent({
            delay: 1000,
            callback: function () {
                spawnEnemy1(pmath.Between(100, 700), -100);
                spawnEnemy2(pmath.Between(100, 700), -100);
                spawnEnemy3(pmath.Between(100, 700), -100);
                spawnEnemy4(pmath.Between(100, 700), -100);
                spawnEnemy5(pmath.Between(100, 700), -100);
            },
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 500,
            callback: function () {
                textbox.start("Chris\' text", 10);
                setTimeout(function () {
                    textbox.stop();
                }, 1300);
            },
            callbackScope: this,
            loop: false
        });

        this.time.addEvent({
            delay: 2000,
            callback: function () {
                textbox.start("Faizan\'s text", 10);
                setTimeout(function () {
                    textbox.stop();
                }, 1300);
            },
            callbackScope: this,
            loop: false
        });
        this.time.addEvent({
            delay: 3500,
            callback: function () {
                textbox.start("Will\'s text", 10);
                setTimeout(function () {
                    textbox.start('');
                    enemy1_mode = true;
                }, 1300);
            },
            callbackScope: this,
            loop: false
        });
        //stage1
        setTimeout(function () {
            enemy1_mode = true;
            enemy2_mode = false;
            enemy3_mode = false;
            enemy4_mode = false;
            enemy5_mode = false;
        }, 10000);
        //stage2
        setTimeout(function () {
            enemy1_mode = false;
            enemy2_mode = true;
            enemy3_mode = false;
            enemy4_mode = false;
            enemy5_mode = false;
        }, 40000);
        //stage3
        setTimeout(function () {
            enemy1_mode = false;
            enemy2_mode = false;
            enemy3_mode = true;
            enemy4_mode = false;
            enemy5_mode = false;
        }, 70000);
        //stage4
        setTimeout(function () {
            enemy1_mode = false;
            enemy2_mode = false;
            enemy3_mode = false;
            enemy4_mode = true;
            enemy5_mode = false;
        }, 100000);
        //stage5
        setTimeout(function () {
            enemy1_mode = false;
            enemy2_mode = false;
            enemy3_mode = false;
            enemy4_mode = false;
            enemy5_mode = true;
        }, 130000);
        //stage 1 and 2
        setTimeout(function () {
            enemy1_mode = true;
            enemy2_mode = true;
            enemy3_mode = false;
            enemy4_mode = false;
            enemy5_mode = false;
        }, 160000);
        //stage 3 and 5
        setTimeout(function () {
            enemy1_mode = false;
            enemy2_mode = false;
            enemy3_mode = true;
            enemy4_mode = false;
            enemy5_mode = true;
        }, 220000);
        //stage 1, 3, 4
        setTimeout(function () {
            enemy1_mode = true;
            enemy2_mode = false;
            enemy3_mode = true;
            enemy4_mode = true;
            enemy5_mode = false;
        }, 280000);
        //stage 2,3,5
        setTimeout(function () {
            enemy1_mode = false;
            enemy2_mode = true;
            enemy3_mode = true;
            enemy4_mode = false;
            enemy5_mode = true;
        }, 340000);
        //stage 1,2,3,4,5
        setTimeout(function () {
            enemy1_mode = true;
            enemy2_mode = true;
            enemy3_mode = true;
            enemy4_mode = true;
            enemy5_mode = true;
        }, 400000);
        //clear
        setTimeout(function () {
            enemy1_mode = false;
            enemy2_mode = false;
            enemy3_mode = false;
            enemy4_mode = false;
            enemy5_mode = false;
        }, 430000);
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

        //update enemies on screen and destroy enemies out of range
        enemies1.children.each(function (enemy) {
            if (enemy.active) {
                enemy.casing.update(false, false, false, false, false, false);
                if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
                    enemy.setActive(false);
                    enemy.setVisible(false);
                    enemy.setVelocity(0, 0);
                }
            }
        }.bind(this));
        enemies2.children.each(function (enemy) {
            if (enemy.active) {
                enemy.casing.update(false, false, false, false, false, false);
                if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
                    enemy.setActive(false);
                    enemy.setVisible(false);
                    enemy.setVelocity(0, 0);
                }
            }
        }.bind(this));
        enemies3.children.each(function (enemy) {
            if (enemy.active) {
                enemy.casing.update(false, false, false, false, false, false);
                if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
                    enemy.setActive(false);
                    enemy.setVisible(false);
                    enemy.setVelocity(0, 0);
                }
            }
        }.bind(this));
        enemies4.children.each(function (enemy) {
            if (enemy.active) {
                enemy.casing.update(false, false, false, false, false, false);
                if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
                    enemy.setActive(false);
                    enemy.setVisible(false);
                    enemy.setVelocity(0, 0);
                }
            }
        }.bind(this));
        enemies5.children.each(function (enemy) {
            if (enemy.active) {
                enemy.casing.update(false, false, false, false, false, false);
                if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
                    enemy.setActive(false);
                    enemy.setVisible(false);
                    enemy.setVelocity(0, 0);
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
            debug: false
        }
    },
    plugins: {
        global: [{
            key: 'rextexttypingplugin',
            start: true
        }]
    },
    scene: [TitleScene, MainScene]
};

// start the game
var game = new Phaser.Game(config);


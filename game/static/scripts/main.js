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

var cute;
var chris;
var faiz;
var will;

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
        if (shot.active && ship.active) {
            let blast = blasts.get(shot.body.position.x, shot.body.position.y);
            if (blast) {
                blast.setActive(true);
                blast.setVisible(true);
                blast.play('blast');
                setTimeout(function () {
                    if (blast) {
                        blast.setActive(false);
                        blast.setVisible(false);
                        blast.setPosition(-200, -200);
                    }
                }, 1000);
            }
            shot.setPosition(-200, -200);
            shot.setVelocity(0,0);
            shot.setActive(false);
            shot.setVisible(false);

            ship.setPosition(-200, -200);
            ship.setVelocity(0, 0);
            ship.setActive(false);
            ship.setVisible(false);

            //respawn
            if (ship.texture.key === 'player1' || (ship.texture.key === 'player2' && two_player)) {
                ship.body.checkCollision.none = true;
                ship.setCollideWorldBounds(false);
                ship.setPosition(-3000, -3000);
                setTimeout(function () {
                    if (ship && ship.body) {
                        ship.setActive(true);
                        ship.setVisible(true);
                        ship.setPosition(pmath.Between(200, 600), pmath.Between(200, 400));
                        ship.setCollideWorldBounds(true);
                        ship.setVelocity(0, 0);
                        setTimeout(function () {
                            if (ship && ship.body) {
                                ship.body.checkCollision.none = false;
                            }
                        }, 1500);
                    }
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
    }

    constructor ()
    {
        super('MainScene');
    }


    preload ()
    {
    }



    create ()
    {
        sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
        sky.setDepth(-999);

        cute = this.add.image(0, 0, 'cutealien');
        cute.setPosition(cute.width/2 + 25, cute.height/2 + 300);
        cute.setDepth(99998);
        cute.setVisible(false);

        chris = this.add.image(0, 0, 'chris');
        chris.setPosition(chris.width/2 + 15, chris.height/2 + 300);
        chris.setDepth(99998);
        chris.setVisible(false);

        faiz = this.add.image(0, 0, 'faiz');
        faiz.setPosition(faiz.width/2 + 25, faiz.height/2 + 300);
        faiz.setDepth(99998);
        faiz.setVisible(false);

        will = this.add.image(0, 0, 'will');
        will.setPosition(will.width/2 + 25, will.height/2 + 300);
        will.setDepth(99998);
        will.setVisible(false);

        two_player = false;

        p1score = 0;
        p2score = 0;

        let p2text = ''
        if (two_player) {
            p2text = 'P2 Score: ' + p2score.toString();
        }
        p1scoreText = this.add.text(16, 16, 'P1 Score: ' + p1score.toString(), { fontSize: '32px', fill: '#a66f3c' });
        p2scoreText = this.add.text(16, 64, p2text, { fontSize: '32px', fill: '#a66f3c' });

        textbox = this.make.text({
            x: 250,
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
                    width: 500,
                    useAdvancedWrap: true,
                },
                fixedWidth: 550,
                fixedHeight: 500
            },
            add: true
        });
        textbox.setDepth(99999);
        textbox = this.plugins.get('rextexttypingplugin').add(textbox, {});

        let ship = this.physics.add.sprite(100, 450, 'player1');
        ship.setBounce(0.2);
        ship.setCollideWorldBounds(true);
        ships[0] = new Ship(ship, 100, 450, 1, 0);

        ship = this.physics.add.sprite(200, 500, 'player2');
        ship.setBounce(0.2);
        ship.setCollideWorldBounds(true);
        ships[1] = new Ship(ship, 200, 500, 1, 0);
        if (!two_player) {
            ships[1].ph.setActive(false);
            ships[1].ph.setVisible(false);
            ships[1].ph.setCollideWorldBounds(false);
            ships[1].ph.setPosition(-3000, -3000);
        }

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

        let spawnrate = 1000;

        let alienspeak = 1000;
        let alienstop = 6000;

        let chrisspeak = 7000;
        let chrisstop = 12000;

        let faizspeak = 13000;
        let faizstop = 18000;

        let willspeak = 19000;
        let willstop = 24000;

        let stage1start = 27000;
        let stage2start = 60000;
        let stage3start = 90000;
        let stage4start = 120000;
        let stage5start = 150000;

        let stage6start = 180000;
        let stage7start = 210000;
        let stage8start = 240000;
        let stage9start = 270000;
        let stage10start = 300000;
        let stage10stop = 330000;

        let makeEvent = (function (delayTime, func) {
            this.time.addEvent({
                delay: delayTime,
                callback: function () {
                    func();
                },
                callbackScope: this,
                loop: false
            });
        }).bind(this);


        //enemy spawn timer
        this.time.addEvent({
            delay: spawnrate,
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

        makeEvent(alienspeak, function () {
            cute.setVisible(true);
            textbox.start("Alien\'s text blah blah blah blah blah blah blah blah blah blah blah blah blah", 10);
        });
        makeEvent(alienstop, function () {
            cute.setVisible(false);
            textbox.start('');
        });

        makeEvent(chrisspeak, function () {
            chris.setVisible(true);
            textbox.start("Chris\' text blah blah blah blah blah blah", 10);
        });
        makeEvent(chrisstop, function () {
            chris.setVisible(false);
            textbox.start('');
        });

        makeEvent(faizspeak, function () {
            faiz.setVisible(true);
            textbox.start("Faizan\'s text blah blah blah blah blah blah blah", 10);
        });
        makeEvent(faizstop, function () {
            faiz.setVisible(false);
            textbox.start('');
        });

        makeEvent(willspeak, function () {
            will.setVisible(true);
            textbox.start("Will\'s text blah blah blah blah", 10);
        });
        makeEvent(willstop, function () {
            will.setVisible(false);
            textbox.start('');
        });



        //stage1
        makeEvent(stage1start, function () {
            enemy1_mode = true;
            enemy2_mode = false;
            enemy3_mode = false;
            enemy4_mode = false;
            enemy5_mode = false;
        });
        //stage2
        makeEvent(stage2start, function () {
            enemy1_mode = false;
            enemy2_mode = true;
            enemy3_mode = false;
            enemy4_mode = false;
            enemy5_mode = false;
        });
        //stage3
        makeEvent(stage3start, function () {
            enemy1_mode = false;
            enemy2_mode = false;
            enemy3_mode = true;
            enemy4_mode = false;
            enemy5_mode = false;
        });
        //stage4
        makeEvent(stage4start, function () {
            enemy1_mode = false;
            enemy2_mode = false;
            enemy3_mode = false;
            enemy4_mode = true;
            enemy5_mode = false;
        });
        //stage5
        makeEvent(stage5start, function () {
            enemy1_mode = false;
            enemy2_mode = false;
            enemy3_mode = false;
            enemy4_mode = false;
            enemy5_mode = true;
        });
        //stage6; 1 and 2
        makeEvent(stage6start, function () {
            enemy1_mode = true;
            enemy2_mode = true;
            enemy3_mode = false;
            enemy4_mode = false;
            enemy5_mode = false;
        });
        //stage7; 3 and 5
        makeEvent(stage7start, function () {
            enemy1_mode = false;
            enemy2_mode = false;
            enemy3_mode = true;
            enemy4_mode = false;
            enemy5_mode = true;
        });
        //stage8; 1, 3, 4
        makeEvent(stage8start, function () {
            enemy1_mode = true;
            enemy2_mode = false;
            enemy3_mode = true;
            enemy4_mode = true;
            enemy5_mode = false;
        });
        //stage9; 2,3,5
        makeEvent(stage9start, function () {
            enemy1_mode = false;
            enemy2_mode = true;
            enemy3_mode = true;
            enemy4_mode = false;
            enemy5_mode = true;
        });
        //stage10; 1,2,3,4,5
        makeEvent(stage10start, function () {
            enemy1_mode = true;
            enemy2_mode = true;
            enemy3_mode = true;
            enemy4_mode = true;
            enemy5_mode = true;
        });
        //clear stage10
        makeEvent(stage10stop, function () {
            enemy1_mode = false;
            enemy2_mode = false;
            enemy3_mode = false;
            enemy4_mode = false;
            enemy5_mode = false;
            setTimeout(function () {
                startBoss.bind(this)();
            }, 30000);
        });
    }




    update ()
    {
        if (normal_mode) {
            let sw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O).isDown;
            if (sw) {
                startBoss.bind(this)();
                return;
            }
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
                ships[1].ph.setCollideWorldBounds(true);
                ships[1].ph.setVelocity(0, 0);
                two_player = true;
                p2scoreText.setText('P2 Score: ' + p2score.toString(), { fontSize: '32px', fill: '#a66f3c' });
                enterpressed = Date.now() - 5700;
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
        }]
    },
    scene: [PreloaderScene, TitleScene, MainScene, BossScene]
};

// start the game
var game = new Phaser.Game(config);


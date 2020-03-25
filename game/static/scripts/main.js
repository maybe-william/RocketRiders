// This module holds the main gameplay scene for the game

var p1Score = 0;
var p1ScoreText;
var p2Score = 0;
var p2ScoreText;

var ships = [];
var enemies1;
var enemies2;
var enemies3;
var enemies4;
var enemies5;
var blasts;
var cursors;
var sky;
var spaceHeld = false;
var shiftPressed = 0;

var twoPlayer = false;
var zeroHeld = false;
var enterPressed = 0;

var goodShots;
var badShots;

var textBox;

var normalMode = false;
var enemy1Mode = false;
var enemy2Mode = false;
var enemy3Mode = false;
var enemy4Mode = false;
var enemy5Mode = false;
var bossTime = false;
var anyOnscreen = false;

var sin = Math.sin;
var cos = Math.cos;
var pi = Math.PI;
var pmath = Phaser.Math;

var cute;
var chris;
var faiz;
var will;

var vDown;
var oneDown;
var twoDown;
var threeDown;
var fourDown;
var fiveDown;

function offScreen (x, y) {
    // Check if a coordinate is far enough out of the play area.
    if (x < -200 || y < -200 || x > 1000 || y > 800) {
        return true;
    }
    return false;
}

function spawnEnemy1 (x, y) {
    if (enemy1Mode) {
        const ship = enemies1.get(x, y);
        ship.setBounce(0.6);
        ship.setAngle(180);
        ship.setRotation(pi);
        if (ship.casing === undefined) { // if full ship objectnot created already
            const enemy = new Ship(ship, x, y, 1, 0);
            enemy.update = AI1;
            ship.casing = enemy; // just to keep track of having been created already
        }
        ship.setActive(true);
        ship.setVisible(true);
        ship.casing.createTime = Date.now();
        ship.casing.nonceTime = pmath.Between(0, 6000);
    }
}

function spawnEnemy2 (x, y) {
    if (enemy2Mode) {
        const ship = enemies2.get(x, y);
        ship.setBounce(0.6);
        ship.setAngle(180);
        ship.setRotation(pi);
        if (ship.casing === undefined) { // if full ship object not created already
            const enemy = new Ship(ship, x, y, 1, 0);
            enemy.update = AI2;
            ship.casing = enemy; // just to keep track of the object wrapper
        }
        ship.setActive(true);
        ship.setVisible(true);
        ship.casing.createTime = Date.now();
        ship.casing.nonceTime = pmath.Between(0, 6000);
        ship.casing.targetShip = ships[Math.floor(Math.random() * 2)];
        // ship.casing.ptx = pmath.Between(100, 700);
        // ship.casing.pty = pmath.Between(100, 500);
    }
}

function spawnEnemy3 (x, y) {
    if (enemy3Mode) {
        const ship = enemies3.get(x, y);
        ship.setBounce(0.6);
        ship.setAngle(180);
        ship.setRotation(pi);
        if (ship.casing === undefined) { // if full ship object not created already
            const enemy = new Ship(ship, x, y, 1, 0);
            enemy.update = AI3;
            ship.casing = enemy; // just to keep track of the object wrapper
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

function spawnEnemy4 (x, y) {
    if (enemy4Mode) {
        const ship = enemies4.get(x, y);
        ship.setBounce(0.6);
        ship.setAngle(180);
        ship.setRotation(pi);
        if (ship.casing === undefined) { // if full ship object not created already
            const enemy = new Ship(ship, x, y, 1, 0);
            enemy.update = AI4;
            ship.casing = enemy; // just to keep track of the object wrapper
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

function spawnEnemy5 (x, y) {
    if (enemy5Mode) {
        const ship = enemies5.get(x, y);
        ship.setBounce(0.6);
        ship.setAngle(180);
        ship.setRotation(pi);
        if (ship.casing === undefined) { // if full ship object not created already
            const enemy = new Ship(ship, x, y, 1, 0);
            enemy.update = AI5;
            ship.casing = enemy; // just to keep track of the object wrapper
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
        // Collision function for when a bullet hits a ship
        if (shot.active && ship.active) {
            const blast = blasts.get(shot.body.position.x, shot.body.position.y);
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
                explosion.play();
            }
            shot.setPosition(-200, -200);
            shot.setVelocity(0, 0);
            shot.setActive(false);
            shot.setVisible(false);

            ship.setPosition(-200, -200);
            ship.setVelocity(0, 0);
            ship.setActive(false);
            ship.setVisible(false);

            // respawn
            if (ship.texture.key === 'player1' || (ship.texture.key === 'player2' && twoPlayer)) {
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
                            p1Score = p1Score + 10;
                            p1ScoreText.setText('P1 Score: ' + p1Score.toString());
                        }
                        if (shot.shooter === 'player2') {
                            p2Score = p2Score + 10;
                            p2ScoreText.setText('P2 Score: ' + p2Score.toString());
                        }
                    }
                }
            }
        }
    }

    constructor () {
        super('MainScene');
    }


    create () {
        // Create assets for the scene to use
        sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
        sky.setDepth(-999);

        cute = this.add.image(0, 0, 'cutealien');
        cute.setPosition(cute.width / 2 + 25, cute.height / 2 + 300);
        cute.setDepth(99998);
        cute.setVisible(false);

        chris = this.add.image(0, 0, 'chris');
        chris.setPosition(chris.width / 2, chris.height / 2 + 300);
        chris.setDepth(99998);
        chris.setVisible(false);

        faiz = this.add.image(0, 0, 'faiz');
        faiz.setPosition(faiz.width / 2 + 25, faiz.height / 2 + 300);
        faiz.setDepth(99998);
        faiz.setVisible(false);

        will = this.add.image(0, 0, 'will');
        will.setPosition(will.width / 2 + 25, will.height / 2 + 300);
        will.setDepth(99998);
        will.setVisible(false);

        twoPlayer = false;

        p1Score = 0;
        p2Score = 0;

        let p2Text = '';
        if (twoPlayer) {
            p2Text = 'P2 Score: ' + p2Score.toString();
        }
        p1ScoreText = this.add.text(16, 16, 'P1 Score: ' + p1Score.toString(), { fontSize: '32px', fill: '#a66f3c' });
        p2ScoreText = this.add.text(16, 64, p2Text, { fontSize: '32px', fill: '#a66f3c' });

        textBox = this.make.text({
            x: 250,
            y: 375,
            padding: {
                left: 64,
                right: 64,
                top: 20,
                bottom: 40,
                x: 32, // 32px padding on the left/right
                y: 16 // 16px padding on the top/bottom
            },
            text: '',
            style: {
                fontSize: '32px',
                fontFamily: 'Oxanum',
                color: '#ffffff',
                align: 'left', // 'left'|'center'|'right'|'justify'
                // backgroundColor: '#fffff',
                wordWrap: {
                    width: 500,
                    useAdvancedWrap: true
                },
                fixedWidth: 550,
                fixedHeight: 500
            },
            add: true
        });
        textBox.setDepth(99999);
        textBox = this.plugins.get('rextexttypingplugin').add(textBox, {});

        let ship = this.physics.add.sprite(100, 450, 'player1');
        ship.setBounce(0.2);
        ship.setCollideWorldBounds(true);
        ships[0] = new Ship(ship, 100, 450, 1, 0);

        ship = this.physics.add.sprite(200, 500, 'player2');
        ship.setBounce(0.2);
        ship.setCollideWorldBounds(true);
        ships[1] = new Ship(ship, 200, 500, 1, 0);
        if (!twoPlayer) {
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
                { key: 'null' }
            ]
        });

        blasts = this.physics.add.group({
            defaultKey: 'blast1',
            maxSize: 200
        });

        goodShots = this.physics.add.group({
            defaultKey: 'goodshot',
            maxSize: 200
        });

        badShots = this.physics.add.group({
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
        this.physics.add.collider(ships[0].ph, badShots, this.bulletHit, null, this);
        this.physics.add.collider(ships[1].ph, badShots, this.bulletHit, null, this);

        this.physics.add.collider(ships[0].ph, enemies1, null, null, this);
        this.physics.add.collider(ships[1].ph, enemies1, null, null, this);
        this.physics.add.collider(enemies1, goodShots, this.bulletHit, null, this);
        this.physics.add.collider(enemies1, enemies1, null, null, this);

        this.physics.add.collider(ships[0].ph, enemies2, null, null, this);
        this.physics.add.collider(ships[1].ph, enemies2, null, null, this);
        this.physics.add.collider(enemies2, goodShots, this.bulletHit, null, this);
        this.physics.add.collider(enemies2, enemies2, null, null, this);

        this.physics.add.collider(ships[0].ph, enemies3, this.bulletHit, null, this);
        this.physics.add.collider(ships[1].ph, enemies3, this.bulletHit, null, this);
        this.physics.add.collider(enemies3, goodShots, this.bulletHit, null, this);
        this.physics.add.collider(enemies3, enemies3, null, null, this);

        this.physics.add.collider(ships[0].ph, enemies4, null, null, this);
        this.physics.add.collider(ships[1].ph, enemies4, null, null, this);
        this.physics.add.collider(enemies4, goodShots, this.bulletHit, null, this);
        this.physics.add.collider(enemies4, enemies4, null, null, this);

        this.physics.add.collider(ships[0].ph, enemies5, null, null, this);
        this.physics.add.collider(ships[1].ph, enemies5, null, null, this);
        this.physics.add.collider(enemies5, goodShots, this.bulletHit, null, this);
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

        const spawnRate = 1000;

        const alienSpeak = 1000;
        const alienStop = 7000;

        const chrisSpeak = 8000;
        const chrisStop = 14000;

        const faizSpeak = 15000;
        const faizStop = 21000;

        const willSpeak = 22000;
        const willStop = 29000;

        const stage1Start = 30000;
        const stage2Start = 45000;
        const stage3Start = 60000;
        const stage4Start = 90000;
        const stage5Start = 105000;

        const stage6Start = 120000;
        const stage7Start = 135000;
        const stage8Start = 150000;
        const stage9Start = 165000;
        const stage10Start = 180000;
        const stage10Stop = 195000;

        const bossStart = 200000;

        const makeEvent = function (delayTime, func) {
            this.time.addEvent({
                delay: delayTime,
                callback: function () {
                    func();
                },
                callbackScope: this,
                loop: false
            });
        }.bind(this);

        // enemy spawn timer
        this.time.addEvent({
            delay: spawnRate,
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

        makeEvent(alienSpeak, function () {
            cute.setVisible(true);
            textBox.start('Alien: Please help! The Evil Alien Empire is attacking! I have a spaceship with weapons, but my arms are too short to fly!', 25);
        });
        makeEvent(alienStop, function () {
            cute.setVisible(false);
            textBox.start('');
        });

        makeEvent(chrisSpeak, function () {
            chris.setVisible(true);
            textBox.start("Chris-sama: Not to worry! Team Synergy is here to help, and we've got arms! The Evil Alien Empire won't stand a chance against these hands.", 25);
        });
        makeEvent(chrisStop, function () {
            chris.setVisible(false);
            textBox.start('');
        });

        makeEvent(faizSpeak, function () {
            faiz.setVisible(true);
            textBox.start("Khan-senpai: Alright, Space Rangers, let's shoot 'em up! use WASD to pilot your ship, SPACEBAR to fire, and SHIFT to fire your special move.", 25);
        });
        makeEvent(faizStop, function () {
            faiz.setVisible(false);
            textBox.start('');
        });

        makeEvent(willSpeak, function () {
            will.setVisible(true);
            textBox.start("Will-kun: You said it, Faizan! If you don't like the simple controls, press V for more freedom of motion. Yee Haw!", 25);
        });
        makeEvent(willStop, function () {
            will.setVisible(false);
            textBox.start('');
        });

        // stage1
        makeEvent(stage1Start, function () {
            enemy1Mode = true;
            enemy2Mode = false;
            enemy3Mode = false;
            enemy4Mode = false;
            enemy5Mode = false;
        });
        // stage2
        makeEvent(stage2Start, function () {
            enemy1Mode = false;
            enemy2Mode = true;
            enemy3Mode = false;
            enemy4Mode = false;
            enemy5Mode = false;
        });
        // stage3
        makeEvent(stage3Start, function () {
            enemy1Mode = false;
            enemy2Mode = false;
            enemy3Mode = true;
            enemy4Mode = false;
            enemy5Mode = false;
        });
        // stage4
        makeEvent(stage4Start, function () {
            enemy1Mode = false;
            enemy2Mode = false;
            enemy3Mode = false;
            enemy4Mode = true;
            enemy5Mode = false;
        });
        // stage5
        makeEvent(stage5Start, function () {
            enemy1Mode = false;
            enemy2Mode = false;
            enemy3Mode = false;
            enemy4Mode = false;
            enemy5Mode = true;
        });
        // stage6; 1 and 2
        makeEvent(stage6Start, function () {
            enemy1Mode = true;
            enemy2Mode = true;
            enemy3Mode = false;
            enemy4Mode = false;
            enemy5Mode = false;
        });
        // stage7; 3 and 5
        makeEvent(stage7Start, function () {
            enemy1Mode = false;
            enemy2Mode = false;
            enemy3Mode = true;
            enemy4Mode = false;
            enemy5Mode = true;
        });
        // stage8; 1, 3, 4
        makeEvent(stage8Start, function () {
            enemy1Mode = true;
            enemy2Mode = false;
            enemy3Mode = true;
            enemy4Mode = true;
            enemy5Mode = false;
        });
        // stage9; 2,3,5
        makeEvent(stage9Start, function () {
            enemy1Mode = false;
            enemy2Mode = true;
            enemy3Mode = true;
            enemy4Mode = false;
            enemy5Mode = true;
        });
        // stage10; 1,2,3,4,5
        makeEvent(stage10Start, function () {
            enemy1Mode = true;
            enemy2Mode = true;
            enemy3Mode = true;
            enemy4Mode = true;
            enemy5Mode = true;
        });
        // clear stage10
        makeEvent(stage10Stop, function () {
            enemy1Mode = false;
            enemy2Mode = false;
            enemy3Mode = false;
            enemy4Mode = false;
            enemy5Mode = false;
        });

        makeEvent(bossStart, function () {
            bossTime = true;
        });
    }

    update () {
        // Update the scene state every tick of the game clock
        if (normalMode) {
            // if O key pressed or if at boss time with no enemies on the screen, then switch to the boss scene
            const sw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O).isDown;
            if (sw || (bossTime && !anyOnscreen)) {
                bossTime = false;
                startBoss.bind(this)();
                return;
            }
            anyOnscreen = false;

            // move sky
            sky.tilePositionY = sky.tilePositionY - 1;

            // abbreviate keyboard input variable
            const kb = this.input.keyboard;

            // if V key pressed and released then swap control mode
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.V).isDown) {
                vDown = true;
            }
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.V).isUp && vDown) {
                vDown = false;
                simpleControl = !simpleControl;
            }

            // if ONE key pressed and released then toggle enemy1 spawning
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.ONE).isDown) {
                oneDown = true;
            }
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.ONE).isUp && oneDown) {
                oneDown = false;
                enemy1Mode = !enemy1Mode;
            }

            // if TWO key pressed and released then toggle enemy2 spawning
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.TWO).isDown) {
                twoDown = true;
            }
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.TWO).isUp && twoDown) {
                twoDown = false;
                enemy2Mode = !enemy2Mode;
            }

            // if THREE key pressed and released then toggle enemy3 spawning
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.THREE).isDown) {
                threeDown = true;
            }
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.THREE).isUp && threeDown) {
                threeDown = false;
                enemy3Mode = !enemy3Mode;
            }

            // if FOUR key pressed and released then toggle enemy4 spawning
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR).isDown) {
                fourDown = true;
            }
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR).isUp && fourDown) {
                fourDown = false;
                enemy4Mode = !enemy4Mode;
            }

            // if FIVE key pressed and released then toggle enemy5 spawning
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE).isDown) {
                fiveDown = true;
            }
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE).isUp && fiveDown) {
                fiveDown = false;
                enemy5Mode = !enemy5Mode;
            }

            // controls for player2
            const four = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR).isDown;
            const six = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX).isDown;
            const eight = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT).isDown;
            const five = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE).isDown;
            let fire = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO).isDown;
            let spec = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown;
            if (!twoPlayer && spec) {
                ships[1].ph.setActive(true);
                ships[1].ph.setVisible(true);
                ships[1].ph.setPosition(210, 300);
                ships[1].ph.setCollideWorldBounds(true);
                ships[1].ph.setVelocity(0, 0);
                twoPlayer = true;
                p2ScoreText.setText('P2 Score: ' + p2Score.toString(), { fontSize: '32px', fill: '#a66f3c' });
                enterPressed = Date.now() - 5700;
                spec = false;
            }
            if (!fire) {
                zeroHeld = false;
            }
            fire = fire && !zeroHeld; // only fire on the first press

            if (Date.now() - enterPressed < 6000) {
                spec = false; // only allow shift every 6 seconds
            }
            if (spec) {
                enterPressed = Date.now();
            }

            if (twoPlayer) {
                ships[1].update(fire, spec, eight, five, six, four);
            }

            if (fire) {
                zeroHeld = true;
            }

            // controls for player1
            const w = kb.addKey('W').isDown;
            const a = kb.addKey('A').isDown;
            const s = kb.addKey('S').isDown;
            const d = kb.addKey('D').isDown;

            fire = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown;
            spec = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT).isDown;

            if (!fire) {
                spaceHeld = false;
            }
            fire = fire && !spaceHeld; // only fire on the first press

            if (Date.now() - shiftPressed < 6000) {
                spec = false; // only allow shift every 6 seconds
            }
            if (spec) {
                shiftPressed = Date.now();
            }

            ships[0].update(fire, spec, w, s, d, a);
            if (fire) {
                spaceHeld = true;
            }

            // destroy bullets out of range
            goodShots.children.each(function (shot) {
                if (shot.active) {
                    if (offScreen(shot.x, shot.y)) {
                        shot.setActive(false);
                        shot.setVisible(false);
                    }
                }
            });

            // destroy bullets out of range
            badShots.children.each(function (shot) {
                if (shot.active) {
                    if (offScreen(shot.x, shot.y)) {
                        shot.setActive(false);
                        shot.setVisible(false);
                    }
                }
            });

            // update enemies on screen and destroy enemies out of range
            enemies1.children.each(function (enemy) {
                if (enemy.active) {
                    anyOnscreen = true;
                    enemy.casing.update(false, false, false, false, false, false);
                    if (offScreen(enemy.body.position.x, enemy.body.position.y)) {
                        enemy.setActive(false);
                        enemy.setVisible(false);
                        enemy.setVelocity(0, 0);
                    }
                }
            });
            enemies2.children.each(function (enemy) {
                if (enemy.active) {
                    anyOnscreen = true;
                    enemy.casing.update(false, false, false, false, false, false);
                    if (offScreen(enemy.body.position.x, enemy.body.position.y)) {
                        enemy.setActive(false);
                        enemy.setVisible(false);
                        enemy.setVelocity(0, 0);
                    }
                }
            });
            enemies3.children.each(function (enemy) {
                if (enemy.active) {
                    anyOnscreen = true;
                    enemy.casing.update(false, false, false, false, false, false);
                    if (offScreen(enemy.body.position.x, enemy.body.position.y)) {
                        enemy.setActive(false);
                        enemy.setVisible(false);
                        enemy.setVelocity(0, 0);
                    }
                }
            });
            enemies4.children.each(function (enemy) {
                if (enemy.active) {
                    anyOnscreen = true;
                    enemy.casing.update(false, false, false, false, false, false);
                    if (offScreen(enemy.body.position.x, enemy.body.position.y)) {
                        enemy.setActive(false);
                        enemy.setVisible(false);
                        enemy.setVelocity(0, 0);
                    }
                }
            });
            enemies5.children.each(function (enemy) {
                if (enemy.active) {
                    anyOnscreen = true;
                    enemy.casing.update(false, false, false, false, false, false);
                    if (offScreen(enemy.body.position.x, enemy.body.position.y)) {
                        enemy.setActive(false);
                        enemy.setVisible(false);
                        enemy.setVelocity(0, 0);
                    }
                }
            });
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
            debug: false
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

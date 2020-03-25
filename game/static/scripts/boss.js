// This module holds the boss scene for the game
var bossMode;
var bossBody;
var bossLeftWing;
var bossRightWing;
var bossLeftLaser;
var bossRightLaser;
var bossGun;
var bossWeakSpot;

var boss;
var won;

var victory;

function bossShoot (x, y, direction, velocity, scale) {
    // This is the function for the boss to shoot a bullet
    if (x > 0 && y > 0 && x < 800 && y < 600) {
        const shot = badShots.get(x, y);
        const xamt = cos(direction) * velocity;
        const yamt = sin(direction) * velocity;
        if (shot) {
            shot.setScale(scale);
            shot.setActive(true);
            shot.setVisible(true);
            shot.setVelocity(xamt, yamt);
            laser.play();
        }
    }
}

function bossLasers (chanceLimit, speed) {
    // This is the function for the boss' lasers to shoot bullets
    if (bossWeakSpot.active || bossGun.active) {
        const chance = pmath.Between(0, 1000);
        boss.laserShoot = boss.laserShoot || 1;
        if (chance < chanceLimit) {
            boss.laserShoot = 10;
        }
        if (boss.laserShoot > 1) {
            boss.laserShoot = boss.laserShoot - 1;
            if (bossLeftLaser.active) {
                const x = bossLeftLaser.body.position.x + bossLeftLaser.body.width / 2;
                const y = bossLeftLaser.body.position.y + bossLeftLaser.body.height / 2;
                bossShoot(x, y, boss.rotation - pi / 2, speed, 0.5);
            }
            if (bossRightLaser.active) {
                const x = bossRightLaser.body.position.x + bossRightLaser.body.width / 2;
                const y = bossRightLaser.body.position.y + bossRightLaser.body.height / 2;
                bossShoot(x, y, boss.rotation - pi / 2, speed, 0.5);
            }
        }
    }
}

function bossAI1 () {
    // This is the boss 1st stage AI
    // weapons
    boss.target = boss.target || ships[0];
    const chance = pmath.Between(1, 100);
    if (chance < 5) {
        const angleOffset = pmath.Between(-7, 7);
        const radianOffset = angleOffset * (pi / 180);
        const gunx = bossGun.body.position.x;
        const guny = bossGun.body.position.y;
        const shipx = boss.target.ph.body.position.x;
        const shipy = boss.target.ph.body.position.y;
        const playerAngle = pmath.Angle.Between(gunx, guny, shipx, shipy);
        bossShoot(bossGun.body.position.x, bossGun.body.position.y, playerAngle + radianOffset, 400, 1.0);
    }
    bossLasers(70, 400);

    // movement
    if (chance < 35 && chance > 33 && ships[1].ph.active) {
        boss.target = ships[Math.floor(Math.random(2))];
    }
    // turn towards target
    const dir = pmath.Angle.Between(boss.x, boss.y, boss.target.ph.body.position.x, boss.target.ph.body.position.y);
    boss.setRotation(pmath.Angle.RotateTo(boss.rotation - pi / 2, dir, 0.01) + pi / 2);
    // move towards target
    const moveSpeed = 1;
    const xMove = cos(boss.rotation - pi / 2) * moveSpeed;
    const yMove = sin(boss.rotation - pi / 2) * moveSpeed;
    boss.setPosition(boss.x + xMove, boss.y + yMove);
}

function bossAI2 () {
    // This is the boss 2nd stage AI
    // weapons
    boss.target = boss.target || ships[0];
    const chance = pmath.Between(1, 100);
    if (chance < 20) {
        const angle = pmath.Between(1, 360);
        const velocity = pmath.Between(100, 600);
        const rad = angle * (pi / 180);
        bossShoot(bossWeakSpot.body.position.x, bossWeakSpot.body.position.y, rad, velocity, 1.0);
    }
    bossLasers(100, 1000);

    // movement
    if (chance < 35 && chance > 33 && ships[1].ph.active) {
        boss.target = ships[Math.floor(Math.random(2))];
    }
    if (bossWeakSpot.active) {
        // turn towards target
        const dir = pmath.Angle.Between(boss.x, boss.y, boss.target.ph.body.position.x, boss.target.ph.body.position.y);
        boss.setRotation(pmath.Angle.RotateTo(boss.rotation - pi / 2, dir, 0.02) + pi / 2);
        // move towards target
        const moveSpeed = 2;
        const xMove = cos(boss.rotation - pi / 2) * moveSpeed;
        const yMove = sin(boss.rotation - pi / 2) * moveSpeed;

        boss.setPosition(boss.x + xMove, boss.y + yMove);
    }
}

class BossScene extends Phaser.Scene {

    destroyBoss () {
        // This is how the boss should destruct upon destruction
        const startTime = Date.now();
        const x = bossBody.body.position.x + bossBody.body.width / 2;
        const y = bossBody.body.position.y + bossBody.body.height / 2;
        let done = false;
        this.time.addEvent({
            delay: 100,
            callback: function () {
                if (Date.now() - startTime < 4000) {
                    this.makeBlast(x + pmath.Between(-100, 100), y + pmath.Between(-100, 100), pmath.Between(1, 3));
                    boss.setPosition(boss.x + pmath.Between(-3, 3), boss.y + pmath.Between(-3, 3));
                } else if (!done) {
                    this.makeBlast(x, y, 6);
                    // make all the ship invisible
                    bossBody.setActive(false);
                    bossBody.setVisible(false);
                    bossLeftWing.setActive(false);
                    bossLeftWing.setVisible(false);
                    bossRightWing.setActive(false);
                    bossRightWing.setVisible(false);
                    boss.setPosition(-300, -300);
                    boss.setActive(false);
                    boss.setVisible(false);
                    done = true;
                    won = true;
                }
            }.bind(this),
            callbackScope: this,
            loop: true
        });
        setTimeout(function () {
            if (p1Score > topScore) {
                topScore = p1Score;
            }
            if (p2Score > topScore) {
                topScore = p2Score;
            }
            victory.setVisible(true);
            bossMusic.stop();
            victoryMusic.play();
        }, 2000);
    }

    makeBlast (x, y, scale) {
        // This makes an explosion animation at the given x and y with the given scale
        const blast = blasts.get(x, y);
        if (blast) {
            blast.setScale(scale);
            blast.setActive(true);
            blast.setVisible(true);
            blast.play('blast');
            explosion.play();
            setTimeout(function () {
                if (blast) {
                    blast.setActive(false);
                    blast.setVisible(false);
                    blast.setPosition(-201, -200);
                }
            }, 999);
        }
    }

    bossHit (part, shot) {
        // This is the collision function for a bullet and a part of the boss
        if (part.active) {
            part.setVelocity(0, 0);
            if (part.healthPoints > 0) {
                part.healthPoints = part.healthPoints - 1;
                this.makeBlast(shot.body.position.x, shot.body.position.y, 1);
                if (shot.shooter === 'player1') {
                    p1Score = p1Score + 50;
                } else if (shot.shooter === 'player2') {
                    p2Score = p2Score + 50;
                }
            } else {
                part.setActive(false);
                part.setVisible(false);
                part.setPosition(-1000, -1500);
                part.setVelocity(0, 0);
                this.makeBlast(shot.body.position.x, shot.body.position.y, 2);
                if (shot.shooter === 'player1') {
                    p1Score = p1Score + 200;
                } else if (shot.shooter === 'player2') {
                    p2Score = p2Score + 200;
                }
                if (part === bossWeakSpot) {
                    this.destroyBoss();
                }
            }
            p1ScoreText.setText('P1 Score: ' + p1Score.toString());
            if (ships[1] && ships[1].ph && ships[1].ph.active) {
                p2ScoreText.setText('P2 Score: ' + p2Score.toString());
            }
            shot.setPosition(-200, -200);
            shot.setVelocity(0, 0);
            shot.setActive(false);
            shot.setVisible(false);
            part.setVelocity(0, 0);
        }
    }

    bulletHit (ship, shot) {
        // This is the collision function for a bullet and a ship
        if (shot.active && ship.active) {
            this.makeBlast(shot.body.position.x, shot.body.position.y, 1);
            shot.setPosition(-200, -200);
            shot.setVelocity(0, 0);
            shot.setActive(false);
            shot.setVisible(false);

            ship.setPosition(-200, -200);
            ship.setVelocity(0, 0);
            ship.setActive(false);
            ship.setVisible(false);

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
        super('BossScene');
    }

    create () {
        // This creates the assets that the scene will use
        won = false;
        sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
        sky.setDepth(-999);

        victory = this.add.tileSprite(400, 300, 800, 600, 'victory');
        victory.setDepth(999);
        victory.setActive(false);
        victory.setVisible(false);

        bossBody = this.physics.add.sprite(0, 0, 'bossbody');
        bossLeftWing = this.physics.add.sprite(-71, -16, 'bossleftwing');
        bossRightWing = this.physics.add.sprite(71, -16, 'bossrightwing');

        bossLeftLaser = this.physics.add.sprite(-95, -86, 'bossleftlaser');
        bossLeftLaser.healthPoints = 2;

        bossRightLaser = this.physics.add.sprite(95, -86, 'bossrightlaser');
        bossRightLaser.healthPoints = 2;

        bossGun = this.physics.add.sprite(0, -100, 'bossgun');
        bossGun.healthPoints = 2;

        bossWeakSpot = this.physics.add.sprite(0, -96, 'bossweakspot');
        bossWeakSpot.healthPoints = 2;

        boss = this.add.container(400, -100, [bossBody, bossLeftWing, bossRightWing, bossLeftLaser, bossRightLaser, bossGun, bossWeakSpot]);
        boss.setDepth(-3);

        let p2Text = '';
        if (twoPlayer) {
            p2Text = 'P2 Score: ' + p2Score.toString();
        }

        p1ScoreText = this.add.text(16, 16, 'P1 Score: ' + p1Score.toString(), { fontSize: '32px', fill: '#a66f3c' });
        p2ScoreText = this.add.text(16, 64, p2Text, { fontSize: '32px', fill: '#a66f3c' });

        textBox = this.make.text({
            x: 0,
            y: 400,
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
                    width: 750,
                    useAdvancedWrap: true
                },
                fixedWidth: 800,
                fixedHeight: 500
            },
            add: true
        });
        textBox.setDepth(99999);
        textBox = this.plugins.get('rextexttypingplugin').add(textBox, {
        });

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

        this.physics.add.collider(ships[0].ph, ships[1].ph, null, null, this);
        this.physics.add.collider(ships[1].ph, ships[0].ph, null, null, this);
        this.physics.add.collider(ships[0].ph, badShots, this.bulletHit, null, this);
        this.physics.add.collider(ships[1].ph, badShots, this.bulletHit, null, this);

        this.physics.add.collider(bossGun, goodShots, this.bossHit, null, this);
        this.physics.add.collider(bossLeftLaser, goodShots, this.bossHit, null, this);
        this.physics.add.collider(bossRightLaser, goodShots, this.bossHit, null, this);
        this.physics.add.collider(bossWeakSpot, goodShots, this.bossHit, null, this);

        this.time.addEvent({
            delay: 500,
            callback: function () {
                textBox.start('WHAT HAVE YOU DONE TO MY BEAUTIFUL EMPIRE?!?! I WILL GRIND YOU INTO COSMIC DUST!!!', 50);
            },
            callbackScope: this,
            loop: false
        });
        this.time.addEvent({
            delay: 6000,
            callback: function () {
                textBox.start('', 8);
            },
            callbackScope: this,
            loop: false
        });
    }

    update () {
        // This updates the scene every tick of the game clock
        if (bossMode) {
            const sw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P).isDown;
            if (sw) {
                startTitle.bind(this)();
                return;
            }

            // move sky
            sky.tilePositionY = sky.tilePositionY - 1;

            // get the movement for ship1
            const kb = this.input.keyboard;
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.V).isDown) {
                vDown = true;
            }
            if (kb.addKey(Phaser.Input.Keyboard.KeyCodes.V).isUp && vDown) {
                vDown = false;
                simpleControl = !simpleControl;
            }
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

            // get the movement for ship2
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

            if (!won) {
                if (bossGun.active) {
                    bossAI1();
                } else {
                    bossAI2();
                }
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
        }
    }
}

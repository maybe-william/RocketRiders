var bossmode;
var bossbody;
var bossleftwing;
var bossrightwing;
var bossleftlaser;
var bossrightlaser;
var bossgun;
var bossweakspot;

var boss;
var won;

function bossShoot(x, y, direction, velocity, scale) {
    if (x > 0 && y > 0 && x < 800 && y < 600) {
        let shot = badshots.get(x, y);
        let xamt = cos(direction) * velocity;
        let yamt = sin(direction) * velocity;
        if (shot) {
            shot.setScale(scale);
            shot.setActive(true);
            shot.setVisible(true);
            shot.setVelocity(xamt, yamt);
        }
    }
}

function bossLasers(chancelimit, speed) {
    if (bossweakspot.active || bossgun.active) {
        let chance = pmath.Between(0, 1000);
        boss.lasershoot = boss.lasershoot || 1;
        if (chance < chancelimit) {
            boss.lasershoot = 10;
        }
        if (boss.lasershoot > 1) {
            boss.lasershoot = boss.lasershoot - 1;
            if (bossleftlaser.active) {
                let x = bossleftlaser.body.position.x + bossleftlaser.body.width/2;
                let y = bossleftlaser.body.position.y + bossleftlaser.body.height/2;
                bossShoot(x, y, boss.rotation - pi/2, speed, 0.5);
            }
            if (bossrightlaser.active) {
                let x = bossrightlaser.body.position.x + bossrightlaser.body.width/2;
                let y = bossrightlaser.body.position.y + bossrightlaser.body.height/2;
                bossShoot(x, y, boss.rotation - pi/2, speed, 0.5);
            }
        }
    }
}

function bossai1() {
    //weapons
    boss.target = boss.target || ships[0];
    let chance = pmath.Between(1, 100);
    if (chance < 5) {
        let angleoffset = pmath.Between(-7, 7);
        let radianoffset = angleoffset * (pi/180);
        let gunx = bossgun.body.position.x;
        let guny = bossgun.body.position.y;
        let shipx = boss.target.ph.body.position.x;
        let shipy = boss.target.ph.body.position.y;
        let playerAngle = pmath.Angle.Between(gunx, guny, shipx, shipy);
        bossShoot(bossgun.body.position.x, bossgun.body.position.y, playerAngle + radianoffset, 400, 1.0);
    }
    bossLasers(70, 400);

    //movement
    if (chance < 35 && chance > 33 && ships[1].ph.active){
        boss.target = ships[Math.floor(Math.random(2))];
    }
    //turn towards target
    let dir = pmath.Angle.Between(boss.x, boss.y, boss.target.ph.body.position.x, boss.target.ph.body.position.y);
    boss.setRotation(pmath.Angle.RotateTo(boss.rotation - pi/2, dir, 0.01) + pi/2);
    //move towards target
    let moveSpeed = 1;
    let xmove = cos(boss.rotation - pi/2) * moveSpeed;
    let ymove = sin(boss.rotation - pi/2) * moveSpeed;
    boss.setPosition(boss.x + xmove, boss.y + ymove);
}

function bossai2() {
    //weapons
    boss.target = boss.target || ships[0];
    let chance = pmath.Between(1, 100);
    if (chance < 20) {
        let angle = pmath.Between(1, 360);
        let velocity = pmath.Between(100, 600);
        let rad = angle * (pi/180);
        bossShoot(bossweakspot.body.position.x, bossweakspot.body.position.y, rad, velocity, 1.0);
    }
    bossLasers(100, 1000);

    //movement
    if (chance < 35 && chance > 33 && ships[1].ph.active){
        boss.target = ships[Math.floor(Math.random(2))];
    }
    if (bossweakspot.active) {
        //turn towards target
        let dir = pmath.Angle.Between(boss.x, boss.y, boss.target.ph.body.position.x, boss.target.ph.body.position.y);
        boss.setRotation(pmath.Angle.RotateTo(boss.rotation - pi/2, dir, 0.02) + pi/2);
        //move towards target
        let moveSpeed = 2;
        let xmove = cos(boss.rotation - pi/2) * moveSpeed;
        let ymove = sin(boss.rotation - pi/2) * moveSpeed;

        boss.setPosition(boss.x + xmove, boss.y + ymove);
    }
}

class BossScene extends Phaser.Scene {

    destroyBoss() {
        let startTime = Date.now();
        let x = bossbody.body.position.x + bossbody.body.width/2;
        let y = bossbody.body.position.y + bossbody.body.height/2;
        let done = false;
        this.time.addEvent({
            delay: 100,
            callback: function () {
                if (Date.now() - startTime < 4000) {
                    this.makeBlast(x + pmath.Between(-100, 100), y + pmath.Between(-100, 100), pmath.Between(1, 3));
                    boss.setPosition(boss.x + pmath.Between(-3, 3), boss.y + pmath.Between(-3, 3));
                } else if (!done){
                    this.makeBlast(x, y, 6);
                    //make all the ship invisible
                    bossbody.setActive(false);
                    bossbody.setVisible(false);
                    bossleftwing.setActive(false);
                    bossleftwing.setVisible(false);
                    bossrightwing.setActive(false);
                    bossrightwing.setVisible(false);
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
            if (p1score > topScore) {
                topScore = p1score;
            }
            if (p2score > topScore) {
                topScore = p2score;
            }

            this.scene.transition({
                target: 'TitleScene',
                duration: 500,
                moveBelow: true,
                onUpdate: this.transitionOut
            });
            demoMode = true;

            //this.scene.start('TitleScene');
            //ships[0].ph.setActive(false);
            //ships[1].ph.setActive(false);
        }.bind(this), 7000);
    }

    makeBlast(x, y, scale) {
        let blast = blasts.get(x, y);
        if (blast) {
            blast.setScale(scale);
            blast.setActive(true);
            blast.setVisible(true);
            blast.play('blast');
            setTimeout(function () {
                if (blast) {
                    blast.setActive(false);
                    blast.setVisible(false);
                    blast.setPosition(-201, -200);
                }
            }, 999);
        }

    }


    bossHit(part, shot){
        if (part.active){
            part.setVelocity(0, 0);
            if (part.healthpoints > 0){
                part.healthpoints = part.healthpoints - 1;
                this.makeBlast(shot.body.position.x, shot.body.position.y, 1);
                if (shot.shooter == 'player1') {
                    p1score = p1score + 50;
                } else if (shot.shooter == 'player2') {
                    p2score = p2score + 50;
                }
            } else {
                part.setActive(false);
                part.setVisible(false);
                part.setPosition(-1000, -1500);
                part.setVelocity(0, 0);
                this.makeBlast(shot.body.position.x, shot.body.position.y, 2);
                if (shot.shooter == 'player1') {
                    p1score = p1score + 200;
                } else if (shot.shooter == 'player2') {
                    p2score = p2score + 200;
                }
                if (part === bossweakspot) {
                    this.destroyBoss()
                }
            }
            p1scoreText.setText('P1 Score: ' + p1score.toString());
            p2scoreText.setText('P2 Score: ' + p2score.toString());
            shot.setPosition(-200, -200);
            shot.setVelocity(0, 0);
            shot.setActive(false);
            shot.setVisible(false);
            part.setVelocity(0, 0);
        }
    }

    bulletHit (ship, shot) {
        if (shot.active && ship.active) {
            this.makeBlast(shot.body.position.x, shot.body.position.y, 1);
            shot.setPosition(-200, -200);
            shot.setVelocity(0,0);
            shot.setActive(false);
            shot.setVisible(false);

            ship.setPosition(-200, -200);
            ship.setVelocity(0, 0);
            ship.setActive(false);
            ship.setVisible(false);

            if (ship.texture.key === 'player1' || (ship.texture.key === 'player2' && two_player)) {
                setTimeout(function () {
                    if (ship && ship.body) {
                        ship.setActive(true);
                        ship.setVisible(true);
                        ship.setPosition(pmath.Between(200, 600), pmath.Between(200, 400));
                        ship.setVelocity(0, 0);
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
        super('BossScene');
    }


    preload ()
    {
        this.load.plugin('rextexttypingplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttypingplugin.min.js', true);
        this.load.image('sky', 'static/assets/images/starbgv.png');
        this.load.image('player1', 'static/assets/images/blueship.png');
        this.load.image('player2', 'static/assets/images/blueship2.png');
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

        this.load.image('null', 'static/assets/images/null.png');
    }



    create ()
    {
        won = false;
        sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
        sky.setDepth(-999);

        bossbody = this.physics.add.sprite(0, 0, 'bossbody');
        bossleftwing = this.physics.add.sprite(-71, -16, 'bossleftwing');
        bossrightwing = this.physics.add.sprite(71, -16, 'bossrightwing');

        bossleftlaser = this.physics.add.sprite(-95, -86, 'bossleftlaser');
        bossleftlaser.healthpoints = 2;

        bossrightlaser = this.physics.add.sprite(95, -86, 'bossrightlaser');
        bossrightlaser.healthpoints = 2;

        bossgun = this.physics.add.sprite(0, -100, 'bossgun');
        bossgun.healthpoints = 2;

        bossweakspot = this.physics.add.sprite(0, -96, 'bossweakspot')
        bossweakspot.healthpoints = 2;

        boss = this.add.container(400, -100, [bossbody, bossleftwing, bossrightwing, bossleftlaser, bossrightlaser, bossgun, bossweakspot])
        boss.setDepth(-3)

        let p2text = 'P2 Press ENTER'
        if (two_player) {
            p2text = 'P2 Score: ' + p2score.toString();
        }

        p1scoreText = this.add.text(16, 16, 'P1 Score: ' + p1score.toString(), { fontSize: '32px', fill: '#a66f3c' });
        p2scoreText = this.add.text(16, 64, p2text, { fontSize: '32px', fill: '#a66f3c' });

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
        ships[0] = new Ship(ship, 100, 450, 1, 0);

        ship = this.physics.add.sprite(200, 500, 'player2');
        ship.setBounce(0.2);
        ship.setCollideWorldBounds(true);
        ships[1] = new Ship(ship, 200, 500, 1, 0);
        if (!two_player) {
            ships[1].ph.setActive(false);
            ships[1].ph.setVisible(false);
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


        this.physics.add.collider(ships[0].ph, ships[1].ph, null, null, this);
        this.physics.add.collider(ships[1].ph, ships[0].ph, null, null, this);
        this.physics.add.collider(ships[0].ph, badshots, this.bulletHit, null, this);
        this.physics.add.collider(ships[1].ph, badshots, this.bulletHit, null, this);

        this.physics.add.collider(bossgun, goodshots, this.bossHit, null, this);
        this.physics.add.collider(bossleftlaser, goodshots, this.bossHit, null, this);
        this.physics.add.collider(bossrightlaser, goodshots, this.bossHit, null, this);
        this.physics.add.collider(bossweakspot, goodshots, this.bossHit, null, this);


//        //enemy spawn timer
//        this.time.addEvent({
//            delay: 1000,
//            callback: function () {
//                spawnEnemy1(pmath.Between(100, 700), -100);
//                spawnEnemy2(pmath.Between(100, 700), -100);
//                spawnEnemy3(pmath.Between(100, 700), -100);
//                spawnEnemy4(pmath.Between(100, 700), -100);
//                spawnEnemy5(pmath.Between(100, 700), -100);
//            },
//            callbackScope: this,
//            loop: true
//        });

        this.time.addEvent({
            delay: 500,
            callback: function () {
                textbox.start("Boss\' text", 10);
                setTimeout(function () {
                    textbox.stop();
                }, 1300);
            },
            callbackScope: this,
            loop: false
        });
    }

    update ()
    {
        let sw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I).isDown;
        if (sw) {
            bossmode = false;
            this.scene.transition({
                target: 'TitleScene',
                duration: 500,
                moveBelow: true,
                onUpdate: this.transitionOut
            });
            demoMode = true;
        }
        if (bossmode) {
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
                p2scoreText.setText('P2 Score: ' + p2score.toString(), { fontSize: '32px', fill: '#a66f3c' });
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

            if (!won) {
                if (bossgun.active){
                    bossai1()
                } else {
                    bossai2()
                }
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
        }
    }
}






var demoShip;
var demoBadShips;
var demoEnemies = [];
var demoMode;
var title;
var topScore = 0;
var scoreText = '';

class TitleScene extends Phaser.Scene {

    bulletHit (ship, shot) {
        let blast = blasts.get(shot.body.position.x, shot.body.position.y);
        blast.setActive(true);
        blast.setVisible(true);
        blast.play('blast');
        explosion.play();
        shot.setPosition(-100, -100);
        shot.setVelocity(0,0);
        shot.setActive(false);
        shot.setVisible(false);

        ship.setPosition(-200, 0);
        ship.setVelocity(0, 0);
        ship.setActive(false);
        ship.setVisible(false);

        setTimeout(function () {
            if (blast) {
                blast.setActive(false);
                blast.setVisible(false);
                blast.setPosition(-100, -100);
            }
        }, 1000);

        if (ship.texture.key == 'player1' || (ship.texture.key == 'player2' && two_player)) {
            setTimeout(function () {
                if (ship && ship.body) {
                    ship.setActive(true);
                    ship.setVisible(true);
                    ship.setPosition(pmath.Between(200, 600), pmath.Between(200, 400));
                    ship.setVelocity(0, 0);
                }
            }, 1000);
        }
    }

    constructor ()
    {
        super('TitleScene');
    }


    preload ()
    {

    }



    create ()
    {
        demoMode = true;
        sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
        sky.setDepth(-999);
        //scoreText = this.add.text(16, 16, 'High Score: ' + topScore.toString(), { fontSize: '32px', fill: '#a66f3c' });
        title = this.add.tileSprite(400, 300, 800, 600, 'title');
        title.setDepth(999);

        let ship = this.physics.add.sprite(100, 500, 'player1');
        ship.setBounce(0.2);
        ship.setCollideWorldBounds(true);
        demoShip = ship;


        demoShip = new Ship(demoShip, 100, 500, 1, 0);
        demoShip.update = ai2;

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

        demoBadShips = this.physics.add.group({
            defaultKey: 'player3',
            maxSize: 20
        });

        this.physics.add.collider(demoShip.ph, badshots, this.bulletHit, null, this);

        //enemy spawn timer
        this.time.addEvent({
            delay: 500,
            callback: function() {
                if (demoMode) {
                    let randx = pmath.Between(200, 600);
                    let ship = demoBadShips.get(randx, -100); //this.physics.add.sprite(pmath.Between(0, 800), -100, 'player3');
                    ship.setBounce(0.6);
                    ship.setAngle(180)
                    ship.setRotation(pi)
                    if (ship.casing === undefined) { //if not created already
                        let enemy = new Ship(ship, ship.body.position.x, ship.body.position.y, 1, 0);
                        this.physics.add.collider(demoShip.ph, ship, null, null, this);
                        this.physics.add.collider(ship, goodshots, this.bulletHit, null, this);
                        demoBadShips.children.each(function (fellow) {
                            this.physics.add.collider(ship, fellow, null, null, this);
                        }.bind(this));
                        enemy.update = ai1;
                        ship.casing = enemy; //just to keep track of having been created already
                    }
                    ship.setActive(true);
                    ship.setVisible(true);
                    ship.casing.createTime = Date.now();
                    ship.casing.nonceTime = pmath.Between(0, 6000);
                    //enemy.update = ai2;
                    //enemy.targetShip = ships[Math.floor(Math.random() * 2)];
                    //enemy.ptx = pmath.Between(100, 700);
                    //enemy.pty = pmath.Between(100, 500);
                    //enemy.update = ai3;
                    //enemy.update = ai4;
                    demoEnemies.push(ship.casing);
                }
            },
            callbackScope: this,
            loop: true
        });
    }




    update ()
    {
        if (demoMode) {
            let sw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I).isDown;
            if (sw) {
                startMain.bind(this)();
                return;
            }

            // move sky
            sky.tilePositionY = sky.tilePositionY - 1;

            // get the movement for ship1
            const kb = this.input.keyboard;
            let spec =  kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown;
            if (spec) {
                //spec = false;
                //demoShip.update = function () {};
                //demoShip.ph.setActive(false);
                //demoShip.ph.setVisible(false);
                //demoMode = false;
                //normal_mode = true;
                //load next scene
                //this.scene.start('MainScene');
                startMain.bind(this)();
                return;
            }
            demoEnemies = demoEnemies.filter(function (item) {
                return item.ph.active && item.ph.body.position.y < 550;
            });

            //update the demoShip
            if (demoShip.targetShip === undefined || !demoShip.targetShip.ph.active || demoShip.targetShip.ph.body.position.y < -20 || demoShip.targetShip.ph.body.position.y > 500) {
                demoShip.targetShip = demoEnemies[Math.floor(Math.random(demoEnemies.length))];
            }
            demoShip.update(false, false, false, false, false, false);
            if (pmath.Between(0, 1000) < 30 && demoShip.targetShip.ph.body && demoShip.targetShip.ph.body.position.y > 0) {
                demoShip.shoot(false);
            }
            if (pmath.Between(0, 1000000) < 500 && demoShip.ph.active){
                demoShip.shoot(true);
            }


            // update and destroy enemies
            demoBadShips.children.each(function (enemy) {
                if (enemy.active) {
                    enemy.casing.update(false, false, false, false, false, false);
                    if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
                        enemy.setActive(false);
                        enemy.setVisible(false);
                        enemy.setVelocity(0, 0);
                    }
                }
            }.bind(this));

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




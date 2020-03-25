// This module holds the title scene for the game
var demoShip;
var demoBadShips;
var demoEnemies = [];
var demoMode;
var title;
var topScore = 0;
var scoreText = '';

class TitleScene extends Phaser.Scene {

    bulletHit (ship, shot) {
        // This is the collision function for when a bullet hits a ship
        const blast = blasts.get(shot.body.position.x, shot.body.position.y);
        blast.setActive(true);
        blast.setVisible(true);
        blast.play('blast');
        explosion.play();
        shot.setPosition(-100, -100);
        shot.setVelocity(0, 0);
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

        if (ship.texture.key === 'player1' || (ship.texture.key === 'player2' && twoPlayer)) {
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

    constructor () {
        super('TitleScene');
    }


    create () {
        // This loads the assets for the scene
        demoMode = true;
        sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
        sky.setDepth(-999);

        title = this.add.tileSprite(400, 300, 800, 600, 'title');
        title.setDepth(999);

        const ship = this.physics.add.sprite(100, 500, 'player1');
        ship.setBounce(0.2);
        ship.setCollideWorldBounds(true);
        demoShip = ship;

        demoShip = new Ship(demoShip, 100, 500, 1, 0);
        demoShip.update = AI2;

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

        demoBadShips = this.physics.add.group({
            defaultKey: 'player3',
            maxSize: 20
        });

        this.physics.add.collider(demoShip.ph, badShots, this.bulletHit, null, this);

        // enemy spawn timer
        this.time.addEvent({
            delay: 500,
            callback: function () {
                if (demoMode) {
                    const randx = pmath.Between(200, 600);
                    const ship = demoBadShips.get(randx, -100);
                    ship.setBounce(0.6);
                    ship.setAngle(180);
                    ship.setRotation(pi);
                    if (ship.casing === undefined) { // if not created already
                        const enemy = new Ship(ship, ship.body.position.x, ship.body.position.y, 1, 0);
                        this.physics.add.collider(demoShip.ph, ship, null, null, this);
                        this.physics.add.collider(ship, goodShots, this.bulletHit, null, this);
                        demoBadShips.children.each(function (fellow) {
                            this.physics.add.collider(ship, fellow, null, null, this);
                        }.bind(this));
                        enemy.update = AI1;
                        ship.casing = enemy; // just to keep track of having been created already
                    }
                    ship.setActive(true);
                    ship.setVisible(true);
                    ship.casing.createTime = Date.now();
                    ship.casing.nonceTime = pmath.Between(0, 6000);
                    demoEnemies.push(ship.casing);
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    update () {
        // This updates the scene state every game tick
        if (demoMode) {
            const sw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I).isDown;
            if (sw) {
                startMain.bind(this)();
                return;
            }

            // move sky
            sky.tilePositionY = sky.tilePositionY - 1;

            // get the movement for ship1
            const kb = this.input.keyboard;
            const spec = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown;
            if (spec) {
                startMain.bind(this)();
                return;
            }
            demoEnemies = demoEnemies.filter(function (item) {
                return item.ph.active && item.ph.body.position.y < 550;
            });

            // update the demoShip
            if (demoShip.targetShip === undefined || !demoShip.targetShip.ph.active || demoShip.targetShip.ph.body.position.y < -20 || demoShip.targetShip.ph.body.position.y > 500) {
                demoShip.targetShip = demoEnemies[Math.floor(Math.random(demoEnemies.length))];
            }
            demoShip.update(false, false, false, false, false, false);
            if (pmath.Between(0, 1000) < 30 && demoShip.targetShip.ph.body && demoShip.targetShip.ph.body.position.y > 0) {
                demoShip.shoot(false);
            }
            if (pmath.Between(0, 1000000) < 500 && demoShip.ph.active) {
                demoShip.shoot(true);
            }

            // update and destroy enemies
            demoBadShips.children.each(function (enemy) {
                if (enemy.active) {
                    enemy.casing.update(false, false, false, false, false, false);
                    if (offScreen(enemy.body.position.x, enemy.body.position.y)) {
                        enemy.setActive(false);
                        enemy.setVisible(false);
                        enemy.setVelocity(0, 0);
                    }
                }
            });

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

var ships = [];
var enemies = [];
var blasts;
var cursors;
var sky;
var dirt1;
var spaceheld = false;
var shiftpressed = 0;

var goodshots;
var badshots;

var normal_mode = true;

function offscreen(x, y) {
    if (x < -200 || y < -200 || x > 1000 || y > 800) {
        return true;
    }
    return false;
}

function makeShot (shipobj, spec=false) {
    function shootOne(shipobj, shot, angle, speed_scale, extra_speed, invertY=false) {
        const bod = shipobj.body;
        shot.setScale(0.7);
        shot.setActive(true);
        shot.setVisible(true);
        const x_vel = Math.cos(shipobj.rotation + angle) * extra_speed;
        const y_vel = Math.sin(shipobj.rotation + angle) * extra_speed;
        shot.setVelocityX(bod.velocity.x * speed_scale - x_vel);
        shot.setVelocityY(bod.velocity.y * speed_scale - y_vel);
        if (invertY) {
            shot.setVelocityX(shot.body.velocity.x * -1);
            shot.setVelocityY(shot.body.velocity.y * -1);
        }
        shot.setDepth(-1);
    }


    let shots = badshots
    if (shipobj.texture.key === 'player1' || shipobj.texture.key === 'player2') {
        shots = goodshots
    }
    const bod = shipobj.body;
    if (shipobj.active && shipobj.visible){
        if (!spec) {
            let shot = shots.get(bod.position.x + shipobj.width/2, bod.position.y + shipobj.height/2);
            if (shot) {
                shootOne(shipobj, shot, (Math.PI/2), 0.3, 600);
            }
        } else {
            const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
            for (let val of vals) {
                let shot = shots.get(bod.position.x + shipobj.width/2, bod.position.y + shipobj.height/2);
                if (shot) {
                    shootOne(shipobj, shot, ((val - 0.5) * (Math.PI/16)), 0.1, 100, true);
                }
            }
        }
    }
}

function pointsTo(angle, x1, y1, x2, y2, inaccuracy=0.5) {
    let dir = Phaser.Math.Angle.Between(x1, y1, x2, y2);
    min = Phaser.Math.Angle.Normalize(angle - inaccuracy);
    max = Phaser.Math.Angle.Normalize(angle + inaccuracy);
    dir = Phaser.Math.Angle.Normalize(dir);
    if (max - min < 0) {
        let temp = min;
        min = max;
        max = min;
    }
    if (min < dir && max > dir) {
        return true;
    }
    return false;
}

function ai1(shot, spec, up, down, right, left, inn, out) {
    //lazy binding allows 'this' to refer to the enemy ships when used as their update method.
    let phase = (Date.now() - this.createTime + this.nonceTime)/500;
    //this.ph.setVelocityY(200);
    //this.ph.setVelocityX(Math.cos(phase) * 200);
    this.rotate(Math.sin(phase - (Math.PI/4)));
    this.move(10, 3, 200, false);
    for (sh of ships) {
        if ( pointsTo(this.ph.rotation - (Math.PI/2), this.ph.body.position.x, this.ph.body.position.y, sh.ph.body.position.x, sh.ph.body.position.y, 0.1)) {
            if (Phaser.Math.Between(0, 20000) < 300) {
                this.shoot(false);
            }
        }
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

        if (ship.texture.key == 'player1' || ship.texture.key == 'player2') {
            setTimeout(function () {
                ship.setActive(true);
                ship.setVisible(true);
                ship.setPosition(Phaser.Math.Between(200, 600), Phaser.Math.Between(200, 400));
                ship.setVelocity(0, 0);
            }, 1000);
        }
    }




    preload ()
    {

        this.load.image('sky', 'static/assets/images/starbg.png');
        this.load.image('player1', 'static/assets/images/whiteship.png');
        this.load.image('player2', 'static/assets/images/greenship.png');
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
                    let ship = this.physics.add.sprite(Phaser.Math.Between(0, 800), -100, 'player3');
                    ship.setBounce(0.6);
                    let enemy = new Ship(ship, 900, ship.body.position.y, 1, 180);
                    this.physics.add.collider(ships[0].ph, ship, null, null, this);
                    this.physics.add.collider(ships[1].ph, ship, null, null, this);
                    this.physics.add.collider(ship, goodshots, this.bulletHit, null, this);
                    for (let fellow of enemies) {
                        this.physics.add.collider(ship, fellow.ph, null, null, this);
                    }
                    enemy.createTime = Date.now();
                    enemy.nonceTime = Phaser.Math.Between(0, 6000);
                    enemy.update = ai1;
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
        let cursors = this.input.keyboard.createCursorKeys();
        let kb = this.input.keyboard
        let left, right, up, down = false
        let fire = false;
        let spec = false;

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
        ships[1].update(fire, spec, up, down, right, left, false, false);

        // get the movement for ship2
        let w = this.input.keyboard.addKey('W');
        let a = this.input.keyboard.addKey('A');
        let s = this.input.keyboard.addKey('S');
        let d = this.input.keyboard.addKey('D');

        left = false;
        right = false;
        up = false;
        down = false;
        fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown;
        if (!fire) {
            spaceheld = false;
        }
        fire = fire && !spaceheld; //only fire on the first press

        spec = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT).isDown;
        if (Date.now() - shiftpressed < 6000) {
            spec = false; //only allow shift every 6 seconds
        }
        if (spec) {
            shiftpressed = Date.now();
        }

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
        ships[0].update(fire, spec, up, down, right, left, false, false);
        if (fire) {
            spaceheld = true;
        }


        // move offscreen enemies onscreen and delete enemies after exit.
        for (let enemy of enemies) {
            up = false;
            down = false;
            right = false;
            left = false;
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
    scene: MainScene
};

// start the game
var game = new Phaser.Game(config);


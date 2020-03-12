
function makeShot (shipobj, spec=false) {
    function shootOne(shipobj, shot, angle, speed_scale, extra_speed, invertY=false) {
        const bod = shipobj.body;
        shot.setScale(0.7);
        shot.setActive(true);
        shot.setVisible(true);
        const x_vel = Math.cos(shipobj.rotation + angle) * extra_speed;
        const y_vel = sin(shipobj.rotation + angle) * extra_speed;
        shot.setVelocityX(bod.velocity.x * speed_scale - x_vel);
        shot.setVelocityY(bod.velocity.y * speed_scale - y_vel);
        if (invertY) {
            shot.setVelocityX(shot.body.velocity.x * -1);
            shot.setVelocityY(shot.body.velocity.y * -1);
        }
        shot.setDepth(-1);
        shot.shooter = shipobj.texture.key;
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
                shootOne(shipobj, shot, (pi/2), 0.3, 600);
            }
        } else {
            const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
            for (let val of vals) {
                let shot = shots.get(bod.position.x + shipobj.width/2, bod.position.y + shipobj.height/2);
                if (shot) {
                    shootOne(shipobj, shot, ((val - 0.5) * (pi/16)), 0.1, 100, true);
                }
            }
        }
    }
}

function pointsTo(angle, x1, y1, x2, y2, inaccuracy=0.5) {
    let dir = pmath.Angle.Between(x1, y1, x2, y2);
    min = pmath.Angle.Normalize(angle - inaccuracy);
    max = pmath.Angle.Normalize(angle + inaccuracy);
    dir = pmath.Angle.Normalize(dir);
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

function rotateToPoint(ship, x, y, amt){
    let target = pmath.Angle.Between(ship.ph.body.position.x, ship.ph.body.position.y, x, y);
    let next = pmath.Angle.RotateTo(ship.ph.rotation, target, amt);
    ship.ph.setRotation(next + pi/2);
    ship.ph.setAngle((180/pi) * (next + pi/2));
}

function moveToPoint(ship, x, y, amt, max, rotamt) {
    rotateToPoint(ship, x, y, rotamt);
    ship.move(amt, 0, max, false);
}

function ai1(shot, spec, up, down, right, left) {
    //lazy binding allows 'this' to refer to the enemy ships when used as their update method.
    let phase = (Date.now() - this.createTime + this.nonceTime)/500;
    //this.ph.setVelocityY(200);
    //this.ph.setVelocityX(Math.cos(phase) * 200);
    this.rotate(sin(phase - (pi/4)));
    this.move(10, 3, 200, false);
    let shs = ships;
    if (demoMode) {
        shs = [demoShip];
    }
    for (sh of shs) {
        if (sh.ph.active && sh.ph.visible) {
            if (pointsTo(this.ph.rotation - (pi/2), this.ph.body.position.x, this.ph.body.position.y, sh.ph.body.position.x, sh.ph.body.position.y, 0.1)) {
                if (pmath.Between(0, 20000) < 300) {
                    this.shoot(false);
                }
            }
        }
    }
}

function ai2(shot, spec, up, down, right, left) {
    if (this.targetShip === undefined || this.targetShip.ph.active === false) {
        this.targetShip = ships[Math.floor(Math.random(2))];
        if (this.targetShip === undefined) {
            this.targetShip = {"ph": {"active": false}};
        }
        return
    }
    let xdist = this.targetShip.ph.body.position.x - this.ph.body.position.x;
    let ydist = this.targetShip.ph.body.position.y - this.ph.body.position.y;
    let dist = Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));


    rotateToPoint(this, this.targetShip.ph.body.position.x, this.targetShip.ph.body.position.y, 60);
    if (dist > 100) {
        moveToPoint(this, this.targetShip.ph.body.position.x, this.targetShip.ph.body.position.y, 2, 120, 60);
        if (pmath.Between(0, 6000) > 5990) {
            this.shoot(false);
        }
    } else if (dist < 80) {
        this.move(5, 0, 100, true);
    }
}
function ai3(shot, spec, up, down, right, left) {
    if (this.ph.body.position.x === this.ptx && this.ph.body.position.y === this.pty) {
        this.ptx = pmath.Between(100, 700);
        this.pty = pmath.Between(100, 500);
    }
    moveToPoint(this, this.ptx, this.pty, 5, 400, 10);
}
function ai4(shot, spec, up, down, right, left) {
    let xdist = this.targetShip.ph.body.position.x - this.ph.body.position.x;
    let ydist = this.targetShip.ph.body.position.y - this.ph.body.position.y;
    let dist = Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));

    if (this.targetShip.ph.active === false) {
        this.targetShip = ships[Math.floor(Math.random(2))];
        return
    }
    if (dist < 400 && this.ptx == null && this.pty == null) {
        this.ptx = pmath.Between(100, 700);
        this.pty = pmath.Between(100, 500);
    }
    if (dist < 400) {
        if (this.ph.body.position.x === this.ptx && this.ph.body.position.y === this.pty) {
            this.ptx = pmath.Between(100, 700);
            this.ptx = pmath.Between(100, 500);
        }
        moveToPoint(this, this.ptx, this.pty, 20, 300, 10);
    }else{
        this.ptx = null;
        this.pty = null;
        rotateToPoint(this, this.targetShip.ph.body.position.x, this.targetShip.ph.body.position.y, 10);
        this.move(3, 2, 300, false);
        if (pmath.Between(0, 6000) > 5996) {
            this.shoot(false);
        }
    }
}

class Ship { 
    constructor(phship, x, y, scale, rot) {
        this.ph = phship;
        this.scale = scale;
        this.vel_max = 500;
        this.shotspeed = 1000;
        this.rotate(rot);
    }

    update(fire, spec, up=false, down=false, right=false, left=false) {

        const acc = 10
        const dec = 3

        if (down) {
            this.move(acc, dec, this.vel_max, true);
        } else if (up) {
            this.move(acc, dec, this.vel_max, false);
        }

        if (left) {
            this.rotate(-5);
        } else if (right) {
            this.rotate(5);
        }


        if (fire || spec) {
            this.shoot(spec);
        }
    }

    move (acc=10, dec=3, max_vel=this.vel_max, back=false) {
        // move forward or backwards (and decelerate)
        const ang = this.ph.rotation;
        const xacc = Math.cos(ang + (Math.PI/2)) * acc
        const yacc = Math.sin(ang + (Math.PI/2)) * acc

        const x_max = Math.cos(ang + (Math.PI/2)) * max_vel;
        const y_max = Math.sin(ang + (Math.PI/2)) * max_vel;

        if (back) {
            this.accel(xacc, yacc, max_vel);
        } else {
            this.accel(-xacc, -yacc, max_vel);
        }

        this.decel(dec);
    }

    accel(x, y, max) {
        let x_vel = this.ph.body.velocity.x + x + 0.000001;
        let y_vel = this.ph.body.velocity.y + y + 0.000001;

        let x_max = (x_vel * max) / Math.sqrt(Math.pow(x_vel, 2) + Math.pow(y_vel, 2))
        let y_max = (y_vel * max) / Math.sqrt(Math.pow(x_vel, 2) + Math.pow(y_vel, 2))

        if (Math.abs(x_max) < Math.abs(x_vel)) {
            x_vel = x_max;
        }
        if (Math.abs(y_max) < Math.abs(y_vel)) {
            y_vel = y_max;
        }

        this.ph.setVelocityX(x_vel);
        this.ph.setVelocityY(y_vel);
    }

    decel(amt) {
        let xvel = this.ph.body.velocity.x;
        let yvel = this.ph.body.velocity.y;
        const xvel1 = Math.abs(xvel) + 0.00001;
        const yvel1 = Math.abs(yvel) + 0.00001;

        const z = Math.sqrt(Math.pow(xvel1, 2) + Math.pow(yvel1, 2));
        const z2 = Math.max(z - amt, 0);

        const x2 = (z2 * xvel) / z;
        const y2 = (z2 * yvel) / z;

        let xfunc = Math.max;
        let yfunc = Math.max;

        if (xvel < 0) {
            xfunc = Math.min;
        }
        if (yvel < 0) {
            yfunc = Math.min;
        }

        xvel = xfunc(x2, 0);
        yvel = yfunc(y2, 0);

        this.ph.setVelocityX(xvel);
        this.ph.setVelocityY(yvel);
    }

    rotate(angle) {
        let newangle = this.ph.angle + angle;

        if (newangle > 180) {
            newangle = newangle - 360;
        }

        if (newangle < -180) {
            newangle = newangle + 360;
        }
        this.ph.setAngle(newangle);
        newangle = (newangle/180) * Math.PI //radian conversion
        this.ph.setRotation(newangle);

    }


    scale(scale) {

    }

    shoot(spec=false) {
        if (!spec) {
            makeShot(this.ph);
        } else {
            makeShot(this.ph, spec);
        }
    }
}

// This module holds the class and logic for the standard-type ships

var simpleControl = true;

function makeShot (shipObj, spec = false) {
    // This function makes a normal or special shot from a given shipObj
    function shootOne (shipObj, shot, angle, speedScale, extraSpeed, invertY = false) {
        // This function shoots a single bullet from the given shipObj with extra specifics
        const bod = shipObj.body;
        shot.setScale(0.7);
        shot.setActive(true);
        shot.setVisible(true);
        const xVel = cos(shipObj.rotation + angle) * extraSpeed;
        const yVel = sin(shipObj.rotation + angle) * extraSpeed;
        shot.setVelocityX(bod.velocity.x * speedScale - xVel);
        shot.setVelocityY(bod.velocity.y * speedScale - yVel);
        if (invertY) {
            shot.setVelocityX(shot.body.velocity.x * -1);
            shot.setVelocityY(shot.body.velocity.y * -1);
        }
        shot.setDepth(-1);
        shot.shooter = shipObj.texture.key;
        laser.play();
    }

    let shots = badShots;
    if (shipObj.texture.key === 'player1' || shipObj.texture.key === 'player2') {
        shots = goodShots;
    }
    const bod = shipObj.body;
    if (shipObj.active && shipObj.visible) {
        if (!spec) {
            const shot = shots.get(bod.position.x + shipObj.width / 2, bod.position.y + shipObj.height / 2);
            if (shot) {
                shootOne(shipObj, shot, (pi / 2), 0.3, 600);
            }
        } else {
            const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
            for (const val of vals) {
                const shot = shots.get(bod.position.x + shipObj.width / 2, bod.position.y + shipObj.height / 2);
                if (shot) {
                    shootOne(shipObj, shot, ((val - 0.5) * (pi / 16)), 0.1, 100, true);
                }
            }
        }
    }
}

function pointsTo (angle, x1, y1, x2, y2, inaccuracy = 0.5) {
    // This function checks if x1 y1 to x2 y2 is within allowable inaccuracy of angle
    let dir = pmath.Angle.Between(x1, y1, x2, y2);
    min = pmath.Angle.Normalize(angle - inaccuracy);
    max = pmath.Angle.Normalize(angle + inaccuracy);
    dir = pmath.Angle.Normalize(dir);
    if (max - min < 0) {
        const temp = min;
        min = max;
        max = min;
    }
    if (min < dir && max > dir) {
        return true;
    }
    return false;
}

function rotateToPoint (ship, x, y, amt) {
    // This rotates the ship to point towards x and y by the given radians maximum
    const target = pmath.Angle.Between(ship.ph.body.position.x, ship.ph.body.position.y, x, y);
    const next = pmath.Angle.RotateTo(ship.ph.rotation, target, amt);
    ship.ph.setRotation(next + pi / 2);
    ship.ph.setAngle((180 / pi) * (next + pi / 2));
}

function moveToPoint (ship, x, y, amt, max, rotAmt) {
    // This rotates the ship towards the point and moves towards it as well
    rotateToPoint(ship, x, y, rotAmt);
    ship.move(amt, 0, max, false);
}

function AI1 (shot, spec, up, down, right, left) {
    // This is AI update function #1
    // lazy binding allows 'this' to refer to the enemy ships when used as their update method.
    const phase = (Date.now() - this.createTime + this.nonceTime) / 500;
    // this.ph.setVelocityY(200);
    // this.ph.setVelocityX(Math.cos(phase) * 200);
    this.rotate(sin(phase - (pi / 4)));
    this.move(10, 3, 200, false);
    let shs = ships;
    if (demoMode) {
        shs = [demoShip];
    }
    for (sh of shs) {
        if (sh.ph.active && sh.ph.visible) {
            if (pointsTo(this.ph.rotation - (pi / 2), this.ph.body.position.x, this.ph.body.position.y, sh.ph.body.position.x, sh.ph.body.position.y, 0.1)) {
                if (pmath.Between(0, 20000) < 300) {
                    this.shoot(false);
                }
            }
        }
    }
}

function AI2 (shot, spec, up, down, right, left) {
    // This is AI update function #2
    if (this.targetShip === undefined || this.targetShip.ph.active === false) {
        this.targetShip = ships[Math.floor(Math.random(2))];
        if (this.targetShip === undefined) {
            this.targetShip = { ph: { active: false } };
        }
        return;
    }
    const xDist = this.targetShip.ph.body.position.x - this.ph.body.position.x;
    const yDist = this.targetShip.ph.body.position.y - this.ph.body.position.y;
    const dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

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
function AI3 (shot, spec, up, down, right, left) {
    // This is AI update function #3
    if (this.ph.body.position.x === this.ptx && this.ph.body.position.y === this.pty) {
        this.ptx = pmath.Between(100, 700);
        this.pty = pmath.Between(100, 500);
    }
    moveToPoint(this, this.ptx, this.pty, 5, 400, 10);
}
function AI4 (shot, spec, up, down, right, left) {
    // This is AI update function #4
    const xdist = this.targetShip.ph.body.position.x - this.ph.body.position.x;
    const ydist = this.targetShip.ph.body.position.y - this.ph.body.position.y;
    const dist = Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
    const off = offScreen(this.ph.body.position.x, this.ph.body.position.y);

    if (this.targetShip.ph.active === false) {
        this.targetShip = ships[Math.floor(Math.random(2))];
        return;
    }
    if ((dist < 300 || off) && this.ptx == null && this.pty == null) {
        this.ptx = pmath.Between(100, 700);
        this.pty = pmath.Between(100, 500);
    }
    if (dist < 300 || off) {
        const thisX = this.ph.body.position.x;
        const thisY = this.ph.body.position.y;
        const xDist = Math.abs(thisX - this.ptx);
        const yDist = Math.abs(thisY - this.pty);
        if (xDist < 30 && yDist < 30) {
            this.ptx = pmath.Between(100, 700);
            this.pty = pmath.Between(100, 500);
        }
        moveToPoint(this, this.ptx, this.pty, 20, 300, 10);
    } else {
        this.ptx = null;
        this.pty = null;
        rotateToPoint(this, this.targetShip.ph.body.position.x, this.targetShip.ph.body.position.y, 10);
        this.move(3, 2, 20, false);
        if (pmath.Between(0, 6000) > 5990) {
            this.shoot(false);
        }
    }
}

function AI5 (shot, spec, up, down, right, left) {
    // This is AI update function #5
    if (this.targetShip.ph.active === false) {
        this.targetShip = ships[Math.floor(Math.random(2))];
        return;
    }

    if (this.ptx && this.pty) {
        moveToPoint(this, this.ptx, this.pty, 10, 400, 10);
    }
    const thisX = this.ph.body.position.x;
    const thisY = this.ph.body.position.y;
    let xDist = Math.abs(thisX - this.ptx);
    let yDist = Math.abs(thisY - this.pty);
    if (xDist < 30 && yDist < 30) {
        this.ptx = false;
        this.pty = false;
    }
    xDist = Math.abs(thisX - this.targetShip.ph.body.position.x);
    yDist = Math.abs(thisY - this.targetShip.ph.body.position.y);
    if (xDist > 300 && yDist > 300) {
        let xDist = pmath.Between(-100, -50);
        if (this.targetShip.ph.body.position.x - this.ptx < 0) {
            xDist = pmath.Between(50, 100);
        }
        this.ptx = this.targetShip.ph.body.position.x + xDist;
        this.pty = this.targetShip.ph.body.position.y;
    }
    if (!this.ptx || !this.pty) {
        rotateToPoint(this, this.targetShip.ph.body.x, this.targetShip.ph.body.y, 10);
        this.move(3, 0, 200, true);
        this.burst = this.burst || 10;
        if (this.burst < 10) {
            this.shoot(false);
            this.burst = this.burst + 1;
        }
        if (pmath.Between(0, 100000) < 300) {
            this.burst = 1;
        }
    }
}

class Ship {
    constructor (phShip, x, y, scale, rot) {
        this.ph = phShip;
        this.scale = scale;
        this.velMax = 500;
        this.shotSpeed = 1000;
        this.rotate(rot);
    }

    update (fire, spec, up = false, down = false, right = false, left = false) {
        // This is the ship specific update function.
        // Typically it gets called every game tick from the update method of whichever scene is active.
        const acc = 10;
        const dec = 3;

        if (simpleControl) {
            this.ph.setRotation(0);
        }

        if (down) {
            this.move(acc, dec, this.velMax, true);
        } else if (up) {
            this.move(acc, dec, this.velMax, false);
        }

        if (left) {
            if (simpleControl) {
                this.accel(-acc, 0, this.velMax);
            } else {
                this.rotate(-5);
            }
        } else if (right) {
            if (simpleControl) {
                this.accel(acc, 0, this.velMax);
            } else {
                this.rotate(5);
            }
        }

        if (fire || spec) {
            this.shoot(spec);
        }
    }

    move (acc = 10, dec = 3, maxVel = this.velMax, back = false) {
        // move forward or backwards (and decelerate)
        const ang = this.ph.rotation;
        const xAcc = cos(ang + (pi / 2)) * acc;
        const yAcc = sin(ang + (pi / 2)) * acc;

        const xMax = cos(ang + (pi / 2)) * maxVel;
        const yMax = sin(ang + (pi / 2)) * maxVel;

        if (back) {
            this.accel(xAcc, yAcc, maxVel);
        } else {
            this.accel(-xAcc, -yAcc, maxVel);
        }

        this.decel(dec);
    }

    accel (x, y, max) {
        // Accelerate x amt and y amt up to max magnitude of velocity in all directions
        let xVel = this.ph.body.velocity.x + x + 0.000001;
        let yVel = this.ph.body.velocity.y + y + 0.000001;

        const xMax = (xVel * max) / Math.sqrt(Math.pow(xVel, 2) + Math.pow(yVel, 2));
        const yMax = (yVel * max) / Math.sqrt(Math.pow(xVel, 2) + Math.pow(yVel, 2));

        if (Math.abs(xMax) < Math.abs(xVel)) {
            xVel = xMax;
        }
        if (Math.abs(yMax) < Math.abs(yVel)) {
            yVel = yMax;
        }

        this.ph.setVelocityX(xVel);
        this.ph.setVelocityY(yVel);
    }

    decel (amt) {
        // Decelerate towards 0 by the given amount
        let xVel = this.ph.body.velocity.x;
        let yVel = this.ph.body.velocity.y;
        const xVel1 = Math.abs(xVel) + 0.00001;
        const yVel1 = Math.abs(yVel) + 0.00001;

        const z = Math.sqrt(Math.pow(xVel1, 2) + Math.pow(yVel1, 2));
        const z2 = Math.max(z - amt, 0);

        const x2 = (z2 * xVel) / z;
        const y2 = (z2 * yVel) / z;

        let xFunc = Math.max;
        let yFunc = Math.max;

        if (xVel < 0) {
            xFunc = Math.min;
        }
        if (yVel < 0) {
            yFunc = Math.min;
        }

        xVel = xFunc(x2, 0);
        yVel = yFunc(y2, 0);

        this.ph.setVelocityX(xVel);
        this.ph.setVelocityY(yVel);
    }

    rotate (angle) {
        // Rotate by the given angle
        let newAngle = this.ph.angle + angle;

        if (newAngle > 180) {
            newAngle = newAngle - 360;
        }

        if (newAngle < -180) {
            newAngle = newAngle + 360;
        }
        this.ph.setAngle(newAngle);
        newAngle = (newAngle / 180) * pi; // radian conversion
        this.ph.setRotation(newAngle);
    }


    shoot (spec = false) {
        // This shoots the ship's gun
        if (!spec) {
            makeShot(this.ph);
        } else {
            makeShot(this.ph, spec);
        }
    }
}

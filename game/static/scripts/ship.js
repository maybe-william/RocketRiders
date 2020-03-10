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

class Ship {
    constructor(phship, x, y, scale, rot) {
        this.x = x;
        this.y = y;

        this.x_vel = 0;
        this.y_vel = 0;

        this.vel_max = 1000;
        this.vel_min = -1000;

        this.scale = scale;
        this.ph = phship;
        this.trueAngle = 0;
        this.rotate(rot);
    }

    update(fire, spec, up=false, down=false, right=false, left=false, inn=false, out=false) {

        const acc = 10
        const dec = 3
        const ang = this.ph.rotation;
        const xacc = Math.cos(ang + (Math.PI/2)) * acc
        const yacc = Math.sin(ang + (Math.PI/2)) * acc
        if (left) {
            this.accel(xacc, yacc);
        } else if (right) {
            this.accel(-xacc, -yacc);
        }

        if (up) {
            this.rotate(-5);
        } else if (down) {
            this.rotate(5);
        }

        this.decel(dec);
    }

    accel(x, y) {
        this.x_vel = Math.max(Math.min(this.ph.body.velocity.x + x, this.vel_max), this.vel_min);
        this.y_vel = Math.max(Math.min(this.ph.body.velocity.y + y, this.vel_max), this.vel_min);

        this.ph.setVelocityX(this.x_vel);
        this.ph.setVelocityY(this.y_vel);
    }

    decel(amt) {
        console.log(' ');
        const xvel = this.ph.body.velocity.x;
        const yvel = this.ph.body.velocity.y;
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

        this.x_vel = xfunc(x2, 0);
        this.y_vel = yfunc(y2, 0);

        this.ph.setVelocityX(this.x_vel);
        this.ph.setVelocityY(this.y_vel);
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
    }
}

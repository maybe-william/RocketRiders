class Ship {
    constructor(phship, x, y, scale, rot) {
        this.x = x;
        this.y = y;

        this.x_vel = 0;
        this.y_vel = 0;

        this.vel_max = 1000;
        this.vel_min = -1000;

        this.scale = scale;
        this.rot = rot;
        this.ph = phship;
        this.trueAngle = 0;
    }

    update(fire, spec, up=false, down=false, right=false, left=false, inn=false, out=false) {

        const acc = 10
        const ang = this.ph.rotation;
        const xacc = Math.cos(ang + (Math.PI/2)) * acc
        const yacc = Math.sin(ang + (Math.PI/2)) * acc
        if (left) {
            this.accel(xacc, yacc);
        } else if (right) {
            this.accel(-xacc, -yacc);
        } else {
            this.decel(3, 0);
        }

        if (up) {
            this.rotate(-10);
        } else if (down) {
            this.rotate(10);
        } else {
            this.decel(0, 3)
        }
    }

    accel(x, y) {
        this.x_vel = Math.max(Math.min(this.x_vel + x, this.vel_max), this.vel_min);
        this.y_vel = Math.max(Math.min(this.y_vel + y, this.vel_max), this.vel_min);

        this.ph.setVelocityX(this.x_vel);
        this.ph.setVelocityY(this.y_vel);
    }

    decel(x, y) {
        let xfunc = Math.max
        let yfunc = Math.max
        if (this.x_vel < 0) {
            x = -x;
            xfunc = Math.min;
        }
        if (this.y_vel < 0) {
            y = -y;
            yfunc = Math.min;
        }

        this.x_vel = xfunc(this.x_vel - x, 0);
        this.y_vel = yfunc(this.y_vel - y, 0);

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

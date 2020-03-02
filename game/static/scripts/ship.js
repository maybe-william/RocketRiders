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
    }

    update(fire, spec, up=false, down=false, right=false, left=false, inn=false, out=false) {
        if (left) {
            this.accel(-10, 0);
        } else if (right) {
            this.accel(10, 0);
        } else {
            this.decel(3, 0);
        }

        if (up) {
            this.accel(0, -10);
        } else if (down) {
            this.accel(0, 10);
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
    }

    scale(scale) {

    }

    shoot(spec=false) {
    }
}

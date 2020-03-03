class Ship {
    constructor(phship, x, y, scale, rot) {
        this.x = x;
        this.y = y;

        this.accelX = 0;
        this.accelY = 10;
    
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
        let aX = this.accelX;
        let aY = this.accelY;

        if (left) {
            this.accel(aX, aY);
        } else if (right) {
            this.accel(-aX, -aY);
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
        //this.print(this.x_vel)
        //this.print(this.y_vel)
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

    rotate(angle, down) {
        let otherangle = 90 + angle - 180;

        // const arry = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        // let high = arry.length - 1;
        // let low = 9;

        // if (down) {

        //     this.accelX = arry[high];
        //     this.accelY = arry[low];
        // } else {
        //     this.accelX = arry[high];
        //     this.accelY = arry[low];
        // }

        this.ph.setAngle(this.trueAngle += angle)
        // this.print(this.trueAngle)
        // Direction Math
        if (this.trueAngle < 0) {
            this.trueAngle += 360;
        }
        if (this.trueAngle > 360) {
            this.trueAngle = 0;
        }
        if (this.trueAngle < -360) {
            this.trueAngle = 0;
        }
        if (this.trueAngle == 360) {
            this.trueAngle = 0;
        }

        this.accelX = Math.cos(angle) * 20;
        this.accelY = Math.sin(angle) * 20;
        const txt = `x is ${this.accelX} y is ${this.accelY}`;
        print('lol')
        // if (this.trueAngle == 0) {
        //     this.accelX = 0;
        //     this.accelY = 10;
        // } else if (this.trueAngle == 90) {
        //     this.accelX = -10;
        //     this.accelY = 0;
        // } else if (this.trueAngle == 180) {
        //     this.accelX = 0;
        //     this.accelY = -10;
        // } else if (this.trueAngle == 270) {
        //     this.accelX = 10;
        //     this.accelY = 0;
        // }
        
        
        // else if (this.trueAngle > 0 && this.trueAngle < 90) {
        //     if (-10 < this.accelX < 10) {
        //         this.accelX -= 1;
        //     }
        //     if (-10 < this.accelY < 10) {
        //         this.accelY += 1;
        //     }
        // } else if (this.trueAngle > 90 && this.trueAngle < 180) {
        //     if (-10 < this.accelX < 10) {
        //         this.accelX += 1;
        //     }
        //     if (-10 < this.accelY < 10 ) {
        //         this.accelY -= 1;
        //     }
        // }
    }

    print(lol) {
        texty.setText(lol)
    }

    scale(scale) {

    }

    shoot(spec=false) {
    }
}

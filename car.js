class Car {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("carSprites.png");
        // Direction of the car in degrees
        this.direction = 0;
        this.MAX_ANGLE = 22.5;
        this.speed = 0.2;
        this.animations = [
          new Animator(this.spritesheet, 70 * 3, 0, 70, 40, 2, 50, 0, true,  true),
          new Animator(this.spritesheet, 70 * 2, 0, 70, 40, 2, 50, 0, true,  true),
          new Animator(this.spritesheet, 70 * 1, 0, 70, 40, 2, 50, 0, true,  true),
          new Animator(this.spritesheet, 0,      0, 70, 40, 2, 50, 0, 0,     true),
          new Animator(this.spritesheet, 70 * 1, 0, 70, 40, 2, 50, 0, false, true),
          new Animator(this.spritesheet, 70 * 2, 0, 70, 40, 2, 50, 0, false, true),
          new Animator(this.spritesheet, 70 * 3, 0, 70, 40, 2, 50, 0, false, true)
        ];
        this.autoDirection = -1;
    }

    get radianAngle() {
        return this.direction * (Math.PI / 180);
    }

    update() {
        if (this.game.right && !this.game.left) {
            this.autoDirection = 0;
            // going right
            this.direction += 60 * this.game.clockTick;
        } else if (!this.game.right && this.game.left) {
            this.autoDirection = 0;
            // going left
            this.direction -= 60 * this.game.clockTick;
        }

        if (this.autoDirection != 0) {
            if (this.autoDirection == -1) {
                this.direction -= 60 * this.game.clockTick;
            } else if (this.autoDirection == 1) {
                this.direction += 60 * this.game.clockTick;
            }
            if (this.direction > this.MAX_ANGLE) {
                // we've gone all the way one direcion, start going back
                this.autoDirection = -1;
            } else if (this.direction < -this.MAX_ANGLE) {
                this.autoDirection = 1;
            }
        }

        this.direction = Math.max(this.direction, -this.MAX_ANGLE);
        this.direction = Math.min(this.direction, this.MAX_ANGLE);
    }

    draw(ctx) {
        // Pick which sprite based on direction
        let spriteChoice = Math.round((this.direction + this.MAX_ANGLE) / (this.MAX_ANGLE / 3));
        this.animations[spriteChoice].drawFrame(this.game.clockTick * 1000, ctx, ctx.canvas.width / 2 - 70, 380, 2);
    }
}

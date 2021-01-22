class Car {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("carSprites.png");
        // Direction of the car in degrees
        this.direction = 0;
        this.MAX_ANGLE = 22.5;
        this.speed = 0.2;
    }

    get radianAngle() {
        return this.direction * (Math.PI / 180)
    }

    update() {
        if (this.game.right && !this.game.left) {
            // going right
            this.direction += 60 * this.game.clockTick;
        } else if (!this.game.right && this.game.left) {
            // going left
            this.direction -= 60 * this.game.clockTick;
        }

        this.direction = Math.max(this.direction, -this.MAX_ANGLE);
        this.direction = Math.min(this.direction, this.MAX_ANGLE);
    }

    draw(ctx) {
        // Pick which sprite based on direction
        let absDirection = Math.abs(this.direction);
        let spriteChoice = Math.floor(3 * (absDirection / this.MAX_ANGLE));
        ctx.save();
        if (this.direction < 1) {
          ctx.scale(-1, 1);
          ctx.drawImage(this.spritesheet, 
                        spriteChoice * 70, 0,
                        70, 40,
                        -70 * 2 - ctx.canvas.width / 2 + 70 * 2 / 2, 0 + 350, 
                        70 * 2, 40 * 2);
        } else {
          ctx.drawImage(this.spritesheet, 
                        spriteChoice * 70, 0, 
                        70, 40, 
                        0 + ctx.canvas.width / 2 - 70 * 2 / 2, 0 + 350, 
                        70 * 2, 40 * 2);
        }
        ctx.restore();
    }
}

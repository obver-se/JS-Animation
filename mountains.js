class Mountains {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        // Radius of sun in pixels, also the height 
        // because we are only drawing half a circle.
        this.offset = 0.0;
        this.RUGGEDNESS = 20;
        this.mountains = this.generateMountains();
    }

    generateMountains() {
        let mountains = [];
        mountains.push(- Math.max(((Math.random() - 0.5) * this.RUGGEDNESS), 0));

        for (var i = 0; i < 256; i++) {
            mountains.push(Math.min(mountains[i - 1] - ((Math.random() - 0.5) * this.RUGGEDNESS), 0));
        }

        return mountains;
    }

    update() {
    }

    getMountainHeight(x) {
        //x %= 10 * this.mountains.length);
        
        return this.mountains[Math.round(x / 10) % this.mountains.length];
    }

    draw(ctx) {
        ctx.fillSytle = '#fff';
        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height / 2);
        for (let x = -20 + (this.offset % 10); x <= ctx.canvas.width + 20; x += 10) {
            ctx.lineTo(x, ctx.canvas.height / 2 + this.getMountainHeight(x - this.offset));
        }
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
    }
}

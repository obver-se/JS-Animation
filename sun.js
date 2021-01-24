class Sun {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        // Radius of sun in pixels, also the height 
        // because we are only drawing half a circle.
        this.RADIUS = 200;
        this.START_COLOR = [255, 165, 0];
        this.END_COLOR = [255, 0, 255];
        this.offset = 0;
    }


    colorMix(first, second, progress) {
        // I know this isn't how you're supposed to mix colors
        let inverseProgress = 1 - progress
        let r = (first[0] * inverseProgress + second[0] * progress) / 2;
        let g = (first[1] * inverseProgress + second[1] * progress) / 2;
        let b = (first[2] * inverseProgress + second[2] * progress) / 2;

        return `rgb(${r}, ${g}, ${b})`;
    }

    update() {
        this.offset -= .05;
        this.offset %= 6;
    }

    draw(ctx) {
        // Draw the suns sections
        for (let i = 0; i < this.RADIUS; i++) {
            let normalizedProgress = i / this.RADIUS;
            ctx.strokeStyle = this.colorMix(this.START_COLOR, this.END_COLOR, normalizedProgress);
            ctx.beginPath();
            if (Math.round(i / (6 * (normalizedProgress + 1)) + this.offset) % 3) {
                let lineY = (this.RADIUS - i)
                let circleWidthAtI = Math.sqrt(1 - Math.pow(1 - normalizedProgress, 2)) * this.RADIUS;
                ctx.moveTo(ctx.canvas.width / 2 - circleWidthAtI, ctx.canvas.height / 2 - lineY);
                ctx.lineTo(ctx.canvas.width / 2 + circleWidthAtI, ctx.canvas.height / 2 - lineY);
            }
            ctx.stroke();
        }
    }
}

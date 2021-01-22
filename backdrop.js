class BackDrop {
    constructor(game) {
        Object.assign(this, {game});
        // How many 'vertical' lines to draw 'must be even'
        this.LINE_COUNT = 64;
        this.HORIZONTAL_LINES = 32;
        // The space between the lines at the bottom of the canvas
        this.LINE_SPACING = 64;
        this.xOffset = 0;
        this.yOffset = 0;
        this.car = new Car(game, 0, 0);
    }

    update() {
        // the offset update depends on which direction the car is headed
        let xProp = -Math.sin(this.car.radianAngle);
        this.xOffset += 0.1 * xProp
        this.xOffset %= 1;
        let yProp = Math.cos(this.car.radianAngle);
        this.yOffset += Math.abs(0.1 * yProp);
        this.yOffset %= 1;
        this.car.update();
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.strokeStyle = 'purple';
        ctx.beginPath();

        // Draw lines from the center outward
        for (let i = this.xOffset; i <= this.LINE_COUNT; i++) {
            // Progress is a value between -1 and 1 indicating how far across the screen we are
            let progress = (i - this.LINE_COUNT / 2) / (this.LINE_COUNT / 2) * 4
            let x = progress * (ctx.canvas.width * 2);

            let slope = (ctx.canvas.height / 2) / x;
            let startX = 30 / slope;
            let startY = 0;

            ctx.moveTo(ctx.canvas.width / 2 + startX, ctx.canvas.height / 2 + startY);
            ctx.lineTo(ctx.canvas.width / 2 + x, ctx.canvas.height);
        }

        // Draw horizontal lines lines
        for (let i = 0 + this.yOffset; i < this.HORIZONTAL_LINES; i++) {
            let y = Math.tan((i / this.HORIZONTAL_LINES) * (Math.PI / 2)) * (ctx.canvas.height / 2) ;
            y += (ctx.canvas.height / 2);
            ctx.moveTo(0, y);
            ctx.lineTo(ctx.canvas.width, y);
        }
        ctx.stroke();
        this.car.draw(ctx);
    }
}

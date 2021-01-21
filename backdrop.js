class BackDrop {
    constructor(game) {
        Object.assign(this, {game});
        // How many 'vertical' lines to draw 'must be even'
        this.LINE_COUNT = 32;
        this.VERT_LINES = 32;
        // The space between the lines at the bottom of the canvas
        this.LINE_SPACING = 64;
    }

    update() {
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Draw lines from the center outward
        ctx.strokeStyle = 'purple';
        ctx.beginPath();
        for (let i = 0; i <= this.LINE_COUNT; i++) {
            let current = (i - this.LINE_COUNT / 2.0) / (this.LINE_COUNT / 2);
            let x = (i - this.LINE_COUNT / 2.0) / (this.LINE_COUNT / 2) * (ctx.canvas.width * 2) * 2

            let slope = (ctx.canvas.height / 2) / x;
            let startX = 30 / slope;
            let startY = 0;

            ctx.moveTo(ctx.canvas.width / 2 + startX, ctx.canvas.height / 2 + startY);
            ctx.lineTo(ctx.canvas.width / 2 + x, ctx.canvas.height);
        }

        // Draw vertical lines
        for (let i = 0; i < this.VERT_LINES; i++) {
            let y = Math.tan((i / this.VERT_LINES) * (Math.PI / 2)) * (ctx.canvas.height / 2) / 1.5;
            y +=  (ctx.canvas.height / 2);
            ctx.moveTo(0, y);
            ctx.lineTo(ctx.canvas.width, y);
        }
        ctx.stroke();
        //ctx.fillRect(0, ctx.canvas.height / 2 - 1, ctx.canvas.width, 40);
    }
}

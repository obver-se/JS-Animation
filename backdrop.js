class BackDrop {
    constructor(game) {
        Object.assign(this, {game});
        this.spritesheet = ASSET_MANAGER.getAsset("carSprites.png");
        // How many 'vertical' lines to draw 'must be even'
        this.LINE_COUNT = 64;
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
        for (let i = 0; i < this.LINE_COUNT; i++) {
            let current = i - this.LINE_COUNT / 2;
            ctx.beginPath();
            // Start at the center
            ctx.moveTo(ctx.canvas.width / 2 + current * this.LINE_SPACING / 32, ctx.canvas.height / 2);
            ctx.lineTo(ctx.canvas.width / 2 + current * this.LINE_SPACING, ctx.canvas.height);
            ctx.stroke();
        }
        // Draw vertical lines
        for (let i = 0; i < this.LINE_COUNT; i++) {
            let y = (ctx.canvas.height / 2) / i + (ctx.canvas.height / 2);
            ctx.beginPath();
            // Start at the center
            ctx.moveTo(0, y);
            ctx.lineTo(ctx.canvas.width, y);
            ctx.stroke();
        }
    }
}

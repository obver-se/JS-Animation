class Animator {
  constructor(spritesheet,xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
    Object.assign(this, { spritesheet, 
                          xStart, yStart, 
                          height, width, 
                          frameCount, frameDuration, framePadding, 
                          reverse, loop });

    this.elapsedTime = 0;
    this.totalTime = this.frameCount * this.frameDuration;
  }


  drawFrame(tick, ctx, x, y, scale) {
    this.elapsedTime += tick;

    if (this.isDone()) {
      if (this.loop) {
        this.elapsedTime -= this.totalTime;
      } else {
        return;
      }
    }

    let frame = this.currentFrame();
    if (this.reverse) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(this.spritesheet,
                    this.xStart, this.yStart + frame * (this.height + this.framePadding),
                    this.width, this.height,
                    -x - this.width * scale, y,
                    this.width * scale,
                    this.height * scale);
      ctx.restore();
    } else {
      ctx.drawImage(this.spritesheet,
                    this.xStart, this.yStart + frame * (this.height + this.framePadding),
                    this.width, this.height,
                    x, y,
                    this.width * scale,
                    this.height * scale);
    }
  }

  currentFrame() {
    return Math.floor(this.elapsedTime / this.frameDuration);
  }

  isDone() {
    return Math.floor(this.elapsedTime >= this.totalTime);
  }
}

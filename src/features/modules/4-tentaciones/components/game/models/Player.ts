class Player {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  image: HTMLImageElement;
  totalFrames: number;
  height: number;
  width: number;
  frames: number;
  jump: number;

  constructor({ image }: { image: HTMLImageElement }) {
    this.position = {
      x: 0,
      y: 0,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.image = image;
    this.totalFrames = 24;
    this.height = 180;
    this.width =
      (this.height * (this.image.width / this.totalFrames)) /
      (this.image.height / 2);

    this.frames = 0;
    this.jump = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      (this.image.width / this.totalFrames) * this.frames,
      (this.jump * this.image.height) / 2,
      this.image.width / this.totalFrames,
      this.image.height / 2,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export default Player;


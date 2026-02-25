class Platform {
  position: { x: number; y: number };
  image: HTMLImageElement;
  width: number;
  height: number;

  constructor({ x, y, image }: { x: number; y: number; image: HTMLImageElement }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = this.image.width;
    this.height = this.image.height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { height } = ctx.canvas;

    ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.position.x,
      0,
      (this.width * height) / this.height,
      height
    );
  }
}

export default Platform;


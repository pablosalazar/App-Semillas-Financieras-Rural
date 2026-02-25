class Item {
  position: { x: number; y: number };
  image: HTMLImageElement;
  width: number;
  height: number;
  type: string;
  recolected: boolean;

  constructor({
    x,
    y,
    image,
    type,
  }: {
    x: number;
    y: number;
    image: HTMLImageElement;
    type: string;
  }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = 150;
    this.height = 150;
    this.type = type;
    this.recolected = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    if (this.recolected && this.position.y > -200) {
      this.position.y -= 5;
    }
  }
}

export default Item;


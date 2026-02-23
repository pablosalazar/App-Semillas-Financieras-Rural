interface Score {
  gustos: number;
  gastos: number;
  vidas: number;
}

class Board {
  images: HTMLImageElement[];
  score: Score;

  constructor({ score, images }: { score: Score; images: HTMLImageElement[] }) {
    this.images = images;
    this.score = score;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.images[13], 10, 10, 200, 80);

    ctx.font = "26px Ubuntu";
    ctx.fillStyle = "#0367a6";

    ctx.fillText(`Gastos: ${this.score.gastos}`, 50, 45);
    ctx.fillText(`Gustos: ${this.score.gustos}`, 50, 75);

    ctx.drawImage(this.images[14], 1060, 10, 200, 80);

    ctx.drawImage(this.images[15], 1140, 40, 30, 30);
    ctx.drawImage(this.images[15], 1180, 40, 30, 30);
    ctx.drawImage(this.images[15], 1220, 40, 30, 30);

    for (let i = 0; i < this.score.vidas; i++) {
      ctx.drawImage(this.images[16], 1140 + i * 40, 40, 30, 30);
    }
  }
}

export default Board;


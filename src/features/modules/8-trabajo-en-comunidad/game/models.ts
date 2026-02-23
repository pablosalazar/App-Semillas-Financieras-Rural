export interface Position {
  x: number;
  y: number;
}

export class Character {
  position: Position;
  image: HTMLImageElement;
  width: number;
  height: number;
  direction: number;
  frame: number;

  constructor({
    x,
    y,
    image,
  }: {
    x: number;
    y: number;
    image: HTMLImageElement;
  }) {
    this.position = { x, y };
    this.image = image;
    this.width = 60;
    this.height = 60;
    this.direction = -1;
    this.frame = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.direction === -1 ? 0 : this.image.width / 2,
      0,
      this.image.width / 2,
      this.image.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export class Worker {
  position: Position;
  initialPosition: Position;
  image: HTMLImageElement;
  width: number;
  height: number;
  direction: number;
  frame: number;
  active: boolean;
  workPositionX: number;
  workPositionY: number;

  constructor({
    x,
    y,
    image,
    workPositionX,
    workPositionY,
  }: {
    x: number;
    y: number;
    image: HTMLImageElement;
    workPositionX: number;
    workPositionY: number;
  }) {
    this.position = { x, y };
    this.initialPosition = { x, y };
    this.image = image;
    this.width = 60;
    this.height = 60;
    this.direction = -1;
    this.frame = 0;
    this.active = false;
    this.workPositionX = workPositionX;
    this.workPositionY = workPositionY;
  }

  resetPosition() {
    this.position.x = this.initialPosition.x;
    this.position.y = this.initialPosition.y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      (this.frame * this.image.width) / 3,
      0,
      this.image.width / 3,
      this.image.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    if (this.active) {
      if (this.direction === -1) {
        this.frame = 1;
      } else {
        this.frame = 2;
      }
    } else {
      this.frame = 0;
    }
  }
}

export class Platform {
  position: Position;
  image: HTMLImageElement;
  frame: number;

  constructor({
    x,
    y,
    image,
  }: {
    x: number;
    y: number;
    image: HTMLImageElement;
  }) {
    this.position = { x, y };
    this.image = image;
    this.frame = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      (this.frame * this.image.width) / 9,
      0,
      this.image.width / 9,
      this.image.height,
      this.position.x,
      this.position.y,
      1280,
      720
    );
  }
}

export class Pool {
  position: Position;
  image: HTMLImageElement;
  width: number;
  height: number;
  frame: number;

  constructor({
    x,
    y,
    image,
  }: {
    x: number;
    y: number;
    image: HTMLImageElement;
  }) {
    this.position = { x, y };
    this.image = image;
    this.width = image.width / 10;
    this.height = image.height;
    this.frame = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      (this.frame * this.image.width) / 10,
      0,
      this.image.width / 10,
      this.image.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export class WaterMeter {
  position: Position;
  image: HTMLImageElement;
  width: number;
  height: number;
  frame: number;

  constructor({
    x,
    y,
    image,
  }: {
    x: number;
    y: number;
    image: HTMLImageElement;
  }) {
    this.position = { x, y };
    this.image = image;
    this.width = image.width / 6;
    this.height = image.height;
    this.frame = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      (this.frame * this.image.width) / 6,
      0,
      this.image.width / 6,
      this.image.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export class Indicator {
  position: Position;
  image: HTMLImageElement;

  constructor({
    x,
    y,
    image,
  }: {
    x: number;
    y: number;
    image: HTMLImageElement;
  }) {
    this.position = { x, y };
    this.image = image;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.position.x,
      this.position.y,
      40,
      40
    );
  }
}

export class Clock {
  position: Position;
  image: HTMLImageElement;
  frame: number;

  constructor({
    x,
    y,
    image,
  }: {
    x: number;
    y: number;
    image: HTMLImageElement;
  }) {
    this.position = { x, y };
    this.image = image;
    this.frame = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      (this.frame * this.image.width) / 18,
      0,
      this.image.width / 18,
      this.image.height,
      this.position.x,
      this.position.y,
      200,
      180
    );
  }
}

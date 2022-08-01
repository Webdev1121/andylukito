class Cloud {
  constructor(ctx, gameWidth) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.randomNumber = Math.trunc(Math.random() * (150 - 1) + 1);

    this.width = 120;
    this.height = 40;
    this.posX = gameWidth;
    this.posY = this.randomNumber;

    //cactus image
    this.image = new Image();
    this.image.src = `./img/cloud.png`;

    this.velX = 3;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.move();
  }

  move() {
    this.posX -= this.velX;
  }
}

class Background {
  constructor(ctx, w, h) {
    this.ctx = ctx;
    this.width = w;
    this.height = h;

    this.image = new Image();
    this.image.src = "./img/dino_t_rex_chrome_map.png";

    this.posX = 0;
    this.posY = window.innerHeight / 2 + 50;

    this.velX = 10;
  }

  draw() {
    //console.log(this.height);
    if (Game.checkTimeZone() === "night") {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.width, window.innerHeight);
      this.image.src = "./img/nightime/dino_t_rex_chrome_map.png";
    } else {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, this.width, window.innerHeight);
      this.image.src = "./img/dino_t_rex_chrome_map.png";
    }

    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.ctx.drawImage(
      this.image,
      this.posX + this.width,
      this.posY,
      this.width,
      this.height
    );

    if (Game.checkScore() >= 600) {
      this.velX = 12;
    } else if (Game.checkScore() >= 2500) {
      this.velX = 15;
    }

    this.move();
  }

  move() {
    if (this.posX <= -this.width) {
      this.posX = 0;
    }
    this.posX -= this.velX;
  }
}

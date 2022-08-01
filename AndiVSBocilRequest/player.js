class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 120;
    this.height = 140;

    this.image = new Image();
    this.image.src = "./img/trex/dinowalk.png";
    this.image.frames = 2;
    this.image.framesIndex = 0;

    //Sounds
    this.jumpSound = document.getElementById("jumpSoundEff");

    //know if game is running or not
    this.gameRunning = true;

    this.posX = 50;
    this.posY = this.gameHeight / 2 - 50;
    this.posY0 = this.posY;

    this.velY = 1;
    this.gravity = 0.4;

    //changing position of TREX to Crouch or Running
    this.sx = this.image.width / this.image.frames;
    this.sy = 0;
    this.offSetRight = 33;
    this.offSetUp = 0;
    this.varOffset = 5;

    this.keys = keys;

    this.setListeners();
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.image.framesIndex * this.sx - this.offSetRight + this.varOffset,
      this.sy,
      this.image.width / this.image.frames,
      this.image.height / 2 + 10,
      this.posX,
      this.posY + this.offSetUp,
      this.width,
      this.height
    );

    if (Game.checkTimeZone() === "night") {
      this.image.src = "./img/nightime/trex/dinowalk.png";
    } else {
      this.image.src = "./img/trex/dinowalk.png";
    }

    //check colision border of the player
    //this.ctx.strokeRect(this.posX, this.posY, this.width, this.height);
    if (Game.isCollision()) {
      this.image.src = "./img/trex/dinohit.png";
    }

    this.animate(framesCounter);

    this.move();
  }

  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }
    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
  }

  move() {
    // console.log(this.gameRunning);
    if (this.posY < this.posY0) {
      // Saltando
      this.posY += this.velY;
      this.velY += this.gravity;
    } else {
      this.posY = this.posY0;
      this.velY = 1;
    }
  }

  setListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case this.keys.SPACE:
          if (this.posY >= this.posY0) {
            this.jump();
          }
          break;

        case this.keys.ArrowDown:
          this.crouch();

          break;

        case this.keys.ArrowUp:
          this.defaultRun();

          break;
      }
    });
  }

  jump() {
    this.posY -= 80;
    this.velY -= 8;
    //we need to work here with the sound bug after game false
    if (this.gameRunning === true) {
      this.jumpSound.play();
    } else if (this.gameRunning === false) {
      this.jumpSound.volume = 0;
      this.jumpSound.stop();
    }
  }

  crouch() {
    this.sx = this.image.width / this.image.frames + 5;
    this.sy = this.image.height / 2 + 20;
    this.offSetUp = 50;
    this.velY += 8;
    this.offSetRight = 0;
    this.varOffset = 0;
  }

  defaultRun() {
    this.sx = this.image.width / this.image.frames;
    this.sy = 0;
    this.offSetRight = 33;
    this.offSetUp = 0;
    this.varOffset = 5;
  }
}

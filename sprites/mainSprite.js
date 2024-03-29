export default class mainSprite {
  #isFacing;
  #isDead;
  #SPEED;
  #ANIM_SPEED;
  #isAttacking;

  constructor() {
    this.#SPEED = 150;
    this.#ANIM_SPEED = 20;
    this.#isFacing = "down";
    this.#loadAssets();
    this.#initMovement();
    this.#isAttacking = false;
    this.#isDead = false;
    this.mainSprite = add([
      sprite("walk-down", { animSpeed: this.ANIM_SPEED }),
      pos(window.innerWidth / 2 - 10, window.innerHeight / 2 - 15),
      area({
        shape: new Polygon([
          vec2(15, 10),
          vec2(35, 10),
          vec2(35, 40),
          vec2(15, 40),
        ]),
      }),
      body(),
      scale(2),
      health(3),
    ]);
    this.#initAttack();
  }

  get isFacing() {
    return this.#isFacing;
  }

  get isDead() {
    return this.#isDead;
  }

  isAttacking() {
    return this.mainSprite.curAnim() === "attack";
  }

  takeDamage(collision) {
    if (collision.isTop()) {
      this.mainSprite.moveBy(0, 50);
      this.#isFacing = "up";
    } else if (collision.isBottom()) {
      this.mainSprite.moveBy(0, -50);
      this.#isFacing = "down";
    } else if (collision.isLeft()) {
      this.mainSprite.moveBy(50, 0);
      this.#isFacing = "left";
    } else {
      this.mainSprite.moveBy(-50, 0);
      this.#isFacing = "right";
    }
    this.mainSprite.hurt(1);
    if (this.mainSprite.hp() === 0) {
      this.mainSprite.use(sprite("death"));
      this.#isDead = true;
      this.mainSprite.play("death");
    } else {
      this.mainSprite.use(sprite(`hurt-${this.#isFacing}`));
      this.mainSprite.play("hurt", {
        onEnd: () => {
          this.mainSprite.frame = 0;
          this.mainSprite.stop();
        },
      });
    }
  }

  #initMovement() {
    onKeyDown("left", () => {
      if (
        this.mainSprite.curAnim() === "attack" ||
        this.mainSprite.curAnim() == "hurt" ||
        this.mainSprite.curAnim() === "death"
      )
        return;
      if (this.mainSprite.curAnim() !== "run") {
        this.mainSprite.use(sprite("walk-left"));
        this.mainSprite.play("run");
        this.#isFacing = "left";
      }
      this.mainSprite.move(-this.#SPEED, 0);
    });
    onKeyRelease("left", () => {
      if (
        this.mainSprite.curAnim() === "attack" ||
        this.mainSprite.curAnim() == "hurt"
      )
        return;
      this.mainSprite.frame = 0;
      this.mainSprite.stop();
    });

    onKeyDown("right", () => {
      if (
        this.mainSprite.curAnim() === "attack" ||
        this.mainSprite.curAnim() == "hurt" ||
        this.mainSprite.curAnim() === "death"
      )
        return;
      if (this.mainSprite.curAnim() !== "run") {
        this.mainSprite.use(sprite("walk-right"));
        this.mainSprite.play("run");
        this.#isFacing = "right";
      }
      this.mainSprite.move(this.#SPEED, 0);
    });
    onKeyRelease("right", () => {
      if (
        this.mainSprite.curAnim() === "attack" ||
        this.mainSprite.curAnim() == "hurt"
      )
        return;
      this.mainSprite.frame = 0;
      this.mainSprite.stop();
    });

    // Move sprit up
    onKeyDown("up", () => {
      if (
        this.mainSprite.curAnim() === "attack" ||
        this.mainSprite.curAnim() == "hurt" ||
        this.mainSprite.curAnim() === "death"
      )
        return;
      if (this.mainSprite.curAnim() !== "run") {
        this.mainSprite.use(sprite("walk-up"));
        this.mainSprite.play("run");
        this.#isFacing = "up";
      }
      this.mainSprite.move(0, -this.#SPEED);
    });
    onKeyRelease("up", () => {
      if (
        this.mainSprite.curAnim() === "attack" ||
        this.mainSprite.curAnim() == "hurt"
      )
        return;
      this.mainSprite.frame = 0;
      this.mainSprite.stop();
    });

    // Move sprite down
    onKeyDown("down", () => {
      if (
        this.mainSprite.curAnim() === "attack" ||
        this.mainSprite.curAnim() == "hurt" ||
        this.mainSprite.curAnim() === "death"
      )
        return;
      if (this.mainSprite.curAnim() !== "run") {
        this.mainSprite.use(sprite("walk-down"));
        this.mainSprite.play("run");
        this.#isFacing = "down";
      }
      this.mainSprite.move(0, this.#SPEED);
    });
    onKeyRelease("down", () => {
      if (
        this.mainSprite.curAnim() === "attack" ||
        this.mainSprite.curAnim() == "hurt"
      )
        return;
      this.mainSprite.frame = 0;
      this.mainSprite.stop();
    });
  }

  #initAttack() {
    // Attack Animation
    const facingMap = {
      down: () => {
        this.mainSprite.area.shape.pts[2] = vec2(
          this.mainSprite.area.shape.pts[2].x,
          this.mainSprite.area.shape.pts[2].y + 15
        );
        this.mainSprite.area.shape.pts[3] = vec2(
          this.mainSprite.area.shape.pts[3].x,
          this.mainSprite.area.shape.pts[3].y + 15
        );
      },
      up: () => {
        this.mainSprite.area.shape.pts[0] = vec2(
          this.mainSprite.area.shape.pts[0].x,
          this.mainSprite.area.shape.pts[0].y - 15
        );
        this.mainSprite.area.shape.pts[1] = vec2(
          this.mainSprite.area.shape.pts[1].x,
          this.mainSprite.area.shape.pts[1].y - 15
        );
      },
      left: () => {
        this.mainSprite.area.shape.pts[0] = vec2(
          this.mainSprite.area.shape.pts[0].x - 15,
          this.mainSprite.area.shape.pts[0].y
        );
        this.mainSprite.area.shape.pts[3] = vec2(
          this.mainSprite.area.shape.pts[3].x - 15,
          this.mainSprite.area.shape.pts[3].y
        );
      },
      right: () => {
        this.mainSprite.area.shape.pts[1] = vec2(
          this.mainSprite.area.shape.pts[1].x + 15,
          this.mainSprite.area.shape.pts[1].y
        );
        this.mainSprite.area.shape.pts[2] = vec2(
          this.mainSprite.area.shape.pts[2].x + 15,
          this.mainSprite.area.shape.pts[2].y
        );
      },
    };
    onKeyPress("space", () => {
      if (
        this.mainSprite.curAnim() === "attack" ||
        this.mainSprite.curAnim() === "hurt"
      )
        return;
      this.#isAttacking = true;
      facingMap[this.#isFacing]();
      this.mainSprite.use(sprite(`attack-${this.#isFacing}`));
      this.mainSprite.play("attack");

      setTimeout(() => {
        this.mainSprite.area.shape = new Polygon([
          vec2(15, 10),
          vec2(35, 10),
          vec2(35, 40),
          vec2(15, 40),
        ]);
      }, 100);
    });

    //console.log(this.mainSprite);
  }

  #loadAssets() {
    // Move
    loadSpriteAtlas("./assets/sprites/main/walk/WarriorDownWalk.png", {
      "walk-down": {
        x: 0,
        y: 0,
        width: 384,
        height: 48,
        sliceX: 8,
        anims: {
          run: {
            from: 0,
            to: 7,
            loop: true,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/main/walk/WarriorUpWalk.png", {
      "walk-up": {
        x: 0,
        y: 0,
        width: 384,
        height: 48,
        sliceX: 8,
        anims: {
          run: {
            from: 0,
            to: 7,
            loop: true,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/main/walk/WarriorLeftWalk.png", {
      "walk-left": {
        x: 0,
        y: 0,
        width: 384,
        height: 48,
        sliceX: 8,
        anims: {
          run: {
            from: 0,
            to: 7,
            loop: true,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/main/walk/WarriorRightWalk.png", {
      "walk-right": {
        x: 0,
        y: 0,
        width: 384,
        height: 48,
        sliceX: 8,
        anims: {
          run: {
            from: 0,
            to: 7,
            loop: true,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    // ATTACK
    loadSpriteAtlas("./assets/sprites/main/attack/WarriorDownAttack01.png", {
      "attack-down": {
        x: 0,
        y: 0,
        width: 288,
        height: 48,
        sliceX: 6,
        anims: {
          attack: {
            from: 0,
            to: 5,
            loop: false,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/main/attack/WarriorUpAttack01.png", {
      "attack-up": {
        x: 0,
        y: 0,
        width: 288,
        height: 48,
        sliceX: 6,
        anims: {
          attack: {
            from: 0,
            to: 5,
            loop: false,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/main/attack/WarriorLeftAttack01.png", {
      "attack-left": {
        x: 0,
        y: 0,
        width: 288,
        height: 48,
        sliceX: 6,
        anims: {
          attack: {
            from: 0,
            to: 5,
            loop: false,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/main/attack/WarriorRightAttack01.png", {
      "attack-right": {
        x: 0,
        y: 0,
        width: 288,
        height: 48,
        sliceX: 6,
        anims: {
          attack: {
            from: 0,
            to: 5,
            loop: false,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    // Hurt Down
    loadSpriteAtlas("./assets/sprites/main/hurt/WarriorDownHurt.png", {
      "hurt-down": {
        x: 0,
        y: 0,
        width: 48 * 4,
        height: 48,
        sliceX: 4,
        anims: {
          hurt: {
            from: 0,
            to: 3,
            loop: false,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    // Hurt Top
    loadSpriteAtlas("./assets/sprites/main/hurt/WarriorUpHurt.png", {
      "hurt-up": {
        x: 0,
        y: 0,
        width: 48 * 4,
        height: 48,
        sliceX: 4,
        anims: {
          hurt: {
            from: 0,
            to: 3,
            loop: false,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    // Hurt Left
    loadSpriteAtlas("./assets/sprites/main/hurt/WarriorLeftHurt.png", {
      "hurt-left": {
        x: 0,
        y: 0,
        width: 48 * 4,
        height: 48,
        sliceX: 4,
        anims: {
          hurt: {
            from: 0,
            to: 3,
            loop: false,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    // HUrt Right
    loadSpriteAtlas("./assets/sprites/main/hurt/WarriorRightHurt.png", {
      "hurt-right": {
        x: 0,
        y: 0,
        width: 48 * 4,
        height: 48,
        sliceX: 4,
        anims: {
          hurt: {
            from: 0,
            to: 3,
            loop: false,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });

    // Death

    loadSpriteAtlas("./assets/sprites/main/death/WarriorDownDeath.png", {
      death: {
        x: 0,
        y: 0,
        width: 48 * 5,
        height: 48,
        sliceX: 5,
        anims: {
          death: {
            from: 0,
            to: 4,
            loop: false,
            speed: this.ANIM_SPEED,
          },
        },
      },
    });
  }
}

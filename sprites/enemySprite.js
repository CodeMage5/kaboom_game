export default class Enemy {
  #isFacing;
  #SPEED;
  #ANIM_SPEED;

  constructor(xPos, yPos, walkPath, followObj) {
    this.#isFacing = "down";
    this.#SPEED = 2;
    this.#ANIM_SPEED = 20;
    this.#loadAssets();
    this.enemySprite = add([
      sprite("cultist-walk-down", { animSpeed: this.#ANIM_SPEED }),
      pos(xPos, yPos),
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
    this.#initMovement(walkPath, followObj);
  }

  get isFacing() {
    return this.#isFacing;
  }

  #initMovement(walkPath, followObj) {
    this.enemySprite.onUpdate(() => {
      if (followObj) {
        if (
          followObj.pos.x > this.enemySprite.pos.x &&
          Math.abs(followObj.pos.x - this.enemySprite.pos.x) > 3
        ) {
          this.enemySprite.moveBy(vec2(this.#SPEED, 0));
        } else if (
          followObj.pos.x < this.enemySprite.pos.x &&
          Math.abs(followObj.pos.x - this.enemySprite.pos.x) > 3
        ) {
          this.enemySprite.moveBy(vec2(-1 * this.#SPEED, 0));
        }
        if (
          followObj.pos.y > this.enemySprite.pos.y &&
          Math.abs(followObj.pos.y - this.enemySprite.pos.y) > 3
        ) {
          this.enemySprite.moveBy(vec2(0, this.#SPEED));
        } else if (
          followObj.pos.y < this.enemySprite.pos.y &&
          Math.abs(followObj.pos.y - this.enemySprite.pos.y) > 3
        ) {
          this.enemySprite.moveBy(vec2(0, -1 * this.#SPEED));
        }
      }

      if (walkPath) {
      }
    });
  }

  takeDamage(collision) {
    if (collision.isTop()) {
      this.enemySprite.moveBy(0, -50);
      this.#isFacing = "down";
    } else if (collision.isBottom()) {
      this.enemySprite.moveBy(0, 50);
      this.#isFacing = "up";
    } else if (collision.isLeft()) {
      this.enemySprite.moveBy(-50, 0);
      this.#isFacing = "right";
    } else {
      this.enemySprite.moveBy(50, 0);
      this.#isFacing = "left";
    }
    this.enemySprite.hurt(1);
    if (this.enemySprite.hp() === 0) {
      this.enemySprite.use(sprite("cultist-death-down"));
      this.enemySprite.play("death", {
        onEnd: () => {
          destroy(this.enemySprite);
        },
      });
    } else {
      this.enemySprite.use(sprite(`cultist-hurt-${this.#isFacing}`));
      this.enemySprite.play("hurt", {
        onEnd: () => {
          this.enemySprite.frame = 0;
          this.enemySprite.stop();
        },
      });
    }
  }

  #loadAssets() {
    // Walk
    loadSpriteAtlas("./assets/sprites/enemy/walk/CultistDownWalk.png", {
      "cultist-walk-down": {
        x: 0,
        y: 0,
        width: 48 * 8,
        height: 48,
        sliceX: 8,
        anims: {
          run: {
            from: 0,
            to: 7,
            loop: true,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/walk/CultistUpWalk.png", {
      "cultist-walk-up": {
        x: 0,
        y: 0,
        width: 48 * 8,
        height: 48,
        sliceX: 8,
        anims: {
          run: {
            from: 0,
            to: 7,
            loop: true,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/walk/CultistLeftWalk.png", {
      "cultist-walk-left": {
        x: 0,
        y: 0,
        width: 48 * 8,
        height: 48,
        sliceX: 8,
        anims: {
          run: {
            from: 0,
            to: 7,
            loop: true,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/walk/CultistRightWalk.png", {
      "cultist-walk-right": {
        x: 0,
        y: 0,
        width: 48 * 8,
        height: 48,
        sliceX: 8,
        anims: {
          run: {
            from: 0,
            to: 7,
            loop: true,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    // Hurt
    loadSpriteAtlas("./assets/sprites/enemy/hurt/CultistDownHurt.png", {
      "cultist-hurt-down": {
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
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/hurt/CultistUpHurt.png", {
      "cultist-hurt-up": {
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
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/hurt/CultistLeftHurt.png", {
      "cultist-hurt-left": {
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
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/hurt/CultistRightHurt.png", {
      "cultist-hurt-right": {
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
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    // Attack
    loadSpriteAtlas("./assets/sprites/enemy/attack/CultistDownAttack.png", {
      "cultist-attack-down": {
        x: 0,
        y: 0,
        width: 48 * 11,
        height: 48,
        sliceX: 11,
        anims: {
          attack: {
            from: 0,
            to: 10,
            loop: false,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/attack/CultistUpAttack.png", {
      "cultist-attack-up": {
        x: 0,
        y: 0,
        width: 48 * 11,
        height: 48,
        sliceX: 11,
        anims: {
          attack: {
            from: 0,
            to: 10,
            loop: false,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/attack/CultistLeftAttack.png", {
      "cultist-attack-left": {
        x: 0,
        y: 0,
        width: 48 * 11,
        height: 48,
        sliceX: 11,
        anims: {
          attack: {
            from: 0,
            to: 10,
            loop: false,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/attack/CultistRightAttack.png", {
      "cultist-attack-right": {
        x: 0,
        y: 0,
        width: 48 * 11,
        height: 48,
        sliceX: 11,
        anims: {
          attack: {
            from: 0,
            to: 10,
            loop: false,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    // Death
    loadSpriteAtlas("./assets/sprites/enemy/death/CultistDownDeath.png", {
      "cultist-death-down": {
        x: 0,
        y: 0,
        width: 48 * 6,
        height: 48,
        sliceX: 6,
        anims: {
          death: {
            from: 0,
            to: 5,
            loop: false,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/death/CultistUpDeath.png", {
      "cultist-death-up": {
        x: 0,
        y: 0,
        width: 48 * 6,
        height: 48,
        sliceX: 6,
        anims: {
          death: {
            from: 0,
            to: 5,
            loop: false,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/death/CultistLeftDeath.png", {
      "cultist-death-left": {
        x: 0,
        y: 0,
        width: 48 * 6,
        height: 48,
        sliceX: 6,
        anims: {
          death: {
            from: 0,
            to: 5,
            loop: false,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });

    loadSpriteAtlas("./assets/sprites/enemy/death/CultistRightDeath.png", {
      "cultist-death-right": {
        x: 0,
        y: 0,
        width: 48 * 6,
        height: 48,
        sliceX: 6,
        anims: {
          death: {
            from: 0,
            to: 5,
            loop: false,
            speed: this.#ANIM_SPEED,
          },
        },
      },
    });
  }
}

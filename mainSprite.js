export default class mainSprite {
  #isFacing;
  #SPEED;
  #ANIM_SPEED;
  #isAttacking;

  constructor() {
    this.#SPEED = 150;
    this.#ANIM_SPEED = 20;
    this.#isFacing = "down";
    this.#initMovement();
    this.#isAttacking = false;
    this.mainSprite = add([
      sprite("walk-down", { animSpeed: this.ANIM_SPEED }),
      pos(120, 80),
      area({
        shape: new Polygon([
          vec2(0, 0),
          vec2(20, 0),
          vec2(20, 30),
          vec2(0, 30),
        ]),
      }),
      anchor("center"),
      body(),
      scale(2),
    ]);
    this.#initAttack();
  }
  #initMovement() {
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

    onKeyDown("left", () => {
      if (this.mainSprite.curAnim() === "attack") return;
      if (this.mainSprite.curAnim() !== "run") {
        this.mainSprite.use(sprite("walk-left"));
        this.mainSprite.play("run");
        this.#isFacing = "left";
      }
      this.mainSprite.move(-this.#SPEED, 0);
    });
    onKeyRelease("left", () => {
      this.mainSprite.frame = 0;
      this.mainSprite.stop();
    });

    onKeyDown("right", () => {
      if (this.mainSprite.curAnim() === "attack") return;
      if (this.mainSprite.curAnim() !== "run") {
        this.mainSprite.use(sprite("walk-right"));
        this.mainSprite.play("run");
        this.#isFacing = "right";
      }
      this.mainSprite.move(this.#SPEED, 0);
    });
    onKeyRelease("right", () => {
      this.mainSprite.frame = 0;
      this.mainSprite.stop();
    });

    // Move sprit up
    onKeyDown("up", () => {
      if (this.mainSprite.curAnim() === "attack") return;
      if (this.mainSprite.curAnim() !== "run") {
        this.mainSprite.use(sprite("walk-up"));
        this.mainSprite.play("run");
        this.#isFacing = "up";
      }
      this.mainSprite.move(0, -this.#SPEED);
    });
    onKeyRelease("up", () => {
      this.mainSprite.frame = 0;
      this.mainSprite.stop();
    });

    // Move sprite down
    onKeyDown("down", () => {
      if (this.mainSprite.curAnim() === "attack") return;
      if (this.mainSprite.curAnim() !== "run") {
        this.mainSprite.use(sprite("walk-down"));
        this.mainSprite.play("run");
        this.#isFacing = "down";
      }
      this.mainSprite.move(0, this.#SPEED);
    });
    onKeyRelease("down", () => {
      this.mainSprite.frame = 0;
      this.mainSprite.stop();
    });
  }

  #initAttack() {
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

    // Attack Animation
    const facingMap = {
      down: () => {
        this.mainSprite.area.shape.pts[2] = vec2(20, 50);
        this.mainSprite.area.shape.pts[2] = vec2(20, 50);
      },
      up: () => {
        this.mainSprite.area.shape.pts[0] = vec2(0, -20);
        this.mainSprite.area.shape.pts[1] = vec2(20, -20);
      },
      left: () => {
        this.mainSprite.area.shape.pts[0] = vec2(-20, 0);
        this.mainSprite.area.shape.pts[1] = vec2(-20, 30);
      },
      right: () => {
        this.mainSprite.area.shape.pts[0] = vec2(40, 0);
        this.mainSprite.area.shape.pts[1] = vec2(40, 30);
      },
    };
    onKeyPress("space", () => {
      if (this.mainSprite.curAnim === "attack") return;
      this.#isAttacking = true;
      facingMap[this.#isFacing]();
      this.mainSprite.use(sprite(`attack-${this.#isFacing}`));
      this.mainSprite.play("attack");

      setTimeout(() => {
        this.mainSprite.area.shape = new Polygon([
          vec2(0, 0),
          vec2(20, 0),
          vec2(20, 30),
          vec2(0, 30),
        ]);
      }, 100);
    });

    
    //console.log(this.mainSprite);
  }
}

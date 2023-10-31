export function initMainSprite() {
  //setGravity(100);
  const SPEED = 100;
  const ANIM_SPEED = 20;
  let isFacing = "down";

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
          speed: ANIM_SPEED,
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
          speed: ANIM_SPEED,
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
          speed: ANIM_SPEED,
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
          speed: ANIM_SPEED,
        },
      },
    },
  });

  const mainSprite = add([
    sprite("walk-down", { animSpeed: ANIM_SPEED }),
    pos(120, 80),
    area(),
    body(),
    scale(2),
  ]);

  onKeyDown("left", () => {
    if (mainSprite.curAnim() !== "run") {
      mainSprite.use(sprite("walk-left"));
      mainSprite.play("run");
      isFacing = "left";
    }
    mainSprite.move(-SPEED, 0);
  });
  onKeyRelease("left", () => {
    mainSprite.stop();
  });

  onKeyDown("right", () => {
    if (mainSprite.curAnim() !== "run") {
      mainSprite.use(sprite("walk-right"));
      mainSprite.play("run");
      isFacing = "right";
    }
    mainSprite.move(SPEED, 0);
  });
  onKeyRelease("right", () => {
    mainSprite.stop();
  });

  // Move sprit up
  onKeyDown("up", () => {
    if (mainSprite.curAnim() !== "run") {
      mainSprite.use(sprite("walk-up"));
      mainSprite.play("run");
      isFacing = "up";
    }
    mainSprite.move(0, -SPEED);
  });
  onKeyRelease("up", () => {
    mainSprite.stop();
  });

  // Move sprite down
  onKeyDown("down", () => {
    if (mainSprite.curAnim() !== "run") {
      mainSprite.use(sprite("walk-down"));
      mainSprite.play("run");
      isFacing = "down";
    }
    mainSprite.move(0, SPEED);
  });
  onKeyRelease("down", () => {
    mainSprite.stop();
  });

  // Attack

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
          speed: ANIM_SPEED,
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
          speed: ANIM_SPEED,
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
          speed: ANIM_SPEED,
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
          speed: ANIM_SPEED,
        },
      },
    },
  });

  onKeyPress("space", () => {
    mainSprite.use(sprite(`attack-${isFacing}`));
    mainSprite.play("attack");
  });
}

import "./style.css";
import kaboom from "kaboom";

// Asset imports
import mainSprite from "./sprites/mainSprite";
import Enemy from "./sprites/enemySprite";

import Level1 from "./levels/level1";

let LEVEL = 1;

// World Setting
kaboom();
//debug.inspect = true;

// Scenes
scene("level1", () => {
  new Level1();
  const mainCharacter = new mainSprite();
  let enemies = [];
  enemies.push(
    new Enemy(
      window.innerWidth / 2 - 200,
      window.innerHeight / 2 - 15,
      null,
      mainCharacter.mainSprite
    )
  );

  setBackground(Color.fromHex("#5ba675"));
  const healthText = add([
    text(`Health: ${mainCharacter.mainSprite.hp()}`),
    pos(24, 24),
  ]);
  add([text(`Level: ${LEVEL}`), pos(400, 24)]);

  // Interactions
  mainCharacter.mainSprite.onBeforePhysicsResolve((col) => {
    const filtered = enemies.filter((e) => {
      return e.enemySprite === col.target;
    });
    if (filtered.length >= 1) return;
    // Collisions with wall
    // if (!mainCharacter.isAttacking()) {
    //   if (col.isTop() === "up") mainCharacter.mainSprite.moveBy(0, 10);
    //   else if (col.isBottom() === "down")
    //     mainCharacter.mainSprite.moveBy(0, -10);
    //   else if (col.isLeft()) {
    //     mainCharacter.mainSprite.moveBy(10, 0);
    //   } else if (col.isRight()) mainCharacter.mainSprite.moveBy(-10, 0);
    // } else {
    //   if (mainCharacter.isFacing === "up") mainCharacter.mainSprite.move(0, 10);
    //   else if (mainCharacter.isFacing === "down")
    //     mainCharacter.mainSprite.move(0, -10);
    //   else if (mainCharacter.isFacing === "left") {
    //     mainCharacter.mainSprite.move(10, 0);
    //   } else if (mainCharacter.isFacing === "right")
    //     mainCharacter.mainSprite.move(-10, 0);
    // }
  });

  // Collisions with enemy
  mainCharacter.mainSprite.onCollide((enemy, col) => {
    const filtered = enemies.filter((e) => {
      return e.enemySprite === enemy;
    });
    if (filtered.length === 0) return;
    const enemySprite = filtered[0];
    if (!mainCharacter.isAttacking()) {
      mainCharacter.takeDamage(col);
    } else if (col.isTop() && mainCharacter.isFacing === "up") {
      enemySprite.takeDamage(col);
    } else if (col.isBottom() && mainCharacter.isFacing === "down") {
      enemySprite.takeDamage(col);
    } else if (col.isLeft() && mainCharacter.isFacing === "left") {
      enemySprite.takeDamage(col);
    } else if (col.isRight() && mainCharacter.isFacing === "right") {
      enemySprite.takeDamage(col);
    } else {
      enemySprite.takeDamage(col);
    }
    healthText.text = `Health: ${mainCharacter.mainSprite.hp()}`;
    if (mainCharacter.isDead) {
      go("gameOver");
    }
    if (enemySprite.enemySprite.hp() === 0) {
      enemies = enemies.filter((e) => {
        return e != enemySprite;
      });
    }
    if (enemies.length === 0) {
      go("youWin");
    }
  });
});
scene("level2", () => {
  new Level1();
  const mainCharacter = new mainSprite();
  let enemies = [];
  enemies.push(
    new Enemy(
      window.innerWidth / 2 - 200,
      window.innerHeight / 2 - 15,
      null,
      mainCharacter.mainSprite
    )
  );
  enemies.push(
    new Enemy(
      window.innerWidth / 2 + 200,
      window.innerHeight / 2 - 15,
      null,
      mainCharacter.mainSprite
    )
  );

  setBackground(Color.fromHex("#5ba675"));
  const healthText = add([
    text(`Health: ${mainCharacter.mainSprite.hp()}`),
    pos(24, 24),
  ]);
  add([text(`Level: ${LEVEL}`), pos(400, 24)]);

  // Interactions
  mainCharacter.mainSprite.onBeforePhysicsResolve((col) => {
    const filtered = enemies.filter((e) => {
      return e.enemySprite === col.target;
    });
    if (filtered.length >= 1) return;
    // Collisions with wall
    if (!mainCharacter.isAttacking()) {
      if (col.isTop() === "up") mainCharacter.mainSprite.moveBy(0, 10);
      else if (col.isBottom() === "down")
        mainCharacter.mainSprite.moveBy(0, -10);
      else if (col.isLeft()) {
        mainCharacter.mainSprite.moveBy(10, 0);
      } else if (col.isRight()) mainCharacter.mainSprite.moveBy(-10, 0);
    } else {
      if (mainCharacter.isFacing === "up")
        mainCharacter.mainSprite.moveBy(0, 10);
      else if (mainCharacter.isFacing === "down")
        mainCharacter.mainSprite.moveBy(0, -10);
      else if (mainCharacter.isFacing === "left") {
        mainCharacter.mainSprite.moveBy(10, 0);
      } else if (mainCharacter.isFacing === "right")
        mainCharacter.mainSprite.moveBy(-10, 0);
    }

    // if (mainCharacter.isFacing === "up" && mainCharacter.isAttacking())
    //   mainCharacter.mainSprite.moveBy(0, 10);
    // else if (mainCharacter.isFacing === "down" && mainCharacter.isAttacking())
    //   mainCharacter.mainSprite.moveBy(0, -10);
    // else if (mainCharacter.isFacing === "left" && mainCharacter.isAttacking()) {
    //   console.log("Teleport!");
    //   mainCharacter.mainSprite.moveBy(10, 0);
    // } else if (
    //   mainCharacter.isFacing === "right" &&
    //   mainCharacter.isAttacking()
    // )
    //   mainCharacter.mainSprite.moveBy(-10, 0);
  });

  // Collisions with enemy
  mainCharacter.mainSprite.onCollide((enemy, col) => {
    const filtered = enemies.filter((e) => {
      return e.enemySprite === enemy;
    });
    if (filtered.length === 0) return;
    const enemySprite = filtered[0];
    if (!mainCharacter.isAttacking()) {
      mainCharacter.takeDamage(col);
    } else if (col.isTop() && mainCharacter.isFacing === "up") {
      enemySprite.takeDamage(col);
    } else if (col.isBottom() && mainCharacter.isFacing === "down") {
      enemySprite.takeDamage(col);
    } else if (col.isLeft() && mainCharacter.isFacing === "left") {
      enemySprite.takeDamage(col);
    } else if (col.isRight() && mainCharacter.isFacing === "right") {
      enemySprite.takeDamage(col);
    } else {
      enemySprite.takeDamage(col);
    }
    healthText.text = `Health: ${mainCharacter.mainSprite.hp()}`;
    if (mainCharacter.isDead) {
      go("gameOver");
    }
    if (enemySprite.enemySprite.hp() === 0) {
      enemies = enemies.filter((e) => {
        return e != enemySprite;
      });
    }
    if (enemies.length === 0) {
      go("youWin");
    }
  });
});

scene("gameOver", () => {
  setBackground([0, 0, 0]);
  add([text("Game Over"), pos(24, 24)]);
  onKeyPress("space", () => {
    go("level1");
  });
});
scene("youWin", () => {
  setBackground([0, 0, 0]);
  add([
    text(
      `You beat level ${LEVEL}! Press space to continue to level ${LEVEL++}`
    ),
    pos(48, 24),
  ]);
  onKeyPress("space", () => {
    go(`level${LEVEL}`);
  });
});
go("level1");

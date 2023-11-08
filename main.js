import "./style.css";
import kaboom from "kaboom";

// Asset imports
import mainSprite from "./mainSprite";
import Enemy from "./enemySprite";

// World Setting
kaboom();

// Scenes
scene("gameOn", () => {
  const mainCharacter = new mainSprite();
  const enemySprite = new Enemy();

  setBackground(Color.fromHex("#5ba675"));
  const healthText = add([
    text(`Health: ${mainCharacter.mainSprite.hp()}`),
    pos(24, 24),
  ]);

  mainCharacter.mainSprite.onCollide((enemy, col) => {
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
  });
});
scene("gameOver", () => {
  setBackground([0, 0, 0]);
  add([text("Game Over"), pos(24, 24)]);
  onKeyPress("space", () => {
    go("gameOn");
  });
});
go("gameOn");

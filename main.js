import "./style.css";
import kaboom from "kaboom";

// Asset imports
import mainSprite from "./mainSprite";
import Enemy from "./enemySprite";

// World Setting
kaboom();
setBackground(Color.fromHex("#5ba675"));

// Sprite initialization
const mainCharacter = new mainSprite();
const enemySprite = new Enemy();

mainCharacter.mainSprite.onCollide((enemySprite, col) => {
  console.log(col);
});

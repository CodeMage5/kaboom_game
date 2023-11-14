export default class Level1 {
  constructor() {
    this.#loadAssets();
    addLevel(
      [
        "--------------------------------",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "=                              =",
        "--------------------------------",
      ],
      {
        tileWidth: 24,
        tileHeight: 24,
        tiles: {
          // " ": () => [sprite("grass"), scale(0.25)],
          "-": () => [
            sprite("wall-hor"),
            anchor("center"),
            body({ isStatic: true }),
            scale(1, 24 / 7),
            area(),
          ],
          "=": () => [
            sprite("wall-ver"),
            anchor("center"),
            body({ isStatic: true }),
            scale(24 / 7, 1),
            area({ shape: new Rect(vec2(0), 24, 7) }),
          ],
        },
        pos: vec2(
          window.innerWidth / 2 - (32 * 24) / 2,
          window.innerHeight / 2 - (24 * 16) / 2
        ),
      }
    );
  }

  #loadAssets() {
    loadSpriteAtlas("./assets/sprites/textures/TX Tileset Grass.png", {
      grass: {
        x: 48,
        y: 0,
        width: 96,
        height: 96,
      },
    });

    loadSpriteAtlas("./assets/sprites/textures/TX Tileset Wall.png", {
      "wall-hor": {
        x: 384,
        y: 32,
        width: 24,
        height: 7,
      },
    });

    loadSpriteAtlas("./assets/sprites/textures/TX Tileset Wall.png", {
      "wall-ver": {
        x: 288,
        y: 32,
        width: 7,
        height: 24,
      },
    });
  }
}

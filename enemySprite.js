export default class Enemy {
  #isFacing;
  #SPEED;
  #ANIM_SPEED;

  constructor() {
    this.#isFacing = "down";
    this.#SPEED = 150;
    this.#ANIM_SPEED = 20;
    this.#initMovement();
    this.enemySprite = add([
      sprite("cultist-walk-down", { animSpeed: this.#ANIM_SPEED }),
      pos(280, 240),
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
  }

  #initMovement() {
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
  }
}

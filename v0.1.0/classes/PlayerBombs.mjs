export default class PlayerBombs {
  constructor({ playerBombs, gameState }) {
    this.playerBombs = this.playerBombs;
    this.gameState = gameState;
    this.currentBomb = this.playerBombs;
    this.bomb00Src = "./assets/sidebar/bomb00.png";
    this.bomb00Sprite = new Image();
    this.bomb00Sprite.src = this.bomb00Src;
    this.bomb01Src = "./assets/sidebar/bomb01.png";
    this.bomb01Sprite = new Image();
    this.bomb01Sprite.src = this.bomb01Src;
  }
  update() { }
  render(ctx) {
    const { player, canvas } = this.gameState;
    ctx.drawImage(
      this.bomb00Sprite,
      730,
      220,
      this.bomb00Sprite.width * 2.5,
      this.bomb00Sprite.height * 2.5
    );
    for (let i = 1; i < player.bomb; i++) {
      ctx.drawImage(
        this.bomb01Sprite,
        770 + (this.bomb00Sprite.width * 2.5) + i * 35,
        250,
        this.bomb01Sprite.width * 2.2,
        this.bomb01Sprite.height * 2.2
      );
    }

  }

  reset() {
    this.currentBomb = this.playerBombs;
  }
}

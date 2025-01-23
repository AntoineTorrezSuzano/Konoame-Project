export default class PlayerLives {
  constructor({ playerLives, gameState }) {
    this.playerLives = playerLives;
    this.gameState = gameState;
    this.currentLives = this.playerLives;
  }
  update() {}
  render(ctx) {
    const { player, canvas } = this.gameState;
    ctx.font = "50px Arial";
    ctx.fillStyle = "rgb(255, 202, 202)";
    ctx.fillText(`Player`, 800, 150);
  }

  reset() {
    this.currentLives = this.playerLives;
  }
}

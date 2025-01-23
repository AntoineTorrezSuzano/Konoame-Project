import FPSCounter from "./FPSCounter.mjs";
import PlayerLives from "./PlayerLives.mjs";
export default class Sidebar {
  constructor({ gameState }) {
    this.gameState = gameState;
    this.sidebarState = {
      playerLives: new PlayerLives({
        playerLives: this.gameState.player.life,
        gameState: this.gameState,
      }),
    };
  }
  update() {}
  render(ctx) {
    const { playerLives } = this.sidebarState;
    playerLives.render(ctx);
  }

  reset() {}
}

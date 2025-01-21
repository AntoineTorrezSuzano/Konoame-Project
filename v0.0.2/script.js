import GameZone from "./classes/GameZone.mjs";
import Bullet from "./classes/Bullet.mjs";
import Player from "./classes/Player.mjs";
import { FPSCounter } from "./classes/FPSCounter.mjs";
document.addEventListener("DOMContentLoaded", () => {
    // Game State
    const gameState = {
        canvas: null,
        ctx: null,
        gameZone: null,
        bullets: [],
        keys: {},
        fpsCounter: new FPSCounter(),
        player: null,
        lastTime: 0,
        accumulatedTime: 0,
        fixedTimeStep: 1000 / 60, //60 FPS
    };
    function initialize() {
        // Canvas
        gameState.canvas = document.getElementById("gameCanvas");
        gameState.ctx = gameState.canvas.getContext("2d");

        // Create game objects
        gameState.gameZone = new GameZone(100, 50, 600, 800);
        gameState.player = new Player(
            gameState.gameZone.width / 2 + gameState.gameZone.x,
            gameState.gameZone.height - gameState.gameZone.height / 6 + gameState.gameZone.y,
            525
        )
        window.addEventListener("keydown", (e) => (gameState.keys[e.key] = true));
        window.addEventListener("keyup", (e) => (gameState.keys[e.key] = false));

        //Start the game loop
        requestAnimationFrame(gameLoop);
    }

    function gameLoop(timestamp) {
        const deltaTime = timestamp - gameState.lastTime;
        gameState.lastTime = timestamp;

        gameState.accumulatedTime += deltaTime;
        // Update the game at 60fps
        while (gameState.accumulatedTime >= gameState.fixedTimeStep) {
            update(gameState.fixedTimeStep / 1000); //Convert to seconds
            gameState.accumulatedTime -= gameState.fixedTimeStep;
            gameState.fpsCounter.update(timestamp);
        }
        render();
        requestAnimationFrame(gameLoop);
    }
    function update(deltaTime) {
        const { player, keys, gameZone, bullets, canvas } = gameState;
        player.update(deltaTime, keys, gameZone, bullets);
        bullets.forEach((bullet) => bullet.update(deltaTime));

        gameState.bullets = bullets.filter(
            (bullet) => !bullet.isOffScreen(gameZone)
        );

    }
    function render() {
        const { ctx, canvas, gameZone, bullets, player, fpsCounter } = gameState;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        gameZone.render(ctx);
        bullets.forEach((bullet) => bullet.render(ctx));
        player.render(ctx);
        // Affiche les fps en haut à gauche
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`FPS: ${fpsCounter.fps}`, canvas.width - 90, 40);
    }

    initialize();

});


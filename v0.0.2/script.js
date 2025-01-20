import GameZone from "./classes/GameZone.mjs";
import Bullet from "./classes/Bullet.mjs";
import Player from "./classes/Player.mjs";
import { FPSCounter } from "./classes/FPSCounter.mjs";
document.addEventListener("DOMContentLoaded", () => {
    //Const Variables
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const gameZone = new GameZone(100, 50, 600, 800);

    //Let Variables
    let lastTime = 0;
    let accumulatedTime = 0;
    const fixedTimeStep = 1000 / 60; //to fix at 60fps
    let bullets = [];
    const keys = {};
    const fpsCounter = new FPSCounter();
    const player = new Player(
        gameZone.width / 2 + gameZone.x,
        gameZone.height - gameZone.height / 6 + gameZone.y,
        525
    )

    window.addEventListener("keydown", (e) => (keys[e.key] = true));
    window.addEventListener("keyup", (e) => (keys[e.key] = false));


    function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        accumulatedTime += deltaTime;
        // Update the game at 60fps
        while (accumulatedTime >= fixedTimeStep) {
            update(fixedTimeStep / 1000); //Convert to seconds
            accumulatedTime -= fixedTimeStep;
            fpsCounter.update(timestamp);
        }
        render();
        requestAnimationFrame(gameLoop);
    }
    function update(deltaTime) {
        player.update(deltaTime, keys, gameZone, bullets);
        bullets.forEach((bullet) => bullet.update(deltaTime));
    }
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameZone.render(ctx);
        bullets.forEach((bullet) => bullet.render(ctx));
        player.render(ctx);
        // Affiche les fps en haut à gauche
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`FPS: ${fpsCounter.fps}`, canvas.width - 90, 40);
    }

    //Start the game
    requestAnimationFrame(gameLoop);
});


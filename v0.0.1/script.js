class Bullet {
    constructor(friendly, direction, x, y, speed, radius, color) {
        this.friendly = friendly;
        this.direction = direction;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.color = color;
    }
    update(deltaTime) {
        const radians = (this.direction * Math.PI) / 180;

        const velocityY = Math.cos(radians) * this.speed;
        const velocityX = Math.sin(radians) * this.speed;

        this.x += velocityX * deltaTime;
        this.y += velocityY * deltaTime;
    }
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    //Const Variables
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext('2d');

    //Let Variables
    let fps = 0;
    let fpsInterval = 0;
    let lastTime = 0;
    let bullets = [];
    const player = {
        x: canvas.width / 2,
        y: canvas.height - canvas.height / 6,
        speed: 525,
        update: function (deltaTime) {
            if (keys['ArrowUp']) this.y -= this.speed * deltaTime;
            if (keys['ArrowDown']) this.y += this.speed * deltaTime;
            if (keys['ArrowLeft']) this.x -= this.speed * deltaTime;
            if (keys['ArrowRight']) this.x += this.speed * deltaTime;
            if (keys['y']) {
                const bullet = new Bullet(true, 180, this.x, this.y, 500, 20, 'red');
                bullets.push(bullet);
                console.log("created");
                console.log(bullets);
            }
        },
        render: function () {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x, this.y, 50, 50)

        }


    }
    const keys = {};
    window.addEventListener('keydown', (e) => (keys[e.key] = true));
    window.addEventListener('keyup', (e) => (keys[e.key] = false));

    function gameLoop(timestamp) {
        const deltaTime = (timestamp - lastTime) / 1000;
        fps = 1 / deltaTime;
        lastTime = timestamp;

        // Update
        update(deltaTime);

        // Render
        render();

        fpsInterval += deltaTime;
        if (fpsInterval > 0.5) {
            console.log(`FPS: ${Math.round(fps)}`);
            console.log(`fpsInterval: ${fpsInterval}`);
            console.log(`DT: ${deltaTime}`);
            console.log(`timestamp: ${timestamp}`);


            fpsInterval = 0;

        }
        requestAnimationFrame(gameLoop);
    }
    function update(deltaTime) {
        player.update(deltaTime);
        bullets.forEach((bullet) => {
            bullet.update(deltaTime);
        })
    }
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.render();
        bullets.forEach((bullet) => {
            bullet.render(ctx);
        })
        // Affiche les fpd en haut à gauche
        ctx.fillStyle = "white";
        ctx.font = '20px Arial';
        ctx.fillText(`FPS: ${Math.round(fps)}`, canvas.width - 90, 40);
    }

    //Start the game
    requestAnimationFrame(gameLoop);

});
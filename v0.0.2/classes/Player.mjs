import Bullet from "./Bullet.mjs";

export default class Player {
    constructor(x, y, speed, cooldown = 0, width = 10, height = 10) {
        this.width = width;
        this.height = height;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.speed = speed;
        this.cooldown = cooldown;
    }
    handleMovement(keys, deltaTime) {
        if (keys["ArrowUp"]) this.y -= this.speed * deltaTime;
        if (keys["ArrowDown"]) this.y += this.speed * deltaTime;
        if (keys["ArrowLeft"]) this.x -= this.speed * deltaTime;
        if (keys["ArrowRight"]) this.x += this.speed * deltaTime;
    }
    checkBoundaries(gameZone) {
        this.x = Math.max(gameZone.x, Math.min(this.x, gameZone.x + gameZone.width - this.width));
        this.y = Math.max(gameZone.y, Math.min(this.y, gameZone.y + gameZone.height - this.height));
    }
    shoot(bullets, direction = 180, speed = 1000, radius = 20, color = "red") {
        const bullet = new Bullet(
            true,
            direction,
            this.x + this.width / 2,
            this.y + this.height / 2,
            speed,
            radius,
            "red"
        );
        bullets.push(bullet);
        this.cooldown = 0.05;
    }
    update(deltaTime, keys, gameZone, bullets) {
        if (this.cooldown > 0) this.cooldown -= deltaTime;

        this.handleMovement(keys, deltaTime);
        this.checkBoundaries(gameZone);

        if (keys["y"] && this.cooldown <= 0) {
            this.shoot(bullets)
        }
    }

    render(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

};
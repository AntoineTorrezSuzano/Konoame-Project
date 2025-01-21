import Bullet from "./Bullet.mjs";

export default class Player {
    constructor(x, y, speed, spriteSrc, cooldown = 0, hitboxSize = 10) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = new Image();
        this.sprite.src = spriteSrc;
        this.cooldown = cooldown;

        // hitbox properties
        this.hitboxSize = hitboxSize;
        this.hitboxOffset = hitboxSize / 2; // to center the hitbox
    }
    handleMovement(keys, deltaTime) {
        const currentSpeed = keys["shift"] ? this.speed / 2 : this.speed;
        if (keys["arrowup"]) this.y -= currentSpeed * deltaTime;
        if (keys["arrowdown"]) this.y += currentSpeed * deltaTime;
        if (keys["arrowleft"]) this.x -= currentSpeed * deltaTime;
        if (keys["arrowright"]) this.x += currentSpeed * deltaTime;
    }
    checkBoundaries(gameZone) {
        const halfSize = this.hitboxOffset; // For centering hitbox
        this.x = Math.max(gameZone.x + halfSize, Math.min(this.x, gameZone.x + gameZone.width - halfSize));
        this.y = Math.max(gameZone.y + halfSize, Math.min(this.y, gameZone.y + gameZone.height - halfSize));
    }
    shoot(bullets, direction = 180, speed = 2000, radius = 5, color = "red") {
        const bullet = new Bullet(
            true,
            direction,
            this.x,
            this.y,
            speed,
            radius,
            color,
            "./assets/characters/reimu/bullet_0.png"
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

        ctx.drawImage(this.sprite, this.x - this.sprite.width / 2, this.y - this.sprite.height / 2);

        ctx.save();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.hitboxOffset, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

};
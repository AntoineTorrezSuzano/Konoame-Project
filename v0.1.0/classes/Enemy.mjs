
import Bullet from "./Bullet.mjs";
export default class Enemy {
    constructor(x, y, speed, spriteSrc, cooldown = 2, hitboxSize = 20, maxHp = 10000) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = new Image();
        this.sprite.src = spriteSrc;
        this.cooldown = cooldown;
        this.hitboxSize = hitboxSize;
        this.hitboxOffset = hitboxSize / 2;
        this.currentCooldown = 0;

        this.hp = maxHp;
        this.maxHp = maxHp;
    }

    update(deltaTime, bullets) {
        if (this.currentCooldown > 0) {
            this.currentCooldown -= deltaTime;
        }

        this.y += this.speed * deltaTime;

        if (this.currentCooldown <= 0) {
            this.shoot(bullets);
            this.currentCooldown = this.cooldown;
        }
        this.handleCollisions(bullets);

    }
    shoot(bullets) {
        const bullet = new Bullet(
            false,
            0,
            this.x,
            this.y + this.hitboxOffset,
            300,
            5,
            "blue",
            "./assets/enemy/rumia/bullet00.png"
        )
        bullets.push(bullet);
    }
    handleCollisions(bullets) {

        for (let i = bullets.length - 1; i >= 0; i--) {

            const bullet = bullets[i];
            if (bullet.friendly && bullet.collidesWith(this)) {
                console.log(bullet);
                this.hp -= 100;
                bullets.splice(i, 1);
                if (this.hp <= 0) {
                    this.onDeath();
                    break;
                }
            }
        }
    }
    onDeath() {
        console.log("Rumia defeated !");
    }


    render(ctx) {
        ctx.drawImage(
            this.sprite,
            this.x - this.sprite.width * 2 / 2,
            this.y - this.sprite.height * 2 / 2,
            this.sprite.width * 2,
            this.sprite.height * 2
        );
        // ctx.fillRect(this.x - this.hitboxOffset, this.y - this.hitboxOffset, this.hitboxSize, this.hitboxSize);
    }
    isOffScreen(scene) {
        return this.y - this.hitboxSize > scene.height;
    }

    renderHpBar(ctx, gameZone) {
        const barWidth = gameZone.width * 0.8;
        const barHeight = 10;
        const barX = gameZone.x + (gameZone.width - barWidth) / 2;
        const barY = gameZone.y + barHeight - 5;

        const hpRatio = this.hp / this.maxHp; //give like 0.8 if it has 80% of hp

        // Background bar
        ctx.fillStyle = "gray";
        ctx.fillRect(barX, barY, barWidth, barHeight);
        // current HP bar
        ctx.fillStyle = "red";
        ctx.fillRect(barX, barY, barWidth * hpRatio, barHeight);
        // Border around the bar
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY, barWidth, barHeight);

    }
}
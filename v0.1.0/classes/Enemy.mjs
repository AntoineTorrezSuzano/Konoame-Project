
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
        this.currentCooldown = 0;

        this.hp = maxHp;
        this.maxHp = maxHp;

        this.width = hitboxSize;
        this.height = hitboxSize;

        this.sprite.onload = () => {
            this.width = this.sprite.width * 2;
            this.height = this.sprite.height * 2;
        }
    }

    update(deltaTime, bullets, enemies) {
        if (this.currentCooldown > 0) {
            this.currentCooldown -= deltaTime;
        }

        this.y += this.speed * deltaTime;

        if (this.currentCooldown <= 0) {
            this.shoot(bullets);
            this.currentCooldown = this.cooldown;
        }
        this.handleCollisions(bullets, enemies);

    }
    shoot(bullets) {
        const bullet = new Bullet({
            friendly: false,
            direction: 0,
            x: this.x,
            y: this.y + this.height / 2,
            speed: 300,
            spriteSrc: "./assets/enemy/rumia/bullet00.png",
            isRound: true,
        })
        bullets.push(bullet);
    }
    handleCollisions(bullets, enemies) {

        for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];
            if (bullet.friendly && bullet.collidesWith(this)) {
                this.hp -= bullet.damage;
                bullets.splice(i, 1);
                if (this.hp <= 0) {
                    this.onDeath(enemies);
                    break;
                }
            }
        }
    }
    onDeath(enemies) {
        console.log("Rumia defeated !");
        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];
            if (enemy == this) {
                enemies.splice(i, 1);
            }
        }
    }


    render(ctx) {
        ctx.drawImage(
            this.sprite,
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        ctx.save();
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.strokeRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();
    }
    isOffScreen(scene) {
        return this.y - this.height > scene.height;
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
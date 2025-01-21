export default class Bullet {
    constructor(
        friendly = true,
        direction = 0,
        x = 0,
        y = 0,
        speed = 500,
        radius = 5,
        color = "white",
        spriteSrc = null // Sprite source
    ) {
        this.friendly = friendly;
        this.direction = direction;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.color = color;

        this.sprite = null;
        if (spriteSrc) {
            this.sprite = new Image();
            this.sprite.src = spriteSrc;
        }

    }



    getVelocity() {
        const radians = (this.direction * Math.PI) / 180;
        return {
            x: Math.sin(radians) * this.speed,
            y: Math.cos(radians) * this.speed,
        };
    }
    update(deltaTime) {
        const velocity = this.getVelocity();
        this.x += velocity.x * deltaTime;
        this.y += velocity.y * deltaTime;
    }
    render(ctx) {
        if (this.sprite) {
            ctx.drawImage(
                this.sprite,
                this.x - this.sprite.width / 2,
                this.y - this.sprite.height / 2
            );
        } else {
            // fallback circle if no sprite
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }


    }
    isOffScreen(scene) {
        const { x = 0, y = 0, width, height } = scene;
        return (
            this.x + this.radius < x ||
            this.x - this.radius > width + x ||
            this.y + this.radius < y ||
            this.y - this.radius > height + y
        );


    }
    collidesWith(target) {

        const targetWidth = target.width || target.hitboxSize;
        const targetHeight = target.height || target.hitboxSize;

        const targetX = target.x - targetWidth / 2;
        const targetY = target.y - targetHeight / 2;

        const dx = this.x - (targetX + targetWidth / 2);
        const dy = this.y - (targetY + targetHeight / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + Math.min(targetWidth, targetHeight) / 2;
    }


}
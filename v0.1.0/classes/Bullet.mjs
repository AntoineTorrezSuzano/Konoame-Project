export default class Bullet {
    constructor(
        friendly = true,
        direction = 0,
        x = 0,
        y = 0,
        speed = 500,
        radius = 5,
        color = "white"
    ) {
        this.friendly = friendly;
        this.direction = direction;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.color = color;
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
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    isOffScreen(scene) {
        if (scene.x && scene.y) {
            return (
                this.x + this.radius < scene.x ||
                this.x - this.radius > scene.width + scene.x ||
                this.y + this.radius < scene.y ||
                this.y - this.radius > scene.height + scene.y
            );
        } else {
            return (
                this.x + this.radius < 0 ||
                this.x - this.radius > scene.width ||
                this.y + this.radius < 0 ||
                this.y - this.radius > scene.height
            );
        }

    }
    collidesWith(target) {
        const dx = this.x - (target.x + target.width / 2);
        const dy = this.y - (target.y + target.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + Math.min(target.width, target.height) / 2;
    }


}
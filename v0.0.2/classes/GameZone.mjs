export default class GameZone {

    constructor(x, y, width, height, color = "orange") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    contains(x, y, width = 0, height = 0) {
        return (
            x >= this.x &&
            y >= this.y &&
            x + width <= this.x + this.width &&
            y + height <= this.y + this.height
        );
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

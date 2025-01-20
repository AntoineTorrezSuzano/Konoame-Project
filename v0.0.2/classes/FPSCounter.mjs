export class FPSCounter {
    constructor() {
        this.fps = 0;
        this.fpsCount = 0;
        this.lastTime = 0;
    }
    update(timestamp) {
        this.fpsCount++;
        if (timestamp - this.lastTime >= 1000) {
            this.fps = this.fpsCount;
            this.fpsCount = 0;
            this.lastTime = timestamp;
        }
    }
}
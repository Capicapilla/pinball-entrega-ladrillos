export class Paddle {
    constructor(x, y, width, height, color = '#0095DD') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 12;
        this.isMovingLeft = false;
        this.isMovingRight = false;
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    update(canvas) {
        // Movimiento del paddle
        if (this.isMovingLeft) {
            this.x = Math.max(0, this.x - this.speed);
        }
        if (this.isMovingRight) {
            this.x = Math.min(canvas.width - this.width, this.x + this.speed);
        }
    }
    
    setControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a') {
                this.isMovingLeft = true;
            }
            if (e.key === 'ArrowRight' || e.key === 'd') {
                this.isMovingRight = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a') {
                this.isMovingLeft = false;
            }
            if (e.key === 'ArrowRight' || e.key === 'd') {
                this.isMovingRight = false;
            }

        });
    }
}
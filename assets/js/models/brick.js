export class Brick {
  
constructor(x, y, width, height, color = '#FF0000') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.visible = true;
    }
    
    draw(ctx) {
        if (this.visible) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Añadir un borde para mejor apariencia
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
    
    // Método para verificar colisión con la pelota
    checkCollision(ball) {
        if (!this.visible) return false;
        
        // Detectar si la pelota colisiona con el ladrillo
        if (
            ball.x + ball.radius > this.x &&
            ball.x - ball.radius < this.x + this.width &&
            ball.y + ball.radius > this.y &&
            ball.y - ball.radius < this.y + this.height
        ) {
            this.visible = false;
            return true;
        }
        return false;
    }
}

console.log("vinculado con brick")
export class Ball {
    constructor(x, y, radius, speed, color = '#FFFFFF') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.dx = speed * Math.cos(Math.random() * Math.PI / 4 + Math.PI / 4);
        this.dy = -speed * Math.sin(Math.random() * Math.PI / 4 + Math.PI / 4);
        this.color = color;
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    
    update(canvas, paddle) {
        // Movimiento de la pelota
        this.x += this.dx;
        this.y += this.dy;
        
        // Colisión con los bordes horizontales
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        
        // Colisión con el borde superior
        if (this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        
        // Colisión con el paddle
        if (
            this.dy > 0 &&
            this.y + this.radius >= paddle.y &&
            this.y + this.radius <= paddle.y + paddle.height &&
            this.x >= paddle.x &&
            this.x <= paddle.x + paddle.width
        ) {
            // Calcular la posición de rebote para variar el ángulo
            let hitPosition = (this.x - paddle.x) / paddle.width;
            let angle = hitPosition * Math.PI - Math.PI / 2 ;
            
            this.dx = this.speed * Math.cos(angle);
            this.dy = -this.speed * Math.sin(angle);
        }
        
        // Verificar si la pelota toca el suelo (borde inferior)
        if (this.y + this.radius > canvas.height) {
            return true; // Vida perdida, la pelota desaparece
        }
        
        return false;
    }
}

console.log("vinculado con ball");
console.log("vinculado export Game con game.js");

import { Ball } from './ball.js';
import { Brick } from './brick.js';
import { Collision } from './collision.js';
import { Table } from './table.js';
import { Paddle } from './paddle.js';

export class Game {
    constructor(canvas, ctx) {
        console.log("Iniciando Game...");

        
        // Iniciar el juego con el canvas
        this.canvas = canvas;
        this.ctx = ctx;
        this.table = new Table(canvas);
        
        // Obtener dimensiones del canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        // Iniciar el paddle
        this.paddle = new Paddle(
            canvasWidth / 2 - 75,  // x (centrado)
            canvasHeight - 30,     // y (cerca del fondo)
            150,                   // ancho
            15                     // alto
        );
        this.paddle.setControls();
        
        // Inicializar la pelota
        this.ball = new Ball(
            canvasWidth / 2,       // x (centrado)
            canvasHeight -5,     // y (por encima del paddle)
            10,                    // radio
            6            // velocidad
        );
        
        // Inicializar ladrillos
        this.bricks = [];
        this.createBricks();
        
        // Estado del juego
        this.score = 0;
        this.lives = 3;
            //añado sonidos
        this.brickHitSound = new Audio('./assets/sounds/breakBrick.mp3');
        this.brickHitSound.volume = 0.3;
        this.winSound = new Audio('./assets/sounds/WIN.mp3');
        this.winSound.volume = 1;
        this.looserSound = new Audio('./assets/sounds/looser.mp3');
        this.looserSound.volume = 1;
        this.tryAgain = new Audio ('./assets/sounds/try-again.mp3');
        this.tryAgain.volume = 0.3;

        this.isGameOver = false;
        this.hasWon = false;
        
        // Iniciar el bucle del juego
        this.gameLoop();
    }
    
    createBricks() {
        const rows = 5;
        const cols = 10;
        const brickWidth = (this.canvas.width - 80) / cols;
        const brickHeight = 25;
        const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF'];
        
        console.log(`Creando ${rows * cols} ladrillos...`);
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                this.bricks.push(new Brick(
                    40 + c * brickWidth,
                    50 + r * (brickHeight + 10),
                    brickWidth - 4,
                    brickHeight,
                    colors[r]
                ));
            }
        }
    }
    
    drawScore() {
        this.ctx.font = '20px Montserrat';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
    }
    
    drawLives() {
        this.ctx.font = '20px Montserrat';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(`Lives: ${this.lives}`, this.canvas.width - 100, 30);
    }
    
    checkGameStatus() {
        // Si se gana el juego
        const remainingBricks = this.bricks.filter(brick => brick.visible).length;
        if (remainingBricks === 0) {
            this.hasWon = true;
            this.isGameOver = true;

            this.winSound.currentTime = 0;
            this.winSound.play();
        }
        
    }
    
    drawGameOver() {
        this.ctx.font = '40px Montserrat';
        this.ctx.fillStyle = '#FFFFFF';
        
        let message = this.hasWon ? 'You Win!' : 'Game Over';
        let x = this.canvas.width / 2 - this.ctx.measureText(message).width / 2;
        
        this.ctx.fillText(message, x, this.canvas.height / 2);
        
        // Mensaje para reiniciar
        this.ctx.font = '20px Montserrat';
        message = 'Press SPACE to restart';
        x = this.canvas.width / 2 - this.ctx.measureText(message).width / 2;
        this.ctx.fillText(message, x, this.canvas.height / 2 + 40);
    }
    
    resetBall() {
        // Creamos una nueva pelota cuando la anterior se pierde
        this.ball = new Ball(
            this.canvas.width / 2,
            this.canvas.height - 50,
            10,
            6 //velocidad cuando mueres, la bola al reiniciarse mantiene la velocidad
        );
        console.log("Nueva pelota creada");
    }
    
    restart() {
        this.score = 0;
        this.lives = 3;
        this.isGameOver = false;
        this.hasWon = false;
        this.bricks = [];
        this.createBricks();
        this.resetBall();
        
        // Reiniciar la posición del paddle
        this.paddle.x = this.canvas.width / 2 - 75;
    }
    
    gameLoop() {
    // Limpiar y actualizar el fondo
    this.table.update();

    if (!this.isGameOver) {
        // Actualizar y dibujar el paddle
        this.paddle.update(this.canvas);
        this.paddle.draw(this.ctx);

        // Actualizar y dibujar la pelota si está activa
        if (this.ball) { // Añadimos esta verificación
            const ballLost = this.ball.update(this.canvas, this.paddle);
            this.ball.draw(this.ctx);

            // Verificar si la pelota se perdió
            if (ballLost) {
                // La pelota desaparece
                this.ball = null;
                
                this.lives--;

                if (this.lives <= 0) {
                    this.isGameOver = true;
                    this.looserSound.currentTime = 0;
                    this.looserSound.play()
                } else {
                    // Espera un breve momento antes de crear una nueva pelota
                    this.tryAgain.currentTime = 0;
                    this.tryAgain.play();
                    setTimeout(() => {
                        this.resetBall();
                    }, 2000); // 1 segundo de retraso
                }
            }

            // Actualizar y dibujar los ladrillos
            for (const brick of this.bricks) {
                brick.draw(this.ctx);

                // Verificar colisión con la pelota SOLO si this.ball existe
                if (this.ball && brick.checkCollision(this.ball)) {
                    this.ball.dy = -this.ball.dy; // Invertir dirección vertical
                    this.score += 10;
                    //mi sonido
                    this.brickHitSound.currentTime = 0;
                    this.brickHitSound.play();
                }
            }
        }

        // Dibujar puntuación y vidas
        this.drawScore();
        this.drawLives();

        // Verificar estado del juego
        this.checkGameStatus();
    } else {
        // Mostrar pantalla de game over
        this.drawGameOver();
    }

    // Continuar el bucle del juego
    requestAnimationFrame(() => this.gameLoop());
}
    
}
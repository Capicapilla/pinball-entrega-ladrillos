export class Table {
    constructor(canvas) {
        // Recibimos directamente el elemento canvas o su ID
        if (typeof canvas === 'string') {
            this.canvas = document.getElementById(canvas);
            if (!this.canvas) {
                throw new Error(`Canvas with ID "${canvas}" not found`);
            }
        } else {
            this.canvas = canvas;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.backgroundColor = '#222222'; // Color de fondo predeterminado
    }
    
    // Método para dibujar el fondo
    drawBackground() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    // Método para limpiar el canvas
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    // Método para actualizar el canvas (se llamará en cada frame)
    update() {
        this.clear();
        this.drawBackground();
    }
    
    // Método para obtener el contexto del canvas
    getContext() {
        return this.ctx;
    }
    
    // Método para actualizar las dimensiones del canvas si cambia su tamaño
    updateDimensions() {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    
} 


console.log("vinculado con table")
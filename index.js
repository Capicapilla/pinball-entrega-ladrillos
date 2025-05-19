console.log("Está vinculado el index.js con el html");

// Importamos la clase Game
import { Game } from './assets/js/models/game.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM CARGADO");

    const canvas = document.getElementById('game');
    if (!canvas) {
        console.error("Canvas con ID 'game' no encontrado!");
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Inicializar el juego pasando el canvas y el contexto
    const game = new Game(canvas, ctx);
    
    // Event listener para reiniciar el juego
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && game.isGameOver) {
            game.restart();
        }
    });
});

// Función para hacer el canvas responsive
function resizeCanvas(canvas) {
    // Para mantener la proporción 9:10 del juego original
    const targetRatio = 9/10;
    let width = window.innerWidth * 0.8; // Usar 80% del ancho de ventana
    let height = window.innerHeight * 0.8; // Usar 80% del alto de ventana
    
    // Ajustar para mantener proporción
    const currentRatio = width / height;
    
    if (currentRatio > targetRatio) {
        // La ventana es demasiado ancha, ajustar el ancho
        width = height * targetRatio;
    } else {
        // La ventana es demasiado alta, ajustar la altura
        height = width / targetRatio;
    }
    
    canvas.width = width;
    canvas.height = height;
    
    // Si hay una instancia de juego en ejecución, notificarle del cambio de tamaño
    // Esto requeriría alguna implementación adicional en la clase Game
}

// Aplica el tamaño inicial
window.addEventListener('load', () => {
    const canvas = document.getElementById('game');
    resizeCanvas(canvas);
});

// Actualiza el tamaño cuando cambia la ventana
window.addEventListener('resize', () => {
    const canvas = document.getElementById('game');
    resizeCanvas(canvas);
    
    // Aquí podrías agregar código para reiniciar o reajustar el juego después de redimensionar
    // Por ejemplo: game.updateDimensions(); si implementas ese método
});
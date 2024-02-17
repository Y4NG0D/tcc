// Variáveis globais
var canvas, ctx;
var playerX = 50;
var playerY = 200;
var playerWidth = 50;
var playerHeight = 50;

// Função principal para inicializar o jogo
function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // Iniciar o loop do jogo
    gameLoop();
}

// Função principal para atualizar e desenhar o jogo
function gameLoop() {
    update();
    draw();
    
    requestAnimationFrame(gameLoop);
}

// Função para atualizar a lógica do jogo
function update() {
    // Atualizar a posição do jogador
    playerX += 2; // Exemplo de movimento linear
}

// Função para desenhar os elementos do jogo
function draw() {
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar o jogador
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

// Iniciar o jogo quando a página for carregada
window.onload = function() {
    init();
};

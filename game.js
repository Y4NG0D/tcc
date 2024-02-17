// Variáveis globais
var canvas, ctx;
var playerX = 50;
var playerY = 200;
var playerWidth = 50;
var playerHeight = 50;
var playerSpeed = 2;
var jumping = false;

// Event listeners para capturar as teclas pressionadas
window.addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        case 37: // Tecla esquerda
            moveLeft();
            break;
        case 39: // Tecla direita
            moveRight();
            break;
        case 32: // Tecla espaço
            jump();
            break;
    }
});

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
    if (jumping) {
        playerY -= 5;
        if (playerY <= 100) {
            jumping = false;
        }
    } else {
        playerY += 5;
        if (playerY >= 200) {
            playerY = 200;
        }
    }
}

// Função para desenhar os elementos do jogo
function draw() {
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar o jogador
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

function moveLeft() {
    playerX -= playerSpeed;
}

function moveRight() {
    playerX += playerSpeed;
}

function jump() {
    if (!jumping && playerY === 200) {
        jumping = true;
    }
}

// Iniciar o jogo quando a página for carregada
window.onload = function() {
    init();
};

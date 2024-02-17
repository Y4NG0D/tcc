// Variáveis globais
var canvas, ctx;
var playerX = 150;
var playerY = 200;
var playerWidth = 50;
var playerHeight = 50;
var playerSpeed = 5; // Aumentando a velocidade de movimento
var jumping = false;
var jumpPower = 8; // Força do pulo
var jumpSpeed = 3; // Velocidade horizontal durante o pulo

// Variáveis para controle de movimento
var moveLeftKeyPressed = false;
var moveRightKeyPressed = false;

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

// Event listeners para detectar quando as teclas são soltas
window.addEventListener("keyup", function(event) {
    switch(event.keyCode) {
        case 37: // Tecla esquerda
            moveLeftKeyPressed = false;
            break;
        case 39: // Tecla direita
            moveRightKeyPressed = false;
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
        // Movimento lateral durante o pulo
        if (playerX < canvas.width - playerWidth && moveRightKeyPressed) {
            playerX += jumpSpeed;
        }
        if (playerX > 0 && moveLeftKeyPressed) {
            playerX -= jumpSpeed;
        }

        // Atualizar a posição vertical do jogador
        playerY -= jumpPower;

        // Verificar se o jogador chegou ao topo do pulo
        if (playerY <= 100) {
            jumping = false;
        }
    } else {
        // Movimento lateral ao andar para a direita ou para a esquerda
        if (moveRightKeyPressed) {
            playerX += playerSpeed;
        }
        if (moveLeftKeyPressed) {
            playerX -= playerSpeed;
        }

        // Simular a gravidade
        if (playerY < 200) {
            playerY += 2; // Velocidade de queda
        }
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

// Funções para controle de movimento
function moveLeft() {
    moveLeftKeyPressed = true;
}

function moveRight() {
    moveRightKeyPressed = true;
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

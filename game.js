// Variáveis globais
var canvas, ctx;
var playerX = 400; // Posição inicial do jogador no centro da tela
var playerY = 200;
var playerWidth = 50;
var playerHeight = 50;
var playerSpeed = 21; // Aumentando a velocidade de movimento em 50%
var jumping = false;
var jumpPower = 24;
var jumpSpeed = 15;

// Variáveis para controle de movimento
var moveLeftKeyPressed = false;
var moveRightKeyPressed = false;
var jumpKeyPressed = false;
var touchControl = false; // Flag para indicar se os controles de tela sensível ao toque estão ativados

// Event listeners para capturar as teclas pressionadas
window.addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        case 37: // Tecla esquerda
            moveLeftKeyPressed = true;
            break;
        case 39: // Tecla direita
            moveRightKeyPressed = true;
            break;
        case 32: // Tecla espaço
            jumpKeyPressed = true;
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
        case 32: // Tecla espaço
            jumpKeyPressed = false;
            break;
    }
});

// Função principal para inicializar o jogo
function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // Adicionar evento de clique ao botão Mobile/Desktop
    var mobileDesktopButton = document.getElementById("mobileDesktopButton");
    mobileDesktopButton.addEventListener("click", toggleTouchControl);

    // Iniciar o loop do jogo
    gameLoop();
}

// Função para alternar entre os controles de tela sensível ao toque e os controles de teclado
function toggleTouchControl() {
    touchControl = !touchControl;
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
        if (moveRightKeyPressed && playerX < canvas.width - playerWidth) {
            playerX += jumpSpeed;
        }
        if (moveLeftKeyPressed && playerX > 0) {
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
        if (moveRightKeyPressed && playerX < canvas.width - playerWidth) {
            playerX += playerSpeed;
        }
        if (moveLeftKeyPressed && playerX > 0) {
            playerX -= playerSpeed;
        }

        // Simular a gravidade
        if (playerY < 200) {
            playerY += 3; // Velocidade de queda
        }
        if (playerY >= 200) {
            playerY = 200;
        }
    }

    // Verificar se o jogador está no chão e a tecla de pulo está pressionada
    if (!jumping && jumpKeyPressed) {
        jump();
    }

    // Atualizar a lógica dos controles de tela sensível ao toque
    if (touchControl) {
        // Implementar lógica de controle de tela sensível ao toque aqui
    }

    // Implementar colisões laterais para impedir que o jogador ultrapasse os limites da tela
    if (playerX < 0) {
        playerX = 0;
    }
    if (playerX + playerWidth > canvas.width) {
        playerX = canvas.width - playerWidth;
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

// Função para o pulo do jogador
function jump() {
    jumping = true;
}

// Iniciar o jogo quando a página for carregada
window.onload = function() {
    init();
};

// Função para desenhar os elementos do jogo
function draw() {
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar o jogador (gato)
    ctx.fillStyle = "#333"; // Cor do corpo do gato
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight); // Desenha o corpo do gato

    // Desenhar a cabeça do gato
    ctx.fillStyle = "#333"; // Cor da cabeça do gato
    ctx.fillRect(playerX + 15, playerY - 40, 40, 40); // Desenha a cabeça do gato

    // Desenhar as orelhas do gato
    ctx.fillStyle = "#333"; // Cor das orelhas do gato
    ctx.fillRect(playerX + 10, playerY - 20, 20, 20); // Desenha a orelha esquerda do gato
    ctx.fillRect(playerX + 40, playerY - 20, 20, 20); // Desenha a orelha direita do gato

    // Desenhar os olhos do gato
    ctx.fillStyle = "#fff"; // Cor dos olhos do gato
    ctx.fillRect(playerX + 20, playerY - 30, 10, 10); // Desenha o olho esquerdo do gato
    ctx.fillRect(playerX + 40, playerY - 30, 10, 10); // Desenha o olho direito do gato

    // Desenhar as patas do gato
    ctx.fillStyle = "#333"; // Cor das patas do gato
    ctx.fillRect(playerX + 20, playerY + 50, 10, 30); // Desenha a pata esquerda do gato
    ctx.fillRect(playerX + 40, playerY + 50, 10, 30); // Desenha a pata direita do gato

    // Desenhar a cauda do gato
    ctx.fillStyle = "#333"; // Cor da cauda do gato
    ctx.fillRect(playerX - 30, playerY + 20, 30, 80); // Desenha a cauda do gato
}

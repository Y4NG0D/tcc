var canvas, ctx;
var playerX = 400; // Posição inicial do jogador no centro da tela
var playerY = 200;
var playerWidth = 50;
var playerHeight = 50;
var playerSpeed = 21; // Aumentando a velocidade de movimento em 50%
var jumping = false;
var jumpPower = 24;
var jumpSpeed = 15;
var collisionZoneWidth = 300; // Largura da zona de colisão
var collisionZoneHeight = 200; // Altura da zona de colisão

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
            playerY += 10; // Velocidade de queda
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


// Função para atualizar a lógica do jogo
function update() {
    // Atualizar a posição do jogador
    if (jumping) {
        // Movimento lateral durante o pulo
        if (moveRightKeyPressed && playerX < canvas.width - playerWidth && playerX + playerWidth < canvas.width - collisionZoneWidth / 2) {
            playerX += jumpSpeed;
        }
        if (moveLeftKeyPressed && playerX > 0 && playerX > collisionZoneWidth / 2) {
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
        if (moveRightKeyPressed && playerX < canvas.width - playerWidth && playerX + playerWidth < canvas.width - collisionZoneWidth / 2) {
            playerX += playerSpeed;
        }
        if (moveLeftKeyPressed && playerX > 0 && playerX > collisionZoneWidth / 2) {
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

    // Implementar colisões laterais para impedir que o jogador ultrapasse os limites da tela
    if (playerX < collisionZoneWidth / 2) {
        playerX = collisionZoneWidth / 2;
    }
    if (playerX + playerWidth > canvas.width - collisionZoneWidth / 2) {
        playerX = canvas.width - playerWidth - collisionZoneWidth / 2;
    }
}


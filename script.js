document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');
    const size = 5;
    const treasures = 3;
    const traps = 3;
    let tiles = [];
    let treasuresFound = 0;
    let gameOver = false;

    function initGame() {
        gameBoard.innerHTML = '';
        tiles = [];
        treasuresFound = 0;
        gameOver = false;
        restartButton.style.display = 'none';

        for (let i = 0; i < size * size; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.index = i;
            tile.addEventListener('click', handleClick);
            gameBoard.appendChild(tile);
            tiles.push(tile);
        }

        placeItems('treasure', treasures);
        placeItems('trap', traps);
    }

    function placeItems(type, count) {
        let placed = 0;
        while (placed < count) {
            const index = Math.floor(Math.random() * tiles.length);
            if (!tiles[index].classList.contains('treasure') && !tiles[index].classList.contains('trap')) {
                tiles[index].classList.add(type);
                placed++;
            }
        }
    }

    function handleClick(event) {
        if (gameOver) return;

        const tile = event.target;
        tile.classList.add('revealed');
        if (tile.classList.contains('treasure')) {
            tile.textContent = '💎';
            treasuresFound++;
            if (treasuresFound === treasures) {
                alert('You win! All treasures found!');
                gameOver = true;
                restartButton.style.display = 'block';
            }
        } else if (tile.classList.contains('trap')) {
            tile.textContent = '💣';
            alert('You lose! You clicked on a trap!');
            gameOver = true;
            restartButton.style.display = 'block';
        } else {
            tile.textContent = '❌';
        }
        tile.removeEventListener('click', handleClick);
    }

    restartButton.addEventListener('click', initGame);

    initGame();

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const gridSizeInput = document.getElementById('grid-size');
    const gridSection = document.getElementById('grid-section');
    const gridTitle = document.getElementById('grid-title');
    const gridContainer = document.getElementById('grid-container');

    let currentN = 0;
    let hasStart = false;
    let hasEnd = false;
    let obstacleCount = 0;
    let maxObstacles = 0;

    generateBtn.addEventListener('click', () => {
        const n = parseInt(gridSizeInput.value, 10);

        if (isNaN(n) || n < 5 || n > 9) {
            alert("請輸入介於 5 到 9 之間的數字！");
            return;
        }

        // Reset state
        currentN = n;
        hasStart = false;
        hasEnd = false;
        obstacleCount = 0;
        maxObstacles = n - 2;

        // Update UI
        gridTitle.textContent = `${n} x ${n} Square:`;
        gridSection.style.display = 'block';

        // Generate Grid
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns = `repeat(${n}, 40px)`;
        gridContainer.style.gridTemplateRows = `repeat(${n}, 40px)`;

        const totalCells = n * n;
        for (let i = 1; i <= totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = i;

            cell.addEventListener('click', handleCellClick);

            gridContainer.appendChild(cell);
        }
    });

    function handleCellClick(e) {
        const cell = e.target;

        // Ignore clicks if the cell already has a state
        if (cell.classList.contains('start') ||
            cell.classList.contains('end') ||
            cell.classList.contains('obstacle')) {
            return;
        }

        if (!hasStart) {
            cell.classList.add('start');
            hasStart = true;
        } else if (!hasEnd) {
            cell.classList.add('end');
            hasEnd = true;
        } else {
            // Setting obstacles
            if (obstacleCount < maxObstacles) {
                cell.classList.add('obstacle');
                obstacleCount++;
            } else {
                alert(`障礙物數量已達上限 (${maxObstacles} 個)`);
            }
        }
    }
});

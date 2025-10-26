// Clicking cell to change color
const gridCells = document.querySelectorAll('.grid-cell');

// Resize the window when page loads
window.resizeTo(800, 600); // width, height in pixels

gridCells.forEach(cell => {
// Number each grid cell
gridCells.forEach((cell, index) => {
    cell.textContent = index;
});

gridCells.forEach((cell) => {
    cell.addEventListener('click', function() {
        //  Random color
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        this.style.backgroundColor = randomColor;
    });
});
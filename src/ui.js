const field = document.querySelectorAll('[data-battlefield]');

field.forEach((f) => {
  createGrid(10, f)
});

function createGrid(size, element) {
  for (let i = 0; i < size * size; i++) {
    let cell = document.createElement('div');

    cell.style.height = 600 / size + 'px';
    cell.style.width = 600 / size + 'px';
    cell.classList.add('cell');
    element.appendChild(cell);
  }
}
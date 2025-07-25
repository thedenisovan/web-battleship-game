// For each battlefield create a grid of 10x10 cells
const field = document
  .querySelectorAll('[data-battlefield]')
  .forEach((f) => createGrid(10, f));

function createGrid(size, element) {
  for (let i = 0; i < size * size; i++) {
    let cell = document.createElement('div');

    cell.style.height = `${100 / size}%`;
    cell.style.width = `${100 / size}%`;
    cell.classList.add('cell');
    cell.id = i < 10 ? '0' + i : i;
    element.appendChild(cell);
  }
}

let cel = document.querySelectorAll('.cell').forEach((c) => {
  c.addEventListener('click', () => {
    console.log(c.id[0]);
  });
});
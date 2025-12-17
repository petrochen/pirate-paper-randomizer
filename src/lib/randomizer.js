export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
export const NUMBERS = [1, 2, 3, 4, 5, 6, 7];
export const TOTAL_CELLS = 49;

// Cryptographically secure random number generator
export function secureRandom(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

// Generate all cell coordinates
export function getAllCells() {
    const cells = [];
    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 7; col++) {
            cells.push({
                row,
                col,
                key: `${row}-${col}`,
                label: `${LETTERS[col]}${NUMBERS[row]}`
            });
        }
    }
    return cells;
}

// Fisher-Yates shuffle with secure random
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = secureRandom(i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function getAvailableCells(usedCellsSet) {
    const all = getAllCells();
    return all.filter(cell => !usedCellsSet.has(cell.key));
}

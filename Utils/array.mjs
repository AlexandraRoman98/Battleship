export function create2DArrayWithFill(dim, fillValue = null) {
    return Array(dim).fill().map(() => Array(dim).fill(fillValue));
}
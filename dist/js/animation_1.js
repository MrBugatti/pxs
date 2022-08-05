import { generateGraphic, canvasAnimation, selectCell } from './lib/pxs.js';

const width = '200px';
const height = '200px';
const cellWidth = 25;
const cellHeight = 25;

async function task(x, y) {
    await timer(300);
    canvasAnimation([{
        dimension: selectCell(x, y, 1, 1),
        styles: {
            animationName: 'example',
            animationDuration: '1s',
            animationIterationCount: 'infinite',
        },
    }, ]);
}

async function main(meta) {
    for (let y = 0; y < meta.rows; y++) {
        for (let x = 0; x < meta.columns; x++) {
            await task(x, y);
        }
    }
}

function timer(ms) { return new Promise(res => setTimeout(res, ms)); }

generateGraphic(width, height, cellWidth, cellHeight).then((meta) => {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = meta.html;
    main(meta);
});
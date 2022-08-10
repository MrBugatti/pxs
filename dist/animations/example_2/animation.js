import { generateGraphic, canvasAnimation, selectCell } from '../../lib/pxs.js';

const width = '300px';
const height = '300px';
const cellWidth = 50;
const cellHeight = 50;

async function task(x, y) {
    await timer(300);
    canvasAnimation([{
        dimension: selectCell(x, y, 1, 1),
        styles: {
            animationName: 'example',
            animationDuration: '1s',
        },
    }, ]);
}

async function main(meta) {
    for (let y = 1; y <= meta.rows; y++) {
        for (let x = 1; x <= meta.columns; x++) {
            console.log(x, y);
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
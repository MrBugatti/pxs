import { generateGraphic, canvasAnimation, selectCell } from '../../lib/pxs.js';

const width = '300px';
const height = '300px';
const cellWidth = 50;
const cellHeight = 50;

async function task(x, y) {
    await timer(10);
    console.log(x, y);
    canvasAnimation([{
        dimension: selectCell(x, y, 1, 1),
        styles: {
            animationName: 'example',
            animationDuration: '1s',
        },
    }, ]);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main(meta) {
    console.log('meta', meta);
    setInterval(async() => {
        const x = getRandomInt(1, 6);
        const y = getRandomInt(1, 6);
        await task(x, y);
    }, 1000);

}

function timer(ms) { return new Promise(res => setTimeout(res, ms)); }

generateGraphic(width, height, cellWidth, cellHeight).then((meta) => {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = meta.html;
    main(meta);
});
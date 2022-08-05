// Example
// const width = '200px';
// const height = '200px';
// const cellWidth = 25;
// const cellHeight = 25;

const generateGraphic = (width, height, cellWidth, cellHeight) => {
    return new Promise((resolve, reject) => {
        let row = '';
        const canvasWidth = (width === '100%' ? window.innerWidth : parseInt(width));
        const canvasHeight = (height === '100%' ? window.innerHeight : parseInt(height));
        const columns = Math.floor(canvasWidth / cellWidth);
        const rows = Math.floor(canvasHeight / cellHeight);
        const cells = columns * rows;
        let xPos = 0;
        let yPos = 0;
        for (let x = 0; x < cells; x++) {
            row += `<div style="display:block;width:${cellWidth}px;height:${cellHeight}px" class="x-${xPos++} y-${yPos} cell"></div>`;
            if (xPos === columns) {
                xPos = 0;
                yPos++;
            }
        }
        resolve({
            html: `<div style="display:flex; flex-wrap: wrap; max-width:${columns * cellWidth}px;max-height:${rows * cellHeight}px" class="grid">${row}</div>`,
            count: cells,
            columns: columns,
            rows: rows,
            width: canvasWidth,
            height: canvasHeight
        });
    });
};

function resetAnimation(cell) {
    cell.style.animation = "none";
    cell.offsetHeight; /* trigger reflow */
    cell.style.animation = null;
}


const canvasAnimation = (elements) => {
    if (!elements || !elements.length) {
        console.warn('PXS: canvasAnimation parameter undefined');
        return;
    }
    for (let element of elements) {
        const cells = document.querySelectorAll(element.dimension);
        for (let cell of cells) {
            resetAnimation(cell);
            cell.style.animation = 'none';
            Object.assign(cell.style, element.styles);
        }
    }
};


const selectCell = (xPoint, yPoint, columnAmount, rowAmount) => {
    let frame = [];
    for (let y = 0; y < columnAmount; y++) {
        for (let x = 0; x < rowAmount; x++) {
            frame.push(`.x-${xPoint}.y-${yPoint}`);
        }
    }
    return frame;
};
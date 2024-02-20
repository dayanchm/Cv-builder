// drawTemplate.js
const { createCanvas, loadImage } = require('canvas');


function drawTemplate1(ctx, name, surname) {
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    ctx.fillText(name, 50, 50); 
    ctx.fillText(surname, 50, 70); 
}

function drawTemplate2(ctx, name, surname, canvasWidth, canvasHeight) {
    ctx.fillStyle = 'blue';
    ctx.font = '20px Arial';
    const bgColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillText(name, 100, 100); 
    ctx.fillText(surname, 100, 120);
}

module.exports = { drawTemplate1, drawTemplate2 };

const {createCanvas} = require('canvas');


function drawTemplate2(ctx, name, surname) {
    const canvasWidth = 800;
    const canvasHeight = 600;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    ctx.fillText(name, 50, 50); 
    ctx.fillText(surname, 50, 70); 
}

module.exports = drawTemplate2;
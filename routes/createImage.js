const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const imageToBase64 = require('image-to-base64');

async function convertToImg(photoBuffer, format, fileName) {
    try {
        // Base64'e dönüştürme
        const base64Image = await imageToBase64(photoBuffer, { outputType: format });

        // Base64 verisini dosyaya yazma
        await writeFileAsync(fileName, base64Image, 'base64');

        console.log(`Image converted to ${format} and saved as ${fileName}`);
    } catch (error) {
        console.error('Error converting image to Base64:', error);
    }
}


module.exports = convertToImg;
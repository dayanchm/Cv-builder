const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { createCanvas, loadImage, Image } = require('canvas');
router.use(bodyParser.urlencoded({ extended: true }));
const applyTemplate1 = require('./template/applyTemplate1');
const applyTemplate2 = require('./template/applyTemplate2');
const applyTemplate3 = require('./template/applyTemplate3');
const applyTemplate4 = require('./template/applyTemplate4');
const applyTemplate5 = require('./template/applyTemplate5');
const applyTemplate6 = require('./template/applyTemplate6');
const applyTemplate7 = require('./template/applyTemplate7');
const applyDefaultTemplate = require('./template/applyDefaultTemplate');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pdfDirectory = path.join(__dirname, '../uploads/pdf');


router.get('/create-cv', (req, res) => {
    const images = []; 
    res.render('create', {
    name: '', 
    surname: '',
    eposta: '',
    phonenumber: '',
    address: '',
    site: '',
    position: '',
    about: '',
    date: '',
    posta: '',
    city: '',
    birth: '',
    asker: '',
    surucu: '',
    medeni: '',
    photoBuffer: '',
    images: images });
});
function drawTemplate1(ctx, name, surname, position, about, photoBuffer) {
    // Adı Soyadı
    const maxWidth = 300; 
    const lineHeight = 12; 

    ctx.fillStyle = '#5C2ED7';
    ctx.font = 'bold 20px Times New Roman';
    drawWrappedText(ctx, name + '  ' + surname, 60, 100, maxWidth, lineHeight);
    // Pozisyon
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 18px Times New Roman';
    drawWrappedText(ctx, position, 60, 130, maxWidth, lineHeight);

    // Hakkımda
    ctx.fillStyle = '#000000';
    ctx.font = 'normal 10px Times New Roman';
    const textX = 60;
    let textY = 160;
    drawWrappedText(ctx, about, textX, textY, maxWidth, lineHeight);

    // Fotoğraf
    if (photoBuffer) {
        const img = new Image();
        img.src = photoBuffer;
        ctx.drawImage(img, 400, 100, 200, 200);
    }

    const canvasDataUrl = ctx.canvas.toDataURL();
    return canvasDataUrl;
}
function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}
router.get('/download', upload.single('photo'), async (req, res) => {
    const { style } = req.query;

    const canvasWidth = 1357;
    const canvasHeight = 1025;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    const name = req.session.name;
    const surname = req.session.surname;
    const position  = req.session.position;
    const about = req.session.about;
    const photoBuffer = req.session.photoBuffer;

    if (!name || !surname || !position || !about || !photoBuffer) {
        return res.status(400).send('Error: Missing required fields.');
    }

    if (style === '1') {
        drawTemplate1(ctx, name, surname,position, about, photoBuffer,canvasWidth, canvasHeight,);
    } else {
        return res.status(400).send('Geçersiz stil seçimi');
    }

    const pdfDoc = new PDFDocument();
    const writeStream = fs.createWriteStream(`output_${style}.pdf`);
    pdfDoc.pipe(writeStream);
    pdfDoc.image(canvas.toBuffer(), 0, 0, { width: canvasWidth, height: canvasHeight });
    pdfDoc.end();
    
    writeStream.on('finish', () => {
        console.log('PDF oluşturuldu.');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=output_${style}.pdf`);
        fs.createReadStream(`output_${style}.pdf`).pipe(res);
    });
});
router.post('/create-cvs', upload.single('photo'), async (req, res) => {
    const { name, surname,position,about } = req.body;
    const photoBuffer = req.file ? req.file.buffer : null;

    const canvasWidth = 1357;
    const canvasHeight = 1025;
    const template = req.body.template;

    req.session.name = name;
    req.session.surname = surname;
    req.session.photoBuffer = photoBuffer;
    req.session.position = position;
    req.session.about = about;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');


    const canvasDataUrl = drawTemplate1(ctx, name, surname,position,about, photoBuffer);

    req.session.images = [canvasDataUrl];
    res.render('create-cv', { 
        template,
        name, 
        surname, 
        photoBuffer,
        position,
        eposta: req.session.eposta, 
        phonenumber: req.body.phonenumber, 
        address: req.body.address, 
        site: req.body.site, 
        about: req.body.about, 
        date: req.body.date, 
        posta: req.body.posta, 
        city: req.body.city, 
        birth: req.body.birth, 
        asker: req.body.asker, 
        surucu: req.body.surucu, 
        medeni: req.body.medeni, 
        gender: req.body.gender,
        images: req.session.images, 
        canvasWidth, 
        canvasHeight ,
        canvasDataUrl // canvasDataUrl burada tanımlanıyor
    });
});


///

router.post('/create-cv-pdf', upload.single('photo'), async (req, res) => {
    try {
        const {
            template,
            name,
            surname,
            eposta,
            phonenumber,
            address,
            site,
            position,
            about,
            date,
            posta,
            city,
            birth,
            asker,
            surucu,
            medeni,
            gender
        } = req.body;

        const photoBuffer = req.file ? req.file.buffer : null;

        const experiences = req.body.experiences;

        const skilss = req.body.skilles;

        const langss = req.body.langs;

        const referance = req.body.referance;

        const academi = req.body.academi;

        const randomString = Math.random().toString(36).substring(2, 8);
        const fileName = `mobilecv-${randomString}.pdf`;
        const pdfPath = path.join(pdfDirectory, fileName);
        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        doc.pipe(fs.createWriteStream(pdfPath));

        doc.font('Helvetica');
        if (template === 'template1') {
            applyTemplate1(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template2') {
            applyTemplate2(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template3') {
            applyTemplate3(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template4') {
            applyTemplate4(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template5') {
            applyTemplate5(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template6') {
            applyTemplate6(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template7') {
            applyTemplate7(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
        } else {
            applyDefaultTemplate(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance, academi, city, posta, birth, asker, surucu, medeni, gender);
        }
        res.redirect(`/download-cv/${fileName}`);
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



/// Download cv
router.get('/download-cv/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const pdfPath = path.join(pdfDirectory, fileName);

    res.render('download', { fileName: fileName, pdfPath: pdfPath }); 
});



module.exports = router;
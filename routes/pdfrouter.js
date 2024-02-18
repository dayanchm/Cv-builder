const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const router = express.Router();
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

router.get('/download-cv/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const pdfPath = path.join(pdfDirectory, fileName);

    res.render('download', { fileName: fileName, pdfPath: pdfPath }); // download.ejs şablonunu render ederken dosya adını ve yolunu gönderiyoruz
});



module.exports = router;

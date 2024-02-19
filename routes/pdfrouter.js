const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
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
const unlinkAsync = promisify(fs.unlink);
const { fromPath } = require('pdf2pic');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });





router.post('/create-cv-pdf', upload.single('photo'), async (req, res) => {
    try {
        const { name, surname, eposta, phonenumber, address, site, position, about, date, posta, city, birth, asker, surucu, medeni, gender } = req.body;
        const photoBuffer = req.file ? req.file.buffer : null;
        const experiences = req.body.experiences;
        const skills = req.body.skills;
        const langs = req.body.langs;
        const referance = req.body.referance;
        const academi = req.body.academi;
        const pdfDirectory = path.join(__dirname, '../uploads/pdf');
        const randomString = Math.random().toString(36).substring(2, 8);

        const templates = ['template1', 'template2', 'template3', 'template4', 'template5', 'template6', 'template7'];

        const pdfPromises = templates.map(async template => {
            const pdfFileName = `mobilecv-${template}-${randomString}.pdf`;
            const pdfPath = path.join(pdfDirectory, pdfFileName);
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream(pdfPath));
            doc.font('Helvetica');

            switch (template) {
                case 'template1':
                    applyTemplate1(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skills, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
                    break;
                case 'template2':
                    applyTemplate2(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skills, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
                    break;
                case 'template3':
                    applyTemplate3(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skills, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
                    break;
                case 'template4':
                    applyTemplate4(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skills, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
                    break;
                case 'template5':
                    applyTemplate5(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skills, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
                    break;
                case 'template6':
                    applyTemplate6(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skills, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
                    break;
                case 'template7':
                    applyTemplate7(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skills, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender);
                    break;
                default:
                    applyDefaultTemplate(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skills, langs, experiences, referance, academi, city, posta, birth, asker, surucu, medeni, gender);
            }

            await new Promise((resolve, reject) => {
                doc.end();
                doc.on('end', resolve);
                doc.on('error', reject);
            });

            setTimeout(async () => {
                try {
                    await unlinkAsync(pdfPath);
                        const imgPath = path.join(pdfDirectory);
                        await unlinkAsync(imgPath);
                } catch (error) {
                    console.error('Error deleting files:', error);
                }
            }, 3000);

            return pdfPath;
        });

        await Promise.all(pdfPromises);


        res.send("Success");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/download-cv/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const pdfPath = path.join(pdfDirectory, fileName);

    res.render('download', { fileName: fileName, pdfPath: pdfPath });
});


router.get('/get-cv-pdf/:fileName', (req, res) => {
    try {
        const fileName = req.params.fileName;
        const pdfPath = path.join(pdfDirectory, fileName);

        fs.readFile(pdfPath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.contentType("application/pdf");
                res.send(data);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

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

router.get('/preview-cv-pdf', async (req, res) => {
    try {
        const {
            template,
            name,
            surname,
            phonenumber,
            site,
            position,
            about,
            referance,
            academi,
            experiences,
            skilss,
            langss
        } = req.query;

        // Null değerlerini kontrol etmek için güvenli bir şekilde toLowerCase() işlemi yapın
        const eposta = req.query.eposta !== undefined ? req.query.eposta.toLowerCase() : '';
        const address = req.query.address !== undefined ? req.query.address.toLowerCase() : '';
        const posta = req.query.posta !== undefined ? req.query.posta.toLowerCase() : '';
        const city = req.query.city !== undefined ? req.query.city.toLowerCase() : '';
        const birth = req.query.birth !== undefined ? req.query.birth.toLowerCase() : '';
        const asker = req.query.asker !== undefined ? req.query.asker.toLowerCase() : '';
        const surucu = req.query.surucu !== undefined ? req.query.surucu.toLowerCase() : '';
        const medeni = req.query.medeni !== undefined ? req.query.medeni.toLowerCase() : '';
        const gender = req.query.gender !== undefined ? req.query.gender.toLowerCase() : '';

        // Gelen verileri konsolda kontrol etmek için log ekle
        console.log("Received data:", req.query);

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');

        doc.font('Helvetica');
        if (template === 'template1') {
            applyTemplate1(doc, name, surname, eposta, phonenumber, address, null, site, position, about, skilss, langss, experiences, referance, academi, null, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template2') {
            applyTemplate2(doc, name, surname, eposta, phonenumber, address, null, site, position, about, skilss, langss, experiences, referance, academi, null, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template3') {
            applyTemplate3(doc, name, surname, eposta, phonenumber, address, null, site, position, about, skilss, langss, experiences, referance, academi, null, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template4') {
            applyTemplate4(doc, name, surname, eposta, phonenumber, address, null, site, position, about, skilss, langss, experiences, referance, academi, null, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template5') {
            applyTemplate5(doc, name, surname, eposta, phonenumber, address, null, site, position, about, skilss, langss, experiences, referance, academi, null, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template6') {
            applyTemplate6(doc, name, surname, eposta, phonenumber, address, null, site, position, about, skilss, langss, experiences, referance, academi, null, city, posta, birth, asker, surucu, medeni, gender);
        } else if (template === 'template7') {
            applyTemplate7(doc, name, surname, eposta, phonenumber, address, null, site, position, about, skilss, langss, experiences, referance, academi, null, city, posta, birth, asker, surucu, medeni, gender);
        } else {
            applyDefaultTemplate(doc, name, surname, eposta, phonenumber, address, null, site, position, about, skilss, langss, experiences, referance, academi, null, city, posta, birth, asker, surucu, medeni, gender);
        }

        doc.pipe(res);
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

function applyTemplate1(doc, name, surname,
    eposta,
    phonenumber,
    address,
    photoBuffer,
    site,
    position, about, skilles, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');
    const RobotoItalic = path.join(__dirname, '../font/Roboto/Roboto-Italic.ttf');

    const photoPath = path.join(__dirname, '../public/assets/bg.png');

    // Adı Soyadı
    const verticalOffset = 80;
    const fontSize = 25;
    const text = `${name} ${surname}`;
    const textWidth = doc.font(RobotoBold).widthOfString(text, { size: fontSize });
    doc.fillColor('#4b30c9').fontSize(fontSize).text(text, 50, verticalOffset, { align: 'left', width: 300 });
    doc.fillColor('black').font(RobotoBold).fontSize(20).text(position, 50, verticalOffset + 60, { align: 'left', width: 300 });
    doc.fillColor('black').font(Roboto).fontSize(9).text(date, 50, verticalOffset + 85, { align: 'left', width: 300 });
    doc.fillColor('black').font(RobotoLight).fontSize(10).text(about, 50, verticalOffset + 95, { align: 'left', width: 330 });

    // İletişim Bilgileri
    const contactInfoX = 400;
    const contactInfoY = 290;
    doc.x = contactInfoX;
    doc.y = contactInfoY;

    doc.font(RobotoBold).fontSize(14).fillColor('#4b30c9').text('İletişim Bilgileri', { align: 'left' });

    // E-posta
    doc.moveDown(0.8);
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + eposta.toLowerCase(), { align: 'left', width: 200 });
    // Telefon Numarası
    doc.moveDown(0.4);
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + phonenumber.toLowerCase(), { align: 'left', width: 200 });
    // Konum
    doc.moveDown(0.4);
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + `${address.toLowerCase()} / ${city.toLowerCase()} / ${posta.toLowerCase()}`, { align: 'left', width: 200 });
    // Website
    doc.moveDown(0.4);
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + site.toLowerCase(), { align: 'left', width: 200 });


    // Kişisel Bilgiler
    doc.font(RobotoBold).fontSize(14).fillColor('#4b30c9').text('Kişisel Bilgileri', 400, 390, { align: 'left', width: 100 });
    // Doğum Yeri
    doc.moveDown(0.4);
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + 'Doğum Yeri: ' + birth.toLowerCase(), { align: 'left', width: 200 });
    // Askerlik
    doc.moveDown(0.4);
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + 'Askerlik: ' + asker.toLowerCase(), { align: 'left', width: 200 });
    // Ehliyet
    doc.moveDown(0.4);
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + 'Ehliyet: ' + surucu.toLowerCase(), { align: 'left', width: 200 });
    // Ehliyet
    doc.moveDown(0.4);
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + 'Medeni Durum: ' + medeni.toLowerCase(), { align: 'left', width: 200 });
    // Cinsiyet 
    doc.moveDown(0.4);
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + 'Cinsiyet: ' + gender, { align: 'left', width: 200 });
    // Alt
    if (photoPath) {
        const photoWidth = 150;
        const photoHeight = 150;
        const photoY = 650
        doc.image(photoPath, 480, photoY, { width: photoWidth, height: photoHeight });
    }

    // Fotoğraf
    if (photoBuffer) {
        doc.image(photoBuffer, 400, 70, { width: 150, height: 150 });
    }

    // Yan çizgiler 
    const lineY = 300;
    const pointSize = 3;
    doc.lineCap('butt').lineWidth(1.5).moveTo(0, lineY).lineTo(80, lineY).stroke('#4b30c9');
    doc.circle(80, lineY, pointSize).fill('#4b30c9');


    // Dil Becerleri
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(14).fillColor('#4b30c9').text('Yabancı Dil', 400, 590, { align: 'left' });
    doc.moveDown(0.5);

    if (langs && Array.isArray(langs)) {
        langs.forEach((langg, index) => {
            if (langg && typeof langg === 'object' && langg.lang) {
                if (index !== 0) {
                    doc.moveDown(1);
                }
                const langText = `${langg.lang}`;
                const langLines = langText.split(',').map(line => line.trim());
                doc.font(RobotoBold)
                    .fontSize(10)
                    .fillColor('black')
                    .lineGap(6)
                    .text(`• ${langLines.join('\n• ')}`, { align: 'left', width: 200 });
            } else {
                console.error(`Invalid lang at index ${index}.`);
            }
        });
    } else {
        console.error('Languages are not defined or not an array.');
    }
    // Yetkinlikler
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(14).fillColor('#4b30c9').text('Yetkinlikler', 400, 490, { align: 'left', width: 100 });

    if (skilles && Array.isArray(skilles)) {
        skilles.forEach((skill, index) => {
            if (skill && typeof skill === 'object' && skill.skil) {
                if (index !== 0) {
                    doc.moveDown(1);
                }
                const skillText = `${skill.skil}`;
                const skillLines = skillText.split(',').map(line => line.trim());

                doc.font(RobotoBold)
                    .fontSize(10)
                    .fillColor('black')
                    .lineGap(5)
                    .text(`• ${skillLines.join('\n• ')}`, { align: 'left', width: 200 });
            } else {
                console.error(`Invalid skill at index ${index}.`);
            }
        });
    } else {
        console.error('Skills are not defined or not an array.');
    }

    const contactRefX = 35;
    const contactRefY = 290;
    doc.x = contactRefX;
    doc.y = contactRefY;

    const addSection = (title, content) => {
        const startX = 100;
        const startY = (doc.y !== undefined && doc.y !== null) ? doc.y : 30;

        doc.font(RobotoBold).fontSize(16).fillColor('#4b30c9').text(title, startX, startY, { align: 'left' });
        doc.moveDown(0.1);
        content();
    };

    const addExperiencesSection = () => {
        if (experiences && Array.isArray(experiences)) {
            experiences.forEach((experience, index) => {
                if (experience && typeof experience === 'object') {
                    if (index !== 0) {
                        doc.moveDown(0.1);
                    }
                    const jobTitles = Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle];
                    const employers = Array.isArray(experience.employer) ? experience.employer : [experience.employer];
                    const startDates = Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate];
                    const endDates = Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate];
                    const descriptions = Array.isArray(experience.description) ? experience.description : [experience.description];
                    jobTitles.forEach((title, i) => {
                        doc.font(RobotoBold).fontSize(11).fillColor('#4b30c9').text(`${title}`, { align: 'left', width: 200 });
                        doc.moveDown(0.1);
                        doc.font(RobotoBold).fontSize(9).fillColor('black').text(`${employers[i]}`, { align: 'left', width: 250 });
                        doc.moveDown(0.1);
                        doc.font(RobotoItalic).fontSize(9).fillColor('#000000').text(`${startDates[i]} - ${endDates[i]}`, { align: 'left', });
                        doc.moveDown(0.1);
                        doc.font(Roboto).fontSize(9).fillColor('black').text(`${descriptions[i]}`, { align: 'left', width: 250 });
                    });
                } else {
                    console.error(`Invalid experience at index ${index}.`);
                }
            });
        } else {
            console.error('Experiences are not defined or not an array.');
        }
    };

    const addReferencesSection = () => {
        if (referance && Array.isArray(referance)) {
            referance.forEach((ref, index) => {
                if (ref && typeof ref === 'object') {
                    if (index !== 0) {
                        doc.moveDown(0.1);
                    }
                    const jobTitle = Array.isArray(ref.jobTitle) ? ref.jobTitle.join(', ') : ref.jobTitle || "";
                    const city = Array.isArray(ref.city) ? ref.city.join(', ') : ref.city || "";
                    const employer = Array.isArray(ref.employer) ? ref.employer.join(', ') : ref.employer || "";

                    doc.font(RobotoBold).fontSize(9).fillColor('#4b30c9').text(jobTitle, { align: 'left' });
                    doc.moveDown(0.2);
                    doc.font(RobotoBold).fontSize(9).fillColor('black').text(employer, { align: 'left' });
                    doc.moveDown(0.2);
                    doc.font(Roboto).fontSize(9).fillColor('black').text(city, { align: 'left' });
                } else {
                    console.error(`Invalid reference at index ${index}.`);
                }
            });
        } else {
            console.error('References are not defined or not an array.');
        }
    };
    const addAcademi = () => {
        if (academi && Array.isArray(academi)) {
            academi.forEach((academis, index) => {
                if (academis && typeof academis === 'object') {
                    if (index !== 0) {
                        doc.moveDown(0.1);
                    }
                    const jobTitles = Array.isArray(academis.jobTitle) ? academis.jobTitle : [academis.jobTitle];
                    const employers = Array.isArray(academis.employer) ? academis.employer : [academis.employer];
                    const startDates = Array.isArray(academis.startDate) ? academis.startDate : [academis.startDate];
                    const endDates = Array.isArray(academis.endDate) ? academis.endDate : [academis.endDate];
                    const descriptions = Array.isArray(academis.description) ? academis.description : [academis.description];
                    jobTitles.forEach((title, i) => {
                        doc.font(RobotoBold).fontSize(11).fillColor('#4b30c9').text(`${title}`, { align: 'left', width: 200 });
                        doc.moveDown(0.1);
                        doc.font(RobotoBold).fontSize(9).fillColor('black').text(`${employers[i]}`, { align: 'left', width: 250 });
                        doc.moveDown(0.1);
                        doc.font(RobotoItalic).fontSize(9).fillColor('#000000').text(`${startDates[i]} - ${endDates[i]}`, { align: 'left', });
                        doc.moveDown(0.1);
                        doc.font(Roboto).fontSize(9).fillColor('black').text(`${descriptions[i]}`, { align: 'left', width: 250 });
                    });
                } else {
                    console.error(`Invalid experience at index ${index}.`);
                }
            });
        } else {
            console.error('Experiences are not defined or not an array.');
        }
    };

    addSection('İş Deneyimi', addExperiencesSection);
    addSection('Referanslar', addReferencesSection);
    addSection('Eğitim ve Nitelikler', addAcademi)

}
function applyTemplate2(doc, name, surname,
    eposta,
    phonenumber,
    address,
    photoBuffer,
    site,
    position, about, skilles, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');

    // Background Çizilen Kısmı
    doc.rect(0, 0, 200, 1920).fill('#bf5c46');
    doc.rect(0, 0, 1920, 50).fill('#bf5c46');
    doc.rect(35, 30, 500, 170).fill('#ffffff');


    // Adı-Soyadı
    const fontSize = 20;
    const text = `${name} ${surname}`;
    const textWidth = doc.font(RobotoBold).widthOfString(text, { size: fontSize });
    const centerX = (doc.page.width - textWidth) / 2;

    const verticalOffset = 50;
    const verticalOffsets = 85;

    doc.fillColor('black').fontSize(fontSize).text(text, centerX + 30, verticalOffset - 10, { align: 'left' });
    doc.fillColor('black').font(Roboto).fontSize(16).text(position, centerX + 30, verticalOffset + 35, { align: 'left', });
    doc.fillColor('black').font(RobotoLight).fontSize(10).text(about, centerX + 30, verticalOffset + 65, { align: 'left', });

    const lineY = verticalOffsets + 25;
    doc.lineWidth(1).moveTo(centerX, lineY).lineTo(centerX + 300, lineY).strokeColor('#EEEDEB').stroke();


    // İletişim Bilgiler
    const contactInfoX = 35;
    const contactInfoY = 230;
    doc.x = contactInfoX;
    doc.y = contactInfoY;

    doc.font(RobotoBold).fontSize(14).fillColor('white').text('İLETİŞİM BİLGİLERİ', { align: 'left' });
    // E-posta
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(9).fillColor('white').text(eposta, { align: 'left', width: 150 });
    doc.moveDown(0.5);
    // Telefon Numarası
    doc.font(RobotoBold).fontSize(9).fillColor('white').text(phonenumber, { align: 'left', width: 100 });
    doc.moveDown(0.5);
    // Konum
    doc.font(RobotoBold).fontSize(9).fillColor('white').text(`${address} / ${city} / ${posta}`, { align: 'left', width: 150 });
    doc.font(Roboto);
    doc.moveDown(0.5);
    // Website
    doc.font(RobotoBold).fontSize(9).fillColor('white').text(site, { align: 'left' });
    doc.font(Roboto);

    // Kişisel
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(14).fillColor('white').text('KİŞİSEL BİLGİLER', contactInfoX, contactInfoY + 120, { align: 'left' });

    doc.moveDown(0.4);
    doc.font(RobotoBold).fontSize(9).fillColor('white').text('• ' + 'Doğum Yeri: ' + birth.toLowerCase(), { align: 'left', width: 200 });
    // Askerlik
    doc.moveDown(0.4);
    doc.font(RobotoBold).fontSize(9).fillColor('white').text('• ' + 'Askerlik: ' + asker.toLowerCase(), { align: 'left', width: 200 });
    // Ehliyet
    doc.moveDown(0.4);
    doc.font(RobotoBold).fontSize(9).fillColor('white').text('• ' + 'Ehliyet: ' + surucu.toLowerCase(), { align: 'left', width: 200 });
    // Ehliyet
    doc.moveDown(0.4);
    doc.font(RobotoBold).fontSize(9).fillColor('white').text('• ' + 'Medeni Durum: ' + medeni.toLowerCase(), { align: 'left', width: 200 });
    // Cinsiyet 
    doc.moveDown(0.4);
    doc.font(RobotoBold).fontSize(9).fillColor('white').text('• ' + 'Cinsiyet: ' + gender, { align: 'left', width: 200 });

    // Cinsiyet 
    doc.moveDown(0.4);
    doc.font(RobotoBold).fontSize(9).fillColor('white').text('• ' + 'Doğum Günü: ' + date, { align: 'left', width: 200 });
    // Fotoğraf
    if (photoBuffer) {
        doc.image(photoBuffer, 60, 45, { width: 140, height: 140 });
    }

    const contactRefX = 35;
    const contactRefY = 230;
    doc.x = contactRefX;
    doc.y = contactRefY;

    const addSection = (title, content) => {
        const startX = 250;
        const startY = (doc.y !== undefined && doc.y !== null) ? doc.y : 30;

        doc.font(RobotoMedium).fontSize(14).fillColor('black').text(title, startX, startY, { align: 'left' });
        doc.moveDown(1);
        content();
        const endY = doc.y + 15;
        doc.y = Math.max(startY, endY);
    };

    const addExperiencesSection = () => {
        const transformExperiences = (experiences) => {
            return experiences.map((experience) => {
                return {
                    jobTitle: Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle],
                    employer: Array.isArray(experience.employer) ? experience.employer : [experience.employer],
                    startDate: Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate],
                    endDate: Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate],
                };
            });
        };

        const transformedExperiences = transformExperiences(experiences || []);
        transformedExperiences.forEach((experience, index) => {
            if (Array.isArray(experience.jobTitle) &&
                Array.isArray(experience.employer)) {

                if (index !== 0) {
                    doc.moveDown(0.2);
                }
                experience.jobTitle.forEach(title => {
                    // Metni sağa hizala
                    doc.font(RobotoBold).fontSize(10).fillColor('black').text(`${title}`, { align: 'right', width: 300 });
                });
                doc.moveUp(1);
                doc.font(RobotoBold).fontSize(10).fillColor('#bf5c46').text(`${experience.startDate.join(' - ')} - ${experience.endDate.join(' - ')}`, { align: 'left', width: 150 });
                doc.moveDown(0.6);
                experience.employer.forEach(emp => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${emp}`, { align: 'left', width: 300 });
                });
                doc.moveDown(1);

            } else {
                console.error(`Invalid experience at index ${index}. One or more fields are not arrays.`);
            }
        });
    };
    const addAcademiSection = () => {
        const transformExperiences = (academi) => {
            return academi.map((experience) => {
                return {
                    jobTitle: Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle],
                    employer: Array.isArray(experience.employer) ? experience.employer : [experience.employer],
                    startDate: Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate],
                    endDate: Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate],
                };
            });
        };

        const transformedExperiences = transformExperiences(academi || []);
        transformedExperiences.forEach((experience, index) => {
            if (Array.isArray(experience.jobTitle) &&
                Array.isArray(experience.employer)) {

                if (index !== 0) {
                    doc.moveDown(0.2);
                }
                experience.jobTitle.forEach(title => {
                    // Metni sağa hizala
                    doc.font(RobotoBold).fontSize(10).fillColor('black').text(`${title}`, { align: 'right', width: 200 });
                });
                doc.moveUp(1);
                doc.font(RobotoBold).fontSize(10).fillColor('#bf5c46').text(`${experience.startDate.join(' - ')} - ${experience.endDate.join(' - ')}`, { align: 'left', width: 200 });
                doc.moveDown(0.6);
                experience.employer.forEach(emp => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${emp}`, { align: 'right', width: 200 });
                });
                doc.moveDown(1);

            } else {
                console.error(`Invalid experience at index ${index}. One or more fields are not arrays.`);
            }
        });
    };
    const addReferencesSection = () => {
        const transformRefenerce = (referance) => {
            return referance.map((referance) => {
                return {
                    jobTitle: Array.isArray(referance.jobTitle) ? referance.jobTitle : [referance.jobTitle],
                    city: Array.isArray(referance.city) ? referance.city : [referance.city],
                    employer: Array.isArray(referance.employer) ? referance.employer : [referance.employer],
                };
            });
        };

        const transformedRefenerce = transformRefenerce(referance || []);
        transformedRefenerce.forEach((referance, index) => {
            if (referance && typeof referance === 'object') {
                if (index !== 0) {
                    doc.moveDown(1);
                }
                referance.jobTitle.forEach(title => {
                    doc.font(RobotoBold).fontSize(10).fillColor('black').text(` ${title}`, { align: 'left' });
                });
                doc.moveDown(0.5)
                referance.city.forEach(cty => {
                    doc.font(RobotoLight).fontSize(10).fillColor('black').text(`${cty}`, { align: 'left' });
                });
                doc.moveDown(0.5)
                referance.employer.forEach(emp => {
                    doc.font(RobotoBold).fontSize(10).fillColor('#bf5c46').text(`${emp}`, { align: 'left' });
                });
            } else {
                console.error(`Invalid experience at index ${index}.`);
            }
        });
    };
    addSection('İŞ DENEYİMİ', addExperiencesSection);
    addSection('AKADEMİK GEÇMİŞ', addAcademiSection);
    addSection('REFERANSLAR', addReferencesSection);

    // Yetenekler
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(14).fillColor('white').text('YETENEKLER', contactInfoX, contactInfoY + 240, { align: 'left' });
    doc.moveDown(0.5);

    const maxSkillsToShow = 5;

    if (skilles && Array.isArray(skilles)) {
        for (let index = 0; index < Math.min(skilles.length, maxSkillsToShow); index++) {
            const skill = skilles[index];
            if (skill && typeof skill === 'object' && skill.skil) {
                if (index !== 0) {
                    doc.moveDown(0.5);
                }
                const skillText = `${skill.skil}`;
                const skillLines = skillText.split(',').map(line => line.trim());

                doc.font(Roboto)
                    .fontSize(12)
                    .fillColor('white')
                    .lineGap(6)
                    .text(`- ${skillLines.join('\n- ')}`, { align: 'left' });
            } else {
                console.error(`Invalid skill at index ${index}.`);
            }
        }
    } else {
        console.error('Skills are not defined or not an array.');
    }

    // Dil Becerileri
    doc.moveDown(2);
    doc.font(RobotoBold).fontSize(14).fillColor('white').text('YABANCI DİL ', contactInfoX, contactInfoY + 370, { align: 'left' });

    const maxLanguagesToShow = 5;
    let displayedLanguages = 0;

    if (langs && Array.isArray(langs)) {
        langs.forEach((langg, index) => {
            if (displayedLanguages < maxLanguagesToShow && langg && typeof langg === 'object' && langg.lang) {
                if (displayedLanguages !== 0) {
                    doc.moveDown(1);
                }
                const langText = `${langg.lang}`;
                const langLines = langText.split(',').map(line => line.trim());
                doc.font(Roboto)
                    .fontSize(12)
                    .fillColor('white')
                    .lineGap(6)
                    .text(`- ${langLines.join('\n- ')}`, { align: 'left' });

                displayedLanguages++;
            } else {
                console.error(`Invalid lang at index ${index}.`);
            }
        });
    } else {
        console.error('Languages are not defined or not an array.');
    }



}
function applyTemplate3(doc, name, surname,
    eposta,
    phonenumber,
    address,
    photoBuffer,
    site,
    position, about, skilles, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');
    const RobotoItalic = path.join(__dirname, '../font/Roboto/Roboto-Italic.ttf');

    doc.rect(0, 0, 1920, 1000).fill('#fef9f9');
    doc.rect(-2, 0, 1920, 150).fill('#fce7f1');
    doc.rect(50, 0, 200, 1920).fill('#edeefc');

    if (photoBuffer) {
        doc.image(photoBuffer, 80, 45, { width: 140, height: 140 });
    }

    // Adı
    const fontSize = 25;
    const text = `${name.toUpperCase()} ${surname.toUpperCase()}`;
    const textWidth = doc.font(RobotoBold).widthOfString(text, { size: fontSize });
    const centerX = (doc.page.width - textWidth) / 2;

    const verticalOffset = 50;

    doc.fillColor('#3C3633').fontSize(fontSize).text(text, centerX + 80, verticalOffset, { align: 'left', });
    doc.fillColor('#3C3633').font(RobotoItalic).fontSize(16).text(position, centerX + 80, verticalOffset + 60, { align: 'left', });


    // Hakkımda
    const contactInfoX = 300;
    const contactInfoY = 160;
    doc.x = contactInfoX;
    doc.y = contactInfoY;

    doc.font(RobotoBold).fontSize(22).fillColor('#3C3633').text('Hakkımda'.toUpperCase(), { align: 'left' });
    doc.fillColor('black').font(RobotoLight).fontSize(10).text(about, 270, verticalOffset + 150, { align: 'left', width: 330 });


    const contactInfosX = 70;
    const contactInfosY = 270;
    doc.x = contactInfosX;
    doc.y = contactInfosY;

    doc.font(RobotoBold).fontSize(22).fillColor('#3C3633').text('İletişim', { align: 'left' });
    // E-posta
    doc.moveDown(0.5);
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text(eposta, { align: 'left', width: 180 });
    doc.moveDown(0.5);
    // Telefon Numarası
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text(phonenumber, { align: 'left', width: 180 });
    doc.moveDown(0.5);
    // Konum
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text(`${address} / ${city} / ${posta}`, { align: 'left', width: 180 });
    // Website
    doc.moveDown(0.5);
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text(site, { align: 'left' });



    // Kişisel
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(14).fillColor('#3C3633').text('Kişisel', contactInfosX, contactInfosY + 120, { align: 'left' });

    doc.moveDown(0.4);
    doc.font(RobotoLight).fontSize(9).fillColor('#3C3633').text('• ' + 'Doğum Yeri: ' + birth.toLowerCase(), { align: 'left', width: 200 });
    // Askerlik
    doc.moveDown(0.4);
    doc.font(RobotoLight).fontSize(9).fillColor('#3C3633').text('• ' + 'Askerlik: ' + asker.toLowerCase(), { align: 'left', width: 200 });
    // Ehliyet
    doc.moveDown(0.4);
    doc.font(RobotoLight).fontSize(9).fillColor('#3C3633').text('• ' + 'Ehliyet: ' + surucu.toLowerCase(), { align: 'left', width: 200 });
    // Ehliyet
    doc.moveDown(0.4);
    doc.font(RobotoLight).fontSize(9).fillColor('#3C3633').text('• ' + 'Medeni Durum: ' + medeni.toLowerCase(), { align: 'left', width: 200 });
    // Cinsiyet 
    doc.moveDown(0.4);
    doc.font(RobotoLight).fontSize(9).fillColor('#3C3633').text('• ' + 'Cinsiyet: ' + gender, { align: 'left', width: 200 });
    // Doğum Günü 
    doc.moveDown(0.4);
    doc.font(RobotoLight).fontSize(9).fillColor('#3C3633').text('• ' + 'Doğum Günü: ' + date, { align: 'left', width: 200 });


    // Yetenekler
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(14).fillColor('#3C3633').text('Yetenekler', contactInfosX, contactInfosY + 240, { align: 'left' });
    doc.moveDown(0.5);

    const maxSkillsToShow = 5;

    if (skilles && Array.isArray(skilles)) {
        for (let index = 0; index < Math.min(skilles.length, maxSkillsToShow); index++) {
            const skill = skilles[index];
            if (skill && typeof skill === 'object' && skill.skil) {
                if (index !== 0) {
                    doc.moveDown(0.5);
                }
                const skillText = `${skill.skil}`;
                const skillLines = skillText.split(',').map(line => line.trim());

                doc.font(Roboto)
                    .fontSize(12)
                    .fillColor('#3C3633')
                    .lineGap(6)
                    .text(`- ${skillLines.join('\n- ')}`, { align: 'left' });
            } else {
                console.error(`Invalid skill at index ${index}.`);
            }
        }
    } else {
        console.error('Skills are not defined or not an array.');
    }

    // Dil Becerileri
    doc.moveDown(2);
    doc.font(RobotoBold).fontSize(14).fillColor('#3C3633').text('Yabancı Dil ', contactInfosX, contactInfosY + 370, { align: 'left' });

    const maxLanguagesToShow = 5;
    let displayedLanguages = 0;

    if (langs && Array.isArray(langs)) {
        langs.forEach((langg, index) => {
            if (displayedLanguages < maxLanguagesToShow && langg && typeof langg === 'object' && langg.lang) {
                if (displayedLanguages !== 0) {
                    doc.moveDown(1);
                }
                const langText = `${langg.lang}`;
                const langLines = langText.split(',').map(line => line.trim());
                doc.font(Roboto)
                    .fontSize(12)
                    .fillColor('#3C3633')
                    .lineGap(6)
                    .text(`- ${langLines.join('\n- ')}`, { align: 'left' });

                displayedLanguages++;
            } else {
                console.error(`Invalid lang at index ${index}.`);
            }
        });
    } else {
        console.error('Languages are not defined or not an array.');
    }


    // Deneyimler, İş, Referans, Akademik
    const contactRefX = 120;
    const contactRefY = 320;
    doc.x = contactRefX;
    doc.y = contactRefY;

    const addSection = (title, content) => {
        const startX = 280;
        const startY = (doc.y !== undefined && doc.y !== null) ? doc.y : 30;

        doc.font(RobotoMedium).fontSize(14).fillColor('black').text(title, startX, startY, { align: 'left' });
        doc.moveDown(1);
        content();
        const endY = doc.y + 15;
        doc.y = Math.max(startY, endY);
    };

    const addExperiencesSection = () => {
        const transformExperiences = (experiences) => {
            return experiences.map((experience) => {
                return {
                    jobTitle: Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle],
                    employer: Array.isArray(experience.employer) ? experience.employer : [experience.employer],
                    startDate: Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate],
                    endDate: Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate],
                };
            });
        };

        const transformedExperiences = transformExperiences(experiences || []);
        transformedExperiences.forEach((experience, index) => {
            if (Array.isArray(experience.jobTitle) &&
                Array.isArray(experience.employer)) {

                if (index !== 0) {
                    doc.moveDown(0.2);
                }
                experience.jobTitle.forEach(title => {
                    // Metni sağa hizala
                    doc.font(RobotoBold).fontSize(10).fillColor('black').text(`${title}`, { align: 'right', width: 200 });
                });
                doc.moveUp(1);
                doc.font(RobotoBold).fontSize(10).fillColor('black').text(`${experience.startDate.join(' - ')} - ${experience.endDate.join(' - ')}`, { align: 'left', width: 90 });
                doc.moveDown(0.6);
                experience.employer.forEach(emp => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${emp}`, { align: 'left', width: 300 });
                });
                doc.moveDown(1);

            } else {
                console.error(`Invalid experience at index ${index}. One or more fields are not arrays.`);
            }
        });
    };

    const addAcademiSection = () => {
        const transformExperiences = (academi) => {
            return academi.map((academis) => {
                return {
                    jobTitle: Array.isArray(academis.jobTitle) ? academis.jobTitle : [academis.jobTitle],
                    employer: Array.isArray(academis.employer) ? academis.employer : [academis.employer],
                    startDate: Array.isArray(academis.startDate) ? academis.startDate : [academis.startDate],
                    endDate: Array.isArray(academis.endDate) ? academis.endDate : [academis.endDate],
                };
            });
        };

        const transformedExperiences = transformExperiences(academi || []);
        transformedExperiences.forEach((academis, index) => {
            if (Array.isArray(academis.jobTitle) &&
                Array.isArray(academis.employer)) {

                if (index !== 0) {
                    doc.moveDown(0.2);
                }
                academis.jobTitle.forEach(title => {
                    // Metni sağa hizala
                    doc.font(RobotoBold).fontSize(10).fillColor('black').text(`${title}`, { align: 'right', width: 200 });
                });
                doc.moveUp(1);
                doc.font(RobotoBold).fontSize(10).fillColor('#000000').text(`${academis.startDate.join(' - ')} - ${academis.endDate.join(' - ')}`, { align: 'left', width: 200 });
                doc.moveDown(0.6);
                academis.employer.forEach(emp => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${emp}`, { align: 'right', width: 200 });
                });
                doc.moveDown(1);

            } else {
                console.error(`Invalid experience at index ${index}. One or more fields are not arrays.`);
            }
        });
    };
    const addReferencesSection = () => {
        const transformRefenerce = (referance) => {
            return referance.map((referance) => {
                return {
                    jobTitle: Array.isArray(referance.jobTitle) ? referance.jobTitle : [referance.jobTitle],
                    city: Array.isArray(referance.city) ? referance.city : [referance.city],
                    employer: Array.isArray(referance.employer) ? referance.employer : [referance.employer],
                };
            });
        };

        const transformedRefenerce = transformRefenerce(referance || []);
        transformedRefenerce.forEach((referance, index) => {
            if (referance && typeof referance === 'object') {
                if (index !== 0) {
                    doc.moveDown(1);
                }
                referance.jobTitle.forEach(title => {
                    doc.font(RobotoBold).fontSize(10).fillColor('black').text(` ${title}`, { align: 'left' });
                });
                doc.moveDown(0.5)
                referance.city.forEach(cty => {
                    doc.font(RobotoLight).fontSize(10).fillColor('black').text(`${cty}`, { align: 'left' });
                });
                doc.moveDown(0.5)
                referance.employer.forEach(emp => {
                    doc.font(RobotoBold).fontSize(10).fillColor('#000000').text(`${emp}`, { align: 'left' });
                });
            } else {
                console.error(`Invalid experience at index ${index}.`);
            }
        });
    };


    addSection('İŞ DENEYİMİLERİ', addExperiencesSection);
    addSection('REFERANSLAR', addReferencesSection);
    addSection('EĞİTİM VE NİTELİKLER', addAcademiSection);




}
function applyTemplate4(doc, name, surname,
    eposta,
    phonenumber,
    address,
    photoBuffer,
    site,
    position, about, skilles, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');

    // Renkler
    doc.rect(50, 50, 200, 1920).fill('#EEEEEE');
    doc.rect(0, 770, 1920, 30).fill('#EEEEEE');

    // Fotoğraf
    if (photoBuffer) {
        doc.image(photoBuffer, 50, 10, { width: 200, height: 200 });
    }

    // Ad-soyad

    const fontSize = 24;
    const uppercaseName = name.toUpperCase();
    const uppercaseSurname = surname.toUpperCase();
    const text = `${uppercaseName} ${uppercaseSurname}`;
    const textWidth = doc.font(RobotoMedium).widthOfString(text, { size: fontSize });
    const centerX = (doc.page.width - textWidth) / 2;

    doc.rect(260, 135, 1920, 30).fill('#EEEEEE');
    const verticalOffset = 50;
    doc.fillColor('black').fontSize(fontSize).text(text, centerX + 75, verticalOffset, { align: 'left' });
    doc.fillColor('black').font(Roboto).fontSize(20).text(position, centerX + 80, verticalOffset + 90, { align: 'left', width: 250 });


    doc.fillColor("black").font(Roboto).fontSize(9).text('Doğum Yeri: ' + birth.toLowerCase(), centerX + 80, verticalOffset + 120, { align: 'left', width: 250 })
    doc.fillColor("black").font(Roboto).fontSize(9).text('Doğum Tarihi: ' + date.toLowerCase(), centerX + 80, verticalOffset + 130, { align: 'left', width: 250 })
    doc.fillColor("black").font(Roboto).fontSize(9).text('Ehliyet: ' + surucu.toLowerCase(), centerX + 80, verticalOffset + 140, { align: 'left', width: 250 })
    doc.fillColor("black").font(Roboto).fontSize(9).text('Askerlik: ' + asker.toLowerCase(), centerX + 80, verticalOffset + 150, { align: 'left', width: 250 })
    doc.fillColor("black").font(Roboto).fontSize(9).text('Medeni Durum: ' + medeni.toLowerCase(), centerX + 80, verticalOffset + 160, { align: 'left', width: 250 })
    doc.fillColor("black").font(Roboto).fontSize(9).text('Cinsiyet: ' + gender, centerX + 80, verticalOffset + 170, { align: 'left', width: 250 })

    // İletişim Bilgiler
    const contactInfoX = 75;
    const contactInfoY = 250;
    doc.x = contactInfoX;
    doc.y = contactInfoY;

    doc.font(Roboto).fontSize(20).fillColor('#000000').text('İLETİŞİM', { align: 'left' });

    const lineY = contactInfoY + 25;
    doc.lineWidth(1).moveTo(centerX - 15, lineY).lineTo(contactInfoX - 15, lineY).strokeColor('#000000').stroke();
    // E-posta
    doc.moveDown(0.3);
    doc.font(Roboto).fontSize(9).fillColor('#000000').text(eposta, { align: 'left', width: 180 });
    doc.moveDown(0.3);
    // Telefon Numarası
    doc.font(Roboto).fontSize(9).fillColor('#000000').text(phonenumber, { align: 'left', width: 180 });
    // Website
    doc.moveDown(0.3);
    doc.font(Roboto).fontSize(9).fillColor('#000000').text(site, { align: 'left', width: 180 });

    doc.moveDown(0.3);
    doc.font(Roboto).fontSize(9).fillColor('#000000').text(`${address.toLowerCase()} / ${city.toLowerCase()} / ${posta.toLowerCase()}`, { align: 'left', width: 150 });

    // Hakkında
    const contactInfoXX = 75;
    const contactInfoYY = 350;
    doc.x = contactInfoXX;
    doc.y = contactInfoYY;
    doc.font(Roboto).fontSize(20).fillColor('#000000').text('HAKKINDA', { align: 'left' });
    const linesY = contactInfoYY + 25;
    doc.lineWidth(1).moveTo(centerX - 15, linesY).lineTo(contactInfoXX - 15, linesY).strokeColor('#000000').stroke();
    doc.fillColor('black').font(RobotoLight).fontSize(8).text(about, contactInfoXX, contactInfoYY + 30, { align: 'left', width: 170 });

    // Yetenekler

    const contactInfoXXX = 75;
    const contactInfoYYY = 490;
    doc.x = contactInfoXXX;
    doc.y = contactInfoYYY;
    doc.moveDown(1);
    doc.font(Roboto).fontSize(20).fillColor('000000').text('BECERİLER', contactInfoXXX, contactInfoYYY, { align: 'left' });
    const lineYY = contactInfoYYY + 10;
    doc.lineWidth(1).moveTo(contactInfoXXX - 15, lineYY).lineTo(contactInfoXXX - 15, lineYY).strokeColor('#000000').stroke();
    doc.moveDown(0.5);

    const maxSkillsToShow = 5;

    if (skilles && Array.isArray(skilles)) {
        for (let index = 0; index < Math.min(skilles.length, maxSkillsToShow); index++) {
            const skill = skilles[index];
            if (skill && typeof skill === 'object' && skill.skil) {
                if (index !== 0) {
                    doc.moveDown(0.5);
                }
                const skillText = `${skill.skil}`;
                const skillLines = skillText.split(',').map(line => line.trim());

                doc.font(RobotoLight)
                    .fontSize(10)
                    .fillColor('#000000')
                    .lineGap(3)
                    .text(`- ${skillLines.join('\n- ')}`, { align: 'left' });
            } else {
                console.error(`Invalid skill at index ${index}.`);
            }
        }
    } else {
        console.error('Skills are not defined or not an array.');
    }

    doc.moveDown(2);
    doc.font(Roboto).fontSize(20).fillColor('#000000').text('YABANCI DİL ', contactInfoXXX, contactInfoYYY + 110, { align: 'left' });
    doc.lineWidth(1).moveTo(centerX - 15, lineYY + 90).lineTo(contactInfoXXX - 15, lineYY + 90).strokeColor('#000000').stroke();
    doc.moveDown(0.5);

    const maxLanguagesToShow = 5;
    let displayedLanguages = 0;

    if (langs && Array.isArray(langs)) {
        langs.forEach((langg, index) => {
            if (displayedLanguages < maxLanguagesToShow && langg && typeof langg === 'object' && langg.lang) {
                if (displayedLanguages !== 0) {
                    doc.moveDown(1);
                }
                const langText = `${langg.lang}`;
                const langLines = langText.split(',').map(line => line.trim());
                doc.font(RobotoLight)
                    .fontSize(10)
                    .fillColor('#000000')
                    .lineGap(3)
                    .text(`- ${langLines.join('\n- ')}`, { align: 'left' });

                displayedLanguages++;
            } else {
                console.error(`Invalid lang at index ${index}.`);
            }
        });
    } else {
        console.error('Languages are not defined or not an array.');
    }
    const contactRefX = 35;
    const contactRefY = 250;
    doc.x = contactRefX;
    doc.y = contactRefY;

    const addSection = (title, content) => {
        const startX = 280;
        const startY = (doc.y !== undefined && doc.y !== null) ? doc.y : 30;

        doc.font(Roboto).fontSize(20).fillColor('#000000').text(title.toUpperCase(), startX, startY, { align: 'left' });
        doc.moveDown(0.5);
        content();
        const endY = doc.y + 20;
        doc.y = Math.max(startY, endY);
    };

    const addExperiencesSection = () => {
        if (experiences && Array.isArray(experiences)) {
            experiences.forEach((experience, index) => {
                if (experience && typeof experience === 'object') {
                    if (index !== 0) {
                        doc.moveDown(0.5);
                    }
                    const jobTitles = Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle];
                    const employers = Array.isArray(experience.employer) ? experience.employer : [experience.employer];
                    const cities = Array.isArray(experience.city) ? experience.city : [experience.city];
                    const startDates = Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate];
                    const endDates = Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate];
                    const descriptions = Array.isArray(experience.description) ? experience.description : [experience.description];
                    jobTitles.forEach((title, i) => {
                        doc.font(RobotoBold).fontSize(9).fillColor('#000000').text(`${title}`, { align: 'left', width: 200 });
                        doc.moveDown(0.3);
                        doc.font(Roboto).fontSize(9).fillColor('#000000').text(`${employers[i]} - ${cities[i]} - ${startDates[i]} - ${endDates[i]}`, { align: 'left', });
                        doc.moveDown(0.3);
                        doc.font(Roboto).fontSize(9).fillColor('black').text(`${descriptions[i]}`, { align: 'left', width: 250 });
                    });
                } else {
                    console.error(`Invalid experience at index ${index}.`);
                }
            });
        } else {
            console.error('Experiences are not defined or not an array.');
        }
    };

    const addReferencesSection = () => {
        if (referance && Array.isArray(referance)) {
            referance.forEach((ref, index) => {
                if (ref && typeof ref === 'object') {
                    if (index !== 0) {
                        doc.moveDown(0.2);
                    }
                    const jobTitle = Array.isArray(ref.jobTitle) ? ref.jobTitle.join(', ') : ref.jobTitle || "";
                    const city = Array.isArray(ref.city) ? ref.city.join(', ') : ref.city || "";
                    const employer = Array.isArray(ref.employer) ? ref.employer.join(', ') : ref.employer || "";

                    doc.font(RobotoBold).fontSize(9).fillColor('#000000').text(jobTitle, { align: 'left' });
                    doc.moveDown(0.2);
                    doc.font(RobotoBold).fontSize(9).fillColor('black').text(employer, { align: 'left' });
                    doc.moveDown(0.2);
                    doc.font(Roboto).fontSize(9).fillColor('black').text(city, { align: 'left' });
                } else {
                    console.error(`Invalid reference at index ${index}.`);
                }
            });
        } else {
            console.error('References are not defined or not an array.');
        }
    };
    addSection('İş tecrübesi', addExperiencesSection);
    addSection('Referanslar', addReferencesSection);

}
function applyTemplate5(doc, name, surname,
    eposta,
    phonenumber,
    address,
    photoBuffer,
    site,
    position, about, skilles, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');
    const RobotoItalic = path.join(__dirname, '../font/Roboto/Roboto-Italic.ttf');

    doc.rect(0, 100, 230, 1920).fill('#EDEDED');


    // Adı
    const fontSize = 20;
    const text = `${name.toUpperCase()} ${surname.toUpperCase()}`;
    const textWidth = doc.font(RobotoBold).widthOfString(text, { size: fontSize });
    const centerX = (doc.page.width - textWidth) / 2;

    const verticalOffset = 50;

    doc.fillColor('#000000').fontSize(fontSize).text(text, centerX + 60, verticalOffset, { align: 'left', });
    doc.fillColor('#000000').font(RobotoBold).fontSize(14).text(position, centerX + 60, verticalOffset + 60, { align: 'left', });


    // Hakkımda
    const contactInfoX = 270;
    const contactInfoY = 160;
    doc.x = contactInfoX;
    doc.y = contactInfoY;

    doc.font(RobotoBold).fontSize(18).fillColor('#000000').text('Hakkımda'.toUpperCase(), { align: 'left' });
    doc.fillColor('black').font(RobotoLight).fontSize(10).text(about, 270, verticalOffset + 140, { align: 'left', width: 330 });


    const contactInfosX = 40;
    const contactInfosX2 = 200;
    const contactInfosY = 220;
    const lineY = contactInfosY + 20; // Metnin altına çizgi çekmek için bir y koordinatı belirleyin

    doc.x = contactInfosX;
    doc.y = contactInfosY;

    doc.font(RobotoBold).fontSize(13).fillColor('#000000').text('İLETİŞİM', { align: 'left' });
    doc.lineWidth(1).moveTo(contactInfosX, lineY).lineTo(contactInfosX + 190, lineY).strokeColor('#000000').stroke();
    // E-posta
    doc.moveDown(1);
    doc.font(Roboto).fontSize(9).fillColor('#3C3633').text(eposta, { align: 'left', width: 180 });
    doc.moveDown(0.7);
    // Telefon Numarası
    doc.font(Roboto).fontSize(9).fillColor('#3C3633').text(phonenumber, { align: 'left', width: 180 });
    doc.moveDown(0.7);
    // Konum
    doc.font(Roboto).fontSize(9).fillColor('#3C3633').text(`${address.toLowerCase()} / ${city.toLowerCase()} / ${posta.toLowerCase()}`, { align: 'left', width: 180 });
    // Website
    doc.moveDown(0.7);
    doc.font(Roboto).fontSize(9).fillColor('#3C3633').text(site, { align: 'left' });


     // Kişisel
     doc.font(RobotoBold).fontSize(13).fillColor('#000000').text('KİŞİSEL', 40, 570, { align: 'left' });
     doc.lineWidth(1).moveTo(contactInfosX, lineY).lineTo(contactInfosX + 190, lineY).strokeColor('#000000').stroke();
 
     // Doğum Yeri
     doc.moveDown(0.5);
     doc.font(Roboto).fontSize(9).fillColor('#000000').text('Doğum Yeri :'+ birth.toLowerCase(), { align: 'left', width: 180 });
 
     // Doğum Gunu
     doc.moveDown(0.5);
     doc.font(Roboto).fontSize(9).fillColor('#000000').text('Doğum Günü :'+ date, { align: 'left', width: 180 });
     // Ehliyet
     doc.moveDown(0.5);
     doc.font(Roboto).fontSize(9).fillColor('#000000').text('Ehliyet :'+surucu, { align: 'left', width: 180 });
     // Cinsiyet
     doc.moveDown(0.5);
     doc.font(Roboto).fontSize(9).fillColor('#000000').text('Cinsiyet :'+ gender, { align: 'left', width: 180 });
      // Medeni Durum
      doc.moveDown(0.5);
      doc.font(Roboto).fontSize(9).fillColor('#000000').text('Medeni Durum :'+ medeni, { align: 'left', width: 180 });
 
     // Askerlik
     doc.moveDown(0.5);
     doc.font(Roboto).fontSize(9).fillColor('#000000').text('Askerlik :'+ asker, { align: 'left', width: 180 });
    // Yetenekler
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(13).fillColor('#000000').text('YETENEKLER', 40, 340, { align: 'left' });
    doc.lineWidth(1).moveTo(contactInfosX, lineY + 115).lineTo(contactInfosX + 190, lineY + 118).strokeColor('#000000').stroke();

    doc.moveDown(0.5);

    const maxSkillsToShow = 5;

    if (skilles && Array.isArray(skilles)) {
        for (let index = 0; index < Math.min(skilles.length, maxSkillsToShow); index++) {
            const skill = skilles[index];
            if (skill && typeof skill === 'object' && skill.skil) {
                if (index !== 0) {
                    doc.moveDown(0.5);
                }
                const skillText = `${skill.skil}`;
                const skillLines = skillText.split(',').map(line => line.trim());

                doc.font(RobotoLight)
                    .fontSize(10)
                    .fillColor('#000000')
                    .lineGap(6)
                    .text(`• ${skillLines.join('\n• ')}`, { align: 'left' });
            } else {
                console.error(`Invalid skill at index ${index}.`);
            }
        }
    } else {
        console.error('Skills are not defined or not an array.');
    }
    // Dil Becerileri
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(13).fillColor('#000000').text('DİLLER ', 40, 470, { align: 'left' });
    doc.lineWidth(1).moveTo(contactInfosX, lineY + 246).lineTo(contactInfosX + 190, lineY + 246).strokeColor('#000000').stroke();
    const maxLanguagesToShow = 5;
    let displayedLanguages = 0;
    if (langs && Array.isArray(langs)) {
        langs.forEach((langg, index) => {
            if (displayedLanguages < maxLanguagesToShow && langg && typeof langg === 'object' && langg.lang) {
                if (displayedLanguages !== 0) {
                    doc.moveDown(1);
                }
                const langText = `${langg.lang}`;
                const langLines = langText.split(',').map(line => line.trim());
                doc.font(RobotoLight)
                    .fontSize(10)
                    .fillColor('#000000')
                    .lineGap(6)
                    .text(`• ${langLines.join('\n• ')}`, { align: 'left' });

                displayedLanguages++;
            } else {
                console.error(`Invalid lang at index ${index}.`);
            }
        });
    } else {
        console.error('Languages are not defined or not an array.');
    }

   

    const contactRefX = 200;
    const contactRefY = 300;
    doc.x = contactRefX;
    doc.y = contactRefY;


    doc.moveTo(275, 320) // Başlangıç noktası (x=100, y=100)
        .lineTo(500, 320) // Bitiş noktası (x=400, y=100)
        .stroke();
    doc.moveTo(270, 180) // Başlangıç noktası (x=100, y=100)
        .lineTo(500, 180) // Bitiş noktası (x=400, y=100)
        .stroke();
    const addSection = (title, content) => {
        const startX = 275;
        const startY = (doc.y !== undefined && doc.y !== null) ? doc.y : 30;

        doc.font(RobotoBold).fontSize(16).fillColor('#000000').text(title.toUpperCase(), startX, startY, { align: 'left' });
        doc.moveDown(0.5);
        content();
        const endY = doc.y + 20;
        doc.y = Math.max(startY, endY);
    };

    const addExperiencesSection = () => {
        if (experiences && Array.isArray(experiences)) {
            experiences.forEach((experience, index) => {
                if (experience && typeof experience === 'object') {
                    if (index !== 0) {
                        doc.moveDown(0.5);
                    }
                    const jobTitles = Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle];
                    const employers = Array.isArray(experience.employer) ? experience.employer : [experience.employer];
                    const cities = Array.isArray(experience.city) ? experience.city : [experience.city];
                    const startDates = Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate];
                    const endDates = Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate];
                    const descriptions = Array.isArray(experience.description) ? experience.description : [experience.description];
                    jobTitles.forEach((title, i) => {
                        doc.font(RobotoItalic).fontSize(9).fillColor('#000000').text(`${startDates[i]} - ${endDates[i]}`, { align: 'left', width: 80 });
                        doc.moveUp(0.8);
                        doc.font(RobotoBold).fontSize(9).fillColor('#000000').text(`${title}`, { align: 'right', width: 200 });
                        doc.moveDown(0.2);
                        doc.font(RobotoBold).fontSize(9).fillColor('black').text(`${employers[i]}/${cities[i]}`, { align: 'left', width: 250 });
                        doc.moveDown(0.2);
                        doc.font(Roboto).fontSize(9).fillColor('black').text(`${descriptions[i]}`, { align: 'left', width: 250 });
                    });
                } else {
                    console.error(`Invalid experience at index ${index}.`);
                }
            });
        } else {
            console.error('Experiences are not defined or not an array.');
        }
    };

    const addReferencesSection = () => {
        if (referance && Array.isArray(referance)) {
            referance.forEach((ref, index) => {
                if (ref && typeof ref === 'object') {
                    if (index !== 0) {
                        doc.moveDown(0.2);
                    }
                    const jobTitle = Array.isArray(ref.jobTitle) ? ref.jobTitle.join(', ') : ref.jobTitle || "";
                    const city = Array.isArray(ref.city) ? ref.city.join(', ') : ref.city || "";
                    const employer = Array.isArray(ref.employer) ? ref.employer.join(', ') : ref.employer || "";

                    doc.font(RobotoBold).fontSize(9).fillColor('#000000').text(jobTitle, { align: 'left' });
                    doc.moveDown(0.1);
                    doc.font(Roboto).fontSize(9).fillColor('black').text(city, { align: 'left' });
                    doc.moveDown(0.1);
                    doc.font(RobotoBold).fontSize(9).fillColor('black').text(employer, { align: 'left' });
                } else {
                    console.error(`Invalid reference at index ${index}.`);
                }
            });
        } else {
            console.error('References are not defined or not an array.');
        }
    };
    addSection('İş tecrübesi', addExperiencesSection);
    addSection('Referanslar', addReferencesSection);
    // Fotoğraf
    if (photoBuffer) {
        const circleX = 157 - 57;
        const circleY = 115 + 5;
        const circleRadius = 80;

        const imageX = circleX - circleRadius;
        const imageY = circleY - circleRadius;

        doc.circle(circleX, circleY, circleRadius).clip().image(photoBuffer, imageX, imageY, { width: 160, height: 160 });
        doc.circle(circleX, circleY, circleRadius).lineWidth(10).fillOpacity(0).strokeColor('#ffffff').stroke();
    }


}
function applyTemplate6(doc, name, surname,
    eposta,
    phonenumber,
    address,
    photoBuffer,
    site,
    position, about, skilles, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');
    const RobotoThin = path.join(__dirname, '../font/Roboto/Roboto-Thin.ttf');


    const Whatsapp = path.join(__dirname, '../public/assets/icon/whatsapp.png');
    const Email = path.join(__dirname, '../public/assets/icon/mail.png');

    if (Whatsapp) {
        const photoWidth = 10;
        const photoHeight = 10;
        const photoY = 120
        doc.image(Whatsapp, 430, photoY, { width: photoWidth, height: photoHeight });
    }
    if (Email) {
        const photoWidth = 10;
        const photoHeight = 10;
        const photoY = 120
        doc.image(Email, 200, photoY, { width: photoWidth, height: photoHeight });
    }

    const contactInfoXX = 215;
    const contactInfoYY = 120;
    doc.x = contactInfoXX;
    doc.y = contactInfoYY;
    doc.font(Roboto).fontSize(9).fillColor('black').text(eposta.toLowerCase(), { align: 'left', width: 200 });

    const contactInfoXXX = 445;
    const contactInfoYYY = 120;
    doc.x = contactInfoXXX;
    doc.y = contactInfoYYY;
    doc.font(Roboto).fontSize(9).fillColor('black').text(phonenumber.toLowerCase(), { align: 'left', width: 200 });
    // Adı
    const fontSize = 20;
    const text = `${name.toUpperCase()} ${surname.toUpperCase()}`;
    const pos = `${position.toUpperCase()}`
    const textWidth = doc.font(RobotoBold).widthOfString(text, { size: fontSize });
    const centerX = (doc.page.width - textWidth) / 2;

    const verticalOffset = 50;

    doc.fillColor('#000000').fontSize(fontSize).text(text, centerX - 20, verticalOffset, { align: 'left', });
    doc.fillColor('#000000').font(RobotoMedium).fontSize(14).text(pos, centerX - 20, verticalOffset + 45, { align: 'left', });


    const contactRefX = 200;
    const contactRefY = 360;
    doc.x = contactRefX;
    doc.y = contactRefY;

    const addSection = (title, content) => {
        const startX = 270;
        const startY = (doc.y !== undefined && doc.y !== null) ? doc.y : 30;

        doc.font(RobotoBold).fontSize(16).fillColor('#000000').text(title.toUpperCase(), startX, startY, { align: 'left' });
        doc.moveDown(0.5);
        content();
        const endY = doc.y + 20;
        doc.y = Math.max(startY, endY);
    };

    const addExperiencesSection = () => {
        if (experiences && Array.isArray(experiences)) {
            experiences.forEach((experience, index) => {
                if (experience && typeof experience === 'object') {
                    if (index !== 0) {
                        doc.moveDown(0.5);
                    }
                    const jobTitles = Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle];
                    const employers = Array.isArray(experience.employer) ? experience.employer : [experience.employer];
                    const cities = Array.isArray(experience.city) ? experience.city : [experience.city];
                    const startDates = Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate];
                    const endDates = Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate];
                    const descriptions = Array.isArray(experience.description) ? experience.description : [experience.description];
                    jobTitles.forEach((title, i) => {
                        doc.font(RobotoBold).fontSize(11).fillColor('#000000').text(`${title}`, { align: 'left', width: 200 });
                        doc.moveDown(0.3);
                        doc.font(RobotoThin).fontSize(9).fillColor('#000000').text(`${employers[i]} - ${cities[i]} - ${startDates[i]} - ${endDates[i]}`, { align: 'left', });
                        doc.moveDown(0.3);
                        doc.font(Roboto)
                            .fontSize(9)
                            .fillColor('black')
                            .text(`• ${descriptions[i]}`, { align: 'left', width: 250 });
                        doc.moveDown(1);

                    });
                } else {
                    console.error(`Invalid experience at index ${index}.`);
                }
            });
        } else {
            console.error('Experiences are not defined or not an array.');
        }
    };

    const addReferencesSection = () => {
        if (referance && Array.isArray(referance)) {
            referance.forEach((ref, index) => {
                if (ref && typeof ref === 'object') {
                    if (index !== 0) {
                        doc.moveDown(0.2);
                    }
                    const jobTitle = Array.isArray(ref.jobTitle) ? ref.jobTitle.join(', ') : ref.jobTitle || "";
                    const city = Array.isArray(ref.city) ? ref.city.join(', ') : ref.city || "";
                    const employer = Array.isArray(ref.employer) ? ref.employer.join(', ') : ref.employer || "";

                    doc.font(RobotoBold).fontSize(9).fillColor('black').text(jobTitle, { align: 'left' });
                    doc.moveDown(0.2);
                    doc.font(RobotoThin).fontSize(9).fillColor('black').text(city, { align: 'left' });
                    doc.moveDown(0.2);
                    doc.font(RobotoMedium).fontSize(9).fillColor('black').text(employer, { align: 'left' });

                    doc.moveDown(1);
                } else {
                    console.error(`Invalid reference at index ${index}.`);
                }
            });
        } else {
            console.error('References are not defined or not an array.');
        }
    };

    addSection('İş tecrübesi', addExperiencesSection);
    addSection('Referanslar', addReferencesSection);

    // Çizgiler
    const contactInfossX = 40;
    const contactInfossX2 = 240;
    const contactInfossX3 = 260;
    const contactInfossY = 150;
    const lineYY = contactInfossY + 20;
    doc.x = contactInfossX;
    doc.y = contactInfossY;
    // Üst Çizgi
    doc.lineWidth(1).moveTo(contactInfossX, lineYY).lineTo(contactInfossX + 530, lineYY).strokeColor('#C7C8CC').stroke();

    // Ortadaki Çizgi
    doc.x = contactInfossX2;
    doc.lineWidth(1).moveTo(contactInfossX2, lineYY).lineTo(contactInfossX2, lineYY + 600).strokeColor('#C7C8CC').stroke();

    // Hakkımızdaki Çizgi
    doc.x = contactInfossX3;
    doc.lineWidth(0.5).moveTo(contactInfossX3, lineYY + 160).lineTo(contactInfossX3 + 300, lineYY + 160).strokeColor('#C7C8CC').stroke();
    // İş Geçmişi

    // Hakkımda
    const contactInfoX = 270;
    const contactInfoY = 200;
    doc.x = contactInfoX;
    doc.y = contactInfoY;

    doc.font(RobotoBold).fontSize(16).fillColor('#000000').text('Hakkımda'.toUpperCase(), { align: 'left' });
    doc.fillColor('black').font(RobotoLight).fontSize(10).text(about, 270, verticalOffset + 180, { align: 'left', width: 300 });


    const contactInfosX = 40;
    const contactInfosY = 190;
    const lineY = contactInfosY + 20; // Metnin altına çizgi çekmek için bir y koordinatı belirleyin

    doc.x = contactInfosX;
    doc.y = contactInfosY;

    doc.font(RobotoBold).fontSize(13).fillColor('#000000').text('Profil'.toUpperCase(), { align: 'left' });
    doc.moveDown(0.5);

    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text(site, { align: 'left', width: 180 });
    doc.moveDown(0.5);
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text(`${address.toLowerCase()}/ ${city.toLowerCase()} / ${posta.toLowerCase()}`, { align: 'left', width: 180 });
    doc.moveDown(0.5);
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text(date, { align: 'left', width: 180 });
    doc.moveDown(0.5);
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text(gender, { align: 'left', width: 180 });
    doc.moveDown(0.5);
    doc.lineWidth(0.4).moveTo(contactInfosX, lineY + 100).lineTo(contactInfosX + 180, lineY + 100).strokeColor('#C7C8CC').stroke();
    doc.lineWidth(0.4).moveTo(contactInfosX, lineY + 250).lineTo(contactInfosX + 180, lineY + 250).strokeColor('#C7C8CC').stroke();
    doc.lineWidth(0.4).moveTo(contactInfosX, lineY + 390).lineTo(contactInfosX + 180, lineY + 390).strokeColor('#C7C8CC').stroke();

    // Yetenekler
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(13).fillColor('#000000').text('YETENEKLER', 45, 320, { align: 'left' });
    doc.moveDown(0.5);
    // Kişisel
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(13).fillColor('#000000').text('KİŞİSEL', 45, 610, { align: 'left' });
    doc.moveDown(0.5);

    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text('Doğum yeri: '+ birth.toLowerCase(),{ align: 'left', width: 180 });
    doc.moveDown(0.5);
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text('Cinsiyet: '+ gender.toLowerCase(), { align: 'left', width: 180 });
    doc.moveDown(0.5);
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text('Ehliyet: '+ surucu.toLowerCase(), { align: 'left', width: 180 });
    doc.moveDown(0.5);
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text('Medeni Durumu: '+medeni.toLowerCase(), { align: 'left', width: 180 });
    doc.moveDown(0.5);
    doc.font(RobotoLight).fontSize(10).fillColor('#3C3633').text('Askerlik: '+ asker.toLowerCase(), { align: 'left', width: 180 });
    doc.moveDown(0.5);
    const maxSkillsToShow = 5;

    if (skilles && Array.isArray(skilles)) {
        for (let index = 0; index < Math.min(skilles.length, maxSkillsToShow); index++) {
            const skill = skilles[index];
            if (skill && typeof skill === 'object' && skill.skil) {
                if (index !== 0) {
                    doc.moveDown(0.5);
                }
                const skillText = `${skill.skil}`;
                const skillLines = skillText.split(',').map(line => line.trim());

                doc.font(RobotoLight)
                    .fontSize(10)
                    .fillColor('#000000')
                    .lineGap(6)
                    .text(`• ${skillLines.join('\n• ')}`, { align: 'left' });
            } else {
                console.error(`Invalid skill at index ${index}.`);
            }
        }
    } else {
        console.error('Skills are not defined or not an array.');
    }

    // Dil Becerileri
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(13).fillColor('#000000').text('DİLLER ', 45, 470, { align: 'left' });
    const maxLanguagesToShow = 5;
    let displayedLanguages = 0;
    if (langs && Array.isArray(langs)) {
        langs.forEach((langg, index) => {
            if (displayedLanguages < maxLanguagesToShow && langg && typeof langg === 'object' && langg.lang) {
                if (displayedLanguages !== 0) {
                    doc.moveDown(1);
                }
                const langText = `${langg.lang}`;
                const langLines = langText.split(',').map(line => line.trim());
                doc.font(RobotoLight)
                    .fontSize(10)
                    .fillColor('#000000')
                    .lineGap(6)
                    .text(`• ${langLines.join('\n• ')}`, { align: 'left' });

                displayedLanguages++;
            } else {
                console.error(`Invalid lang at index ${index}.`);
            }
        });
    } else {
        console.error('Languages are not defined or not an array.');
    }
    // Fotoğraf
    if (photoBuffer) {
        const circleX = 157 - 50;
        const circleY = 115 - 20;
        const circleRadius = 50;
        const imageX = circleX - circleRadius;
        const imageY = circleY - circleRadius;
        doc.circle(circleX, circleY, circleRadius).clip().image(photoBuffer, imageX, imageY, { width: 110, height: 110 });
    }

}
function applyTemplate7(doc, name, surname,
    eposta,
    phonenumber,
    address,
    photoBuffer,
    site,
    position, about, skilles, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');

    const Whatsapp = path.join(__dirname, '../public/assets/icon/whatsapp.png');
    const Email = path.join(__dirname, '../public/assets/icon/mail.png');
    const Konum = path.join(__dirname, '../public/assets/icon/location.png');

    if (Whatsapp) {
        const photoWidth = 10;
        const photoHeight = 10;
        const photoY = 296;
        doc.image(Whatsapp, 35, photoY, { width: photoWidth, height: photoHeight });
    }
    if (Email) {
        const photoWidth = 10;
        const photoHeight = 10;
        const photoY = 280;
        doc.image(Email, 35, photoY, { width: photoWidth, height: photoHeight });
    }
    if (Konum) {
        const photoWidth = 10;
        const photoHeight = 10;
        const photoY = 313;
        doc.image(Konum, 35, photoY, { width: photoWidth, height: photoHeight });
    }



    // Color
    const gradient = doc.linearGradient(0, 0, 1920, 0);
    gradient.stop(0, '#F18C31');
    gradient.stop(1, '#F2A90F');

    doc.rect(580, 0, 100, 1920).fill(gradient);

    // Ad Soyad

    const fontSize = 19;
    const text = `${name} ${surname}`;
    const textWidth = doc.font(RobotoBold).widthOfString(text, { size: fontSize });
    const centerX = (doc.page.width - textWidth) / 2;
    const verticalOffset = 50;
    doc.fillColor('black').fontSize(fontSize).text(text, centerX - 150, verticalOffset, { align: 'left',width:330 });
    doc.fillColor('black').font(Roboto).fontSize(16).text(position, centerX - 150, verticalOffset + 45, { align: 'left', });
    doc.fillColor('black').font(Roboto).fontSize(9).text('Doğum Günü: '+ date, centerX - 150, verticalOffset + 65, { align: 'left', });
    doc.fillColor('black').font(Roboto).fontSize(9).text('Doğum Yeri: '+ birth, centerX - 150, verticalOffset + 75, { align: 'left', });
    doc.fillColor('black').font(Roboto).fontSize(9).text('Askerlik: '+ asker, centerX - 150, verticalOffset + 85, { align: 'left', });
    doc.fillColor('black').font(Roboto).fontSize(9).text('Ehliyet: '+ surucu, centerX - 150, verticalOffset + 95, { align: 'left', });
    doc.fillColor('black').font(Roboto).fontSize(9).text('Medeni Durum: '+ medeni, centerX - 150, verticalOffset + 105, { align: 'left', });
    doc.fillColor('black').font(Roboto).fontSize(9).text('Cinsiyet: '+ gender, centerX - 150, verticalOffset + 115, { align: 'left', });



    // Fotoğraf
    doc.image(photoBuffer, 350, 50, { width: 180, height: 180 }); // Resmi ekleyin


    // İletişim Bilgiler
    const contactInfoX = 50;
    const contactInfoY = 250;
    doc.x = contactInfoX;
    doc.y = contactInfoY;
    const boxWidth = 230;
    const boxHeight = 530;
    const cornerRadius = 20;
    const borderWidth = 0.8;

    doc.roundedRect(contactInfoX - 20, contactInfoY - 30, boxWidth, boxHeight, cornerRadius)
        .lineWidth(borderWidth) // Kenarlık kalınlığını ayarlayın
        .strokeColor('#000000') // Kenarlık rengini ayarlayın
        .stroke(); // Kenarlık çiz

    doc.font(RobotoBold).fontSize(16).fillColor('#000000').text('İLETİŞİM', { align: 'left', width: 180 });
    // E-posta
    doc.moveDown(0.5);
    doc.font(Roboto).fontSize(10).fillColor('#000000').text(eposta, { align: 'left', width: 180 });
    doc.moveDown(0.5);
    // Telefon Numarası
    doc.font(Roboto).fontSize(10).fillColor('#000000').text(phonenumber, { align: 'left', width: 180 });
    // Website
    doc.moveDown(0.5);
    doc.font(Roboto).fontSize(10).fillColor('#000000').text(`${address.toLowerCase()} / ${city.toLowerCase()} / ${posta.toLowerCase()}`, { align: 'left', width: 180 });
    doc.font(Roboto);

    // Hakkında
    const contactInfoXX = 50;
    const contactInfoYY = 340;
    doc.x = contactInfoXX;
    doc.y = contactInfoYY;
    doc.font(RobotoBold).fontSize(16).fillColor('#000000').text('HAKKINDA', { align: 'left' });
    doc.fillColor('black').font(RobotoLight).fontSize(10).text(about, contactInfoXX, contactInfoYY + 25, { align: 'left', width: 210 });

    // Yetenekler
    const contactInfoXXX = 50;
    const contactInfoYYY = 510;
    doc.x = contactInfoXXX;
    doc.y = contactInfoYYY;
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(16).fillColor('000000').text('BECERİLER', contactInfoXXX, contactInfoYYY, { align: 'left' });
    doc.moveDown(0.5);

    const maxSkillsToShow = 5;
    if (skilles && Array.isArray(skilles)) {
        for (let index = 0; index < Math.min(skilles.length, maxSkillsToShow); index++) {
            const skill = skilles[index];
            if (skill && typeof skill === 'object' && skill.skil) {
                if (index !== 0) {
                    doc.moveDown(0.5);
                }
                const skillText = `${skill.skil}`;
                const skillLines = skillText.split(',').map(line => line.trim());

                doc.font(RobotoLight)
                    .fontSize(10)
                    .fillColor('#000000')
                    .lineGap(3)
                    .text(`- ${skillLines.join('\n- ')}`, { align: 'left' });
            } else {
                console.error(`Invalid skill at index ${index}.`);
            }
        }
    } else {
        console.error('Skills are not defined or not an array.');
    }

    doc.moveDown(2);
    doc.font(RobotoBold).fontSize(16).fillColor('#000000').text('YABANCI DİL ', contactInfoXXX, contactInfoYYY + 110, { align: 'left' });
    const maxLanguagesToShow = 5;
    let displayedLanguages = 0;

    if (langs && Array.isArray(langs)) {
        langs.forEach((langg, index) => {
            if (displayedLanguages < maxLanguagesToShow && langg && typeof langg === 'object' && langg.lang) {
                if (displayedLanguages !== 0) {
                    doc.moveDown(1);
                }
                const langText = `${langg.lang}`;
                const langLines = langText.split(',').map(line => line.trim());
                doc.font(RobotoLight)
                    .fontSize(10)
                    .fillColor('#000000')
                    .lineGap(3)
                    .text(`- ${langLines.join('\n- ')}`, { align: 'left' });

                displayedLanguages++;
            } else {
                console.error(`Invalid lang at index ${index}.`);
            }
        });
    } else {
        console.error('Languages are not defined or not an array.');
    }

    // İş deneyim ile Referanslar


    const contactRefX = 35;
    const contactRefY = 250;
    doc.x = contactRefX;
    doc.y = contactRefY;

    const addSection = (title, content) => {
        const startX = 300;
        const startY = (doc.y !== undefined && doc.y !== null) ? doc.y : 30;

        doc.font(RobotoBold).fontSize(16).fillColor('black').text(title, startX, startY, { align: 'left' });
        doc.moveDown(1);
        content();
        const endY = doc.y + 15;
        doc.y = Math.max(startY, endY);
    };

    const addExperiencesSection = () => {
        const transformExperiences = (experiences) => {
            return experiences.map((experience) => {
                return {
                    jobTitle: Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle],
                    employer: Array.isArray(experience.employer) ? experience.employer : [experience.employer],
                    startDate: Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate],
                    endDate: Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate],
                };
            });
        };

        const transformedExperiences = transformExperiences(experiences || []);
        transformedExperiences.forEach((experience, index) => {
            if (Array.isArray(experience.jobTitle) &&
                Array.isArray(experience.employer)) {

                if (index !== 0) {
                    doc.moveDown(0.2);
                }

                experience.jobTitle.forEach(title => {
                    doc.font(RobotoBold).fontSize(10).fillColor('black').text(`${title}`, { align: 'left', width: 200 });
                });
                doc.moveUp(0.8);
                doc.font(RobotoBold).fontSize(10).fillColor('black').text(`${experience.startDate.join(' - ')} - ${experience.endDate.join(' - ')}`, { align: 'right', width: 200 });
                doc.moveDown(0.6);
                experience.employer.forEach(emp => {
                    doc.font(RobotoLight).fontSize(10).fillColor('black').text(`${emp}`, { align: 'left' });
                });
                doc.moveDown(0.9);

            } else {
                console.error(`Invalid experience at index ${index}. One or more fields are not arrays.`);
            }
        });
    };

    const addReferencesSection = () => {
        const transformRefenerce = (referance) => {
            return referance.map((referance) => {
                return {
                    jobTitle: Array.isArray(referance.jobTitle) ? referance.jobTitle : [referance.jobTitle],
                    city: Array.isArray(referance.city) ? referance.city : [referance.city],
                    employer: Array.isArray(referance.employer) ? referance.employer : [referance.employer],
                };
            });
        };

        const transformedRefenerce = transformRefenerce(referance || []);
        transformedRefenerce.forEach((referance, index) => {
            if (referance && typeof referance === 'object') {
                if (index !== 0) {
                    doc.moveDown(0.5);
                }
                referance.jobTitle.forEach(title => {
                    doc.font(RobotoBold).fontSize(10).fillColor('black').text(` ${title}`, { align: 'left' });
                });
                doc.moveDown(0.1)
                referance.city.forEach(cty => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${cty}`, { align: 'left' });
                });
                doc.moveDown(0.1)
                referance.employer.forEach(emp => {
                    doc.font(RobotoLight).fontSize(10).fillColor('#black').text(`${emp}`, { align: 'left' });
                });

            } else {
                console.error(`Invalid experience at index ${index}.`);
            }
        });
    };

    const addAcademi = () => {
        const transformExperiences = (academi) => {
            return academi.map((experience) => {
                return {
                    jobTitle: Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle],
                    employer: Array.isArray(experience.employer) ? experience.employer : [experience.employer],
                    startDate: Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate],
                    endDate: Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate],
                };
            });
        };

        const transformedExperiences = transformExperiences(academi || []);
        transformedExperiences.forEach((experience, index) => {
            if (Array.isArray(experience.jobTitle) &&
                Array.isArray(experience.employer)) {

                if (index !== 0) {
                    doc.moveDown(0.2);
                }

                experience.jobTitle.forEach(title => {
                    doc.font(RobotoBold).fontSize(10).fillColor('black').text(`${title}`, { align: 'left', width: 200 });
                });
                doc.moveUp(0.8);
                doc.font(RobotoBold).fontSize(10).fillColor('black').text(`${experience.startDate.join(' - ')} - ${experience.endDate.join(' - ')}`, { align: 'right', width: 200 });
                doc.moveDown(0.6);
                experience.employer.forEach(emp => {
                    doc.font(RobotoLight).fontSize(10).fillColor('black').text(`${emp}`, { align: 'left' });
                });
                doc.moveDown(0.9);

            } else {
                console.error(`Invalid experience at index ${index}. One or more fields are not arrays.`);
            }
        });
    };

    addSection('İŞ DENEYİMİ', addExperiencesSection);
    addSection('REFERANSLAR', addReferencesSection);
    addSection('EĞİTİM VE NİTELİKLER', addAcademi);

}
function applyDefaultTemplate(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs, referance, academi) {
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('lightgray');
    doc.fontSize(20).text('Default Template - Curriculum Vitae', { align: 'center', fillColor: 'blue' });
    doc.fillColor('black');
    doc.fontSize(14).text(`${name} ${surname}`, { fillColor: 'green' });
    doc.fontSize(14).text(`${eposta}`, { fillColor: 'red' });
    doc.fontSize(14).text(`${phonenumber}`, { fillColor: 'purple' });
    doc.fontSize(14).text(`${address}`, { fillColor: 'orange' });
    if (photoBuffer) {
        doc.image(photoBuffer, 100, 100, { width: 100, height: 100 });
    }
}

module.exports = router;

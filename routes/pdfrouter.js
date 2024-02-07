const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const path = require('path');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
        } = req.body;

        const photoBuffer = req.file ? req.file.buffer : null;

        const experiences = req.body.experiences;

        const skilss = req.body.skilles;

        const langss = req.body.langs;

        const referance = req.body.referance;

        const randomString = Math.random().toString(36).substring(2, 8);
        const fileName = `mobilecv-${randomString}.pdf`;
        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        doc.pipe(res);

        doc.font('Helvetica');
        if (template === 'template1') {
            applyTemplate1(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance);
        } else if (template === 'template2') {
            applyTemplate2(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance);
        } else if (template === 'template3') {
            applyTemplate3(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance);
        } else if (template === 'template4') {
            applyTemplate4(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance);
        } else if (template === 'template5') {
            applyTemplate5(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance);
        } else if (template === 'template6') {
            applyTemplate6(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance);
        } else if (template === 'template7') {
            applyTemplate7(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance);
        }
        else {
            applyDefaultTemplate(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss, experiences, referance);
        }

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

function applyTemplate1(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs, experiences, referance) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');
    const RobotoThin = path.join(__dirname, '../font/Roboto/Roboto-Thin.ttf');

    // Adı Soyadı
    const verticalOffset = 80;
    const fontSize = 25;
    const text = `${name} ${surname}`;
    const textWidth = doc.font(RobotoBold).widthOfString(text, { size: fontSize });
    doc.fillColor('#4b30c9').fontSize(fontSize).text(text, 50, verticalOffset, { align: 'left', width: 300 });
    doc.fillColor('black').font(RobotoBold).fontSize(20).text(position, 50, verticalOffset + 60, { align: 'left', width: 300 });
    doc.fillColor('black').font(RobotoLight).fontSize(10).text(about, 50, verticalOffset + 90, { align: 'left', width: 330 });

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
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + address.toLowerCase(), { align: 'left', width: 200 });
    // Website
    doc.moveDown(0.4);
    doc.font(Roboto).fontSize(9).fillColor('black').text('• ' + site.toLowerCase(), { align: 'left', width: 200 });



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
    doc.font(RobotoBold).fontSize(14).fillColor('#4b30c9').text('Yabancı Dil', 400, 520, { align: 'left' });
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
    doc.font(RobotoBold).fontSize(14).fillColor('#4b30c9').text('Yetkinlikler', 400, 400, { align: 'left', width: 100 });

    if (skilles && Array.isArray(skilles)) {
        skilles.forEach((skill, index) => {
            if (skill && typeof skill === 'object' && skill.skil) {
                if (index !== 0) {
                    doc.moveDown(1);
                }
                const skillText = `${skill.skil}`;
                const skillLines = skillText.split(',').map(line => line.trim());

                doc.font(Roboto)
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

    // Yetkinlikler 
    doc.moveDown(1);

    const contactRefX = 35;
    const contactRefY = 290;
    doc.x = contactRefX;
    doc.y = contactRefY;

    const addSection = (title, content) => {
        const startX = 100;
        const startY = (doc.y !== undefined && doc.y !== null) ? doc.y : 30;

        doc.font(RobotoMedium).fontSize(14).fillColor('black').text(title, startX, startY, { align: 'left' });
        doc.moveDown(1);
        content();
        const endY = doc.y + 20;
        doc.y = Math.max(startY, endY);
    };

    const addExperiencesSection = () => {
        const transformExperiences = (experiences) => {
            return experiences.map((experience) => {
                return {
                    jobTitle: Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle],
                    city: Array.isArray(experience.city) ? experience.city : [experience.city],
                    employer: Array.isArray(experience.employer) ? experience.employer : [experience.employer],
                    startDate: Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate],
                    endDate: Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate],
                    description: Array.isArray(experience.description) ? experience.description : [experience.description],
                };
            });
        };

        const transformedExperiences = transformExperiences(experiences || []);
        transformedExperiences.forEach((experience, index) => {
            if (Array.isArray(experience.jobTitle) &&
                Array.isArray(experience.employer) &&
                Array.isArray(experience.city) &&
                Array.isArray(experience.description)) {

                if (index !== 0) {
                    doc.moveDown(1);
                }

                experience.jobTitle.forEach(title => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${title}`, { align: 'left' });
                });

                experience.employer.forEach(emp => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${emp}`, { align: 'left' });
                });

                experience.city.forEach(cty => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${cty}`, { align: 'left' });
                });

                doc.font(RobotoBold).fontSize(10).fillColor('#4b30c9').text(`${experience.startDate.join(' - ')} - ${experience.endDate.join(' - ')}`, { align: 'left' });

                experience.description.forEach(desc => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${desc}`, { align: 'left', width: 200 });
                });
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
                    doc.font(Roboto).fontSize(10).fillColor('black').text(` ${title}`, { align: 'left' });
                });
                doc.moveDown(0.5)
                referance.employer.forEach(emp => {
                    doc.font(RobotoBold).fontSize(10).fillColor('#bf5c46').text(`${emp}`, { align: 'left' });
                });
                doc.moveDown(0.5)
                referance.city.forEach(cty => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${cty}`, { align: 'left' });
                });
            } else {
                console.error(`Invalid experience at index ${index}.`);
            }
        });
    };

    addSection('İş deneyimi', addExperiencesSection);
    addSection('Referanslar', addReferencesSection);

}
function applyTemplate2(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs, experiences, referance) {
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

    doc.fillColor('black').fontSize(fontSize).text(text, centerX + 10, verticalOffset, { align: 'left' });
    doc.fillColor('black').font(Roboto).fontSize(16).text(position, centerX + 10, verticalOffset + 35, { align: 'left', });
    doc.fillColor('black').font(RobotoLight).fontSize(10).text(about, centerX + 10, verticalOffset + 65, { align: 'left', });

    const lineY = verticalOffsets + 25;
    doc.lineWidth(1).moveTo(centerX, lineY).lineTo(centerX + 300, lineY).strokeColor('#EEEDEB').stroke();


    // İletişim Bilgiler
    const contactInfoX = 35;
    const contactInfoY = 230;
    doc.x = contactInfoX;
    doc.y = contactInfoY;

    doc.font(RobotoBold).fontSize(14).fillColor('white').text('İLETİŞİM BİLGİLERİ', { align: 'left' });
    // E-posta
    doc.moveDown(1.3);
    doc.font(Roboto).fontSize(9).fillColor('white').text('E-posta:', { align: 'left', bold: true });
    doc.moveDown(0.5);
    doc.font(RobotoBold).fontSize(10).fillColor('white').text(eposta, { align: 'left', width: 150 });
    doc.moveDown(1);
    // Telefon Numarası
    doc.font(Roboto).fontSize(9).fillColor('white').text('Telefon Numarasi:', { align: 'left', bold: true });
    doc.moveDown(0.5);
    doc.font(RobotoBold).fontSize(10).fillColor('white').text(phonenumber, { align: 'left', width: 100 });
    doc.moveDown(1);
    // Konum
    doc.font(Roboto).fontSize(9).fillColor('white').text('Konum:', { align: 'left', bold: true, });
    doc.moveDown(0.5);
    doc.font(RobotoBold).fontSize(10).fillColor('white').text(address, { align: 'left', width: 150 });
    doc.font(Roboto);
    // Website
    doc.moveDown(1);
    doc.font(Roboto).fontSize(9).fillColor('white').text('Website:', { align: 'left', bold: true });
    doc.moveDown(0.5);
    doc.font(RobotoBold).fontSize(10).fillColor('white').text(site, { align: 'left' });
    doc.font(Roboto);

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
                    doc.font(RobotoBold).fontSize(10).fillColor('black').text(`${title}`, { align: 'left' });
                });

                doc.font(RobotoBold).fontSize(10).fillColor('#bf5c46').text(`${experience.startDate.join(' - ')} - ${experience.endDate.join(' - ')}`, { align: 'left' });

                experience.employer.forEach(emp => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${emp}`, { align: 'left' });
                });

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
                    doc.font(Roboto).fontSize(10).fillColor('black').text(` ${title}`, { align: 'left' });
                });
                doc.moveDown(0.5)
                referance.employer.forEach(emp => {
                    doc.font(RobotoBold).fontSize(10).fillColor('#bf5c46').text(`${emp}`, { align: 'left' });
                });
                doc.moveDown(0.5)
                referance.city.forEach(cty => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${cty}`, { align: 'left' });
                });
            } else {
                console.error(`Invalid experience at index ${index}.`);
            }
        });
    };

    addSection('İŞ DENEYİMİ', addExperiencesSection);
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
function applyTemplate3(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs, experiences, referance) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');
    const RobotoThin = path.join(__dirname, '../font/Roboto/Roboto-Thin.ttf');
    const RobotoItalic = path.join(__dirname, '../font/Roboto/Roboto-Italic.ttf');

    doc.rect(0, 0, 1920, 1000).fill('#fef9f9');
    doc.rect(-2, 0, 1920, 150).fill('#fce7f1');
    doc.rect(50, 0, 200, 1920).fill('#edeefc');


    // Adı
    const fontSize = 25;
    const text = `${name.toUpperCase()} ${surname.toUpperCase()}`;
    const textWidth = doc.font(RobotoBold).widthOfString(text, { size: fontSize });
    const centerX = (doc.page.width - textWidth) / 2;

    const verticalOffset = 50;

    doc.fillColor('#3C3633').fontSize(fontSize).text(text, centerX + 60, verticalOffset, { align: 'left', });
    doc.fillColor('#3C3633').font(RobotoItalic).fontSize(16).text(position, centerX + 60, verticalOffset + 60, { align: 'left', });


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
    doc.font(Roboto).fontSize(9).fillColor('#3C3633').text('E-posta:', { align: 'left', bold: true });
    doc.moveDown(0.5);
    doc.font(RobotoBold).fontSize(10).fillColor('#3C3633').text(eposta, { align: 'left', width: 150 });
    doc.moveDown(1);
    // Telefon Numarası
    doc.font(Roboto).fontSize(9).fillColor('#3C3633').text('Telefon Numarasi:', { align: 'left', bold: true });
    doc.moveDown(0.5);
    doc.font(RobotoBold).fontSize(10).fillColor('#3C3633').text(phonenumber, { align: 'left', width: 100 });
    doc.moveDown(1);
    // Konum
    doc.font(Roboto).fontSize(9).fillColor('#3C3633').text('Konum:', { align: 'left', bold: true, });
    doc.moveDown(0.5);
    doc.font(RobotoBold).fontSize(10).fillColor('#3C3633').text(address, { align: 'left', width: 150 });
    doc.font(Roboto);
    // Website
    doc.moveDown(1);
    doc.font(Roboto).fontSize(9).fillColor('#3C3633').text('Website:', { align: 'left', bold: true });
    doc.moveDown(0.5);
    doc.font(RobotoBold).fontSize(10).fillColor('#3C3633').text(site, { align: 'left' });
    doc.font(Roboto);


    // Fotoğraf
    if (photoBuffer) {
        const circleX = 157 - 5; // Dairenin x koordinatını sola kaydır
        const circleY = 115 + 40; // Dairenin y koordinatını aşağı kaydır
        const circleRadius = 80; // Dairenin yarıçapı

        const imageX = circleX - circleRadius; // Yeni x koordinatı, sola kaydırılmış
        const imageY = circleY - circleRadius; // Yeni y koordinatı, yukarı kaydırılmış

        // Yuvarlak bir maske ekleyerek resmi çiz
        doc.circle(circleX, circleY, circleRadius).clip().image(photoBuffer, imageX, imageY, { width: 160, height: 160 }).restore();
    }

}
function applyTemplate4(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs, experiences, referance) {
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

    doc.rect(280, 135, 1920, 30).fill('#EEEEEE');
    const verticalOffset = 50;
    doc.fillColor('black').fontSize(fontSize).text(text, centerX + 75, verticalOffset, { align: 'left' });
    doc.fillColor('black').font(Roboto).fontSize(20).text(position, centerX + 80, verticalOffset + 90, { align: 'left', width: 250 });

    // İletişim Bilgiler
    const contactInfoX = 75;
    const contactInfoY = 250;
    doc.x = contactInfoX;
    doc.y = contactInfoY;

    doc.font(Roboto).fontSize(20).fillColor('#000000').text('İLETİŞİM', { align: 'left' });

    const lineY = contactInfoY + 25;
    doc.lineWidth(1).moveTo(centerX, lineY).lineTo(contactInfoX, lineY).strokeColor('#000000').stroke();
    // E-posta
    doc.moveDown(0.5);
    doc.font(Roboto).fontSize(10).fillColor('#000000').text(eposta, { align: 'left', width: 150 });
    doc.moveDown(0.5);
    // Telefon Numarası
    doc.font(Roboto).fontSize(10).fillColor('#000000').text(phonenumber, { align: 'left', width: 100 });
    // Website
    doc.moveDown(0.5);
    doc.font(Roboto).fontSize(10).fillColor('#000000').text(site, { align: 'left' });
    doc.font(Roboto);

    // Hakkında
    const contactInfoXX = 75;
    const contactInfoYY = 350;
    doc.x = contactInfoXX;
    doc.y = contactInfoYY;
    doc.font(Roboto).fontSize(20).fillColor('#000000').text('HAKKINDA', { align: 'left' });
    const linesY = contactInfoYY + 25;
    doc.lineWidth(1).moveTo(centerX, linesY).lineTo(contactInfoXX, linesY).strokeColor('#000000').stroke();
    doc.fillColor('black').font(RobotoLight).fontSize(10).text(about, contactInfoXX, contactInfoYY + 35, { align: 'left', width: 170 });



    // Yetenekler

    const contactInfoXXX = 75;
    const contactInfoYYY = 490;
    doc.x = contactInfoXXX;
    doc.y = contactInfoYYY;
    doc.moveDown(1);
    doc.font(Roboto).fontSize(20).fillColor('000000').text('BECERİLER', contactInfoXXX, contactInfoYYY, { align: 'left' });
    const lineYY = contactInfoYYY + 25;
    doc.lineWidth(1).moveTo(centerX, lineYY).lineTo(contactInfoXXX, lineYY).strokeColor('#000000').stroke();
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
    doc.lineWidth(1).moveTo(centerX, lineYY + 110).lineTo(contactInfoXXX, lineYY + 110).strokeColor('#000000').stroke();
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


}
function applyTemplate5(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs, experiences, referance) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');

}
function applyTemplate6(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs, experiences, referance) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');

}
function applyTemplate7(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs, experiences, referance) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');

    // Color
    const gradient = doc.linearGradient(0, 0, 1920, 0);
    gradient.stop(0, '#F18C31');
    gradient.stop(1, '#F2A90F');

    doc.rect(580, 0, 100, 1920).fill(gradient);


    // Ad Soyad

    const fontSize = 20;
    const text = `${name} ${surname}`;
    const textWidth = doc.font(RobotoBold).widthOfString(text, { size: fontSize });
    const centerX = (doc.page.width - textWidth) / 2;
    const verticalOffset = 50;
    doc.fillColor('black').fontSize(fontSize).text(text, centerX - 180, verticalOffset, { align: 'left' });
    doc.fillColor('black').font(Roboto).fontSize(16).text(position, centerX - 180, verticalOffset + 35, { align: 'left', });


    // Fotoğraf
    doc.image(photoBuffer, 350, 50, { width: 200, height: 200 }); // Resmi ekleyin


    // İletişim Bilgiler

    const contactInfoX = 50;
    const contactInfoY = 250;
    doc.x = contactInfoX;
    doc.y = contactInfoY;
    const boxWidth = 230;
    const boxHeight = 530;
    const cornerRadius = 20;
    const borderWidth = 0.8;
    
    doc.roundedRect(contactInfoX -20, contactInfoY-30, boxWidth, boxHeight, cornerRadius)
        .lineWidth(borderWidth) // Kenarlık kalınlığını ayarlayın
        .strokeColor('#000000') // Kenarlık rengini ayarlayın
        .stroke(); // Kenarlık çiz

    doc.font(RobotoBold).fontSize(16).fillColor('#000000').text('İLETİŞİM', { align: 'left' });
    // E-posta
    doc.moveDown(0.5);
    doc.font(Roboto).fontSize(10).fillColor('#000000').text(eposta, { align: 'left', width: 150 });
    doc.moveDown(0.5);
    // Telefon Numarası
    doc.font(Roboto).fontSize(10).fillColor('#000000').text(phonenumber, { align: 'left', width: 100 });
    // Website
    doc.moveDown(0.5);
    doc.font(Roboto).fontSize(10).fillColor('#000000').text(site, { align: 'left' });
    doc.font(Roboto);

    // Hakkında
    const contactInfoXX = 50;
    const contactInfoYY = 340;
    doc.x = contactInfoXX;
    doc.y = contactInfoYY;
    doc.font(RobotoBold).fontSize(16).fillColor('#000000').text('HAKKINDA', { align: 'left' });
    doc.fillColor('black').font(RobotoLight).fontSize(10).text(about, contactInfoXX, contactInfoYY + 25, { align: 'left', width: 170 });

    // Yetenekler
    const contactInfoXXX = 50;
    const contactInfoYYY = 460;
    doc.x = contactInfoXXX;
    doc.y = contactInfoYYY;

    const contactRefX = 35;
    const contactRefY = 230;
    doc.x = contactRefX;
    doc.y = contactRefY;

    const addSection = (title, content) => {
        const startX = 50;
        const startY = (doc.y !== undefined && doc.y !== null) ? doc.y : 30;

        doc.font(RobotoMedium).fontSize(14).fillColor('black').text(title, startX, startY, { align: 'left' });
        doc.moveDown(1);
        content();
        const endY = doc.y + 15;
        doc.y = Math.max(startY, endY);
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
                    doc.font(Roboto).fontSize(10).fillColor('black').text(` ${title}`, { align: 'left' });
                });
                doc.moveDown(0.5)
                referance.employer.forEach(emp => {
                    doc.font(RobotoBold).fontSize(10).fillColor('#bf5c46').text(`${emp}`, { align: 'left' });
                });
                doc.moveDown(0.5)
                referance.city.forEach(cty => {
                    doc.font(Roboto).fontSize(10).fillColor('black').text(`${cty}`, { align: 'left' });
                });
            } else {
                console.error(`Invalid experience at index ${index}.`);
            }
        });
    };

    addSection('REFERANSLAR', addReferencesSection);


    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(16).fillColor('000000').text('BECERİLER', contactInfoXXX + 250, contactInfoYYY, { align: 'left' });
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
}
function applyDefaultTemplate(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs, referance) {
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

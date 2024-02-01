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

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=mobilecv.pdf');
        doc.pipe(res);

        doc.font('Helvetica');
        if (template === 'template1') {
            applyTemplate1(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about,skilss, langss);
        } else if (template === 'template2') {
            applyTemplate2(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss);
        } else if (template === 'template3') {
            applyTemplate3(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss);
        } else if (template === 'template4') {
            applyTemplate4(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilss, langss);
        }
        else {
            applyDefaultTemplate(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position);
        }

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

function applyTemplate1(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs) {
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
    const contactInfoY = 260;
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
    const lineY = 260;
    const pointSize = 3;
    doc.lineCap('butt').lineWidth(1.5).moveTo(0, lineY).lineTo(80, lineY).stroke('#4b30c9');
    doc.circle(80, lineY, pointSize).fill('#4b30c9');


      // Yabancı Dil
    
      doc.moveDown(1);
      doc.font(RobotoBold).fontSize(14).fillColor('#4b30c9').text('Yabancı Dil', 400, 480, { align: 'left' });
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
                    .text(`• ${langLines.join('\n• ')}`, { align: 'left', width:200});
            } else {
                console.error(`Invalid lang at index ${index}.`);
            }
        });
    } else {
        console.error('Languages are not defined or not an array.');
    }

  
      // Yetkinlikler
      doc.moveDown(1);
      doc.font(RobotoBold).fontSize(14).fillColor('#4b30c9').text('Yetkinlikler', 400, 360, { align: 'left' });

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
                    .text(`• ${skillLines.join('\n• ')}`, { align: 'left',width:200 });
            } else {
                console.error(`Invalid skill at index ${index}.`);
            }
        });
    } else {
        console.error('Skills are not defined or not an array.');
    }
}

function applyTemplate2(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs) {
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

    // İş deneyimi
    doc.moveDown(2);
    doc.font(RobotoMedium).fontSize(14).fillColor('black').text('İŞ DENEYİMİ', centerX + 20, verticalOffset + 180, { align: 'left' });
    doc.moveDown(1);


    // console.log('Experiences:', experiences);

    // const transformExperiences = (experiences) => {
    //     return experiences.map((experience) => {
    //         return {
    //             jobTitle: Array.isArray(experience.jobTitle) ? experience.jobTitle : [experience.jobTitle],
    //             city: Array.isArray(experience.city) ? experience.city : [experience.city],
    //             employer: Array.isArray(experience.employer) ? experience.employer : [experience.employer],
    //             startDate: Array.isArray(experience.startDate) ? experience.startDate : [experience.startDate],
    //             endDate: Array.isArray(experience.endDate) ? experience.endDate : [experience.endDate],
    //             description: Array.isArray(experience.description) ? experience.description : [experience.description],
    //         };
    //     });
    // };

    // const transformedExperiences = transformExperiences(experiences);

    // transformedExperiences.forEach((experience, index) => {
    //     if (experience && typeof experience === 'object') {
    //         if (index !== 0) {
    //             doc.moveDown(1);
    //         }

    //         experience.jobTitle.forEach(title => {
    //             doc.font(Roboto).fontSize(10).fillColor('black').text(`Job Title: ${title}`, { align: 'left' });
    //         });

    //         experience.employer.forEach(emp => {
    //             doc.font(Roboto).fontSize(10).fillColor('black').text(`Employer: ${emp}`, { align: 'left' });
    //         });

    //         experience.city.forEach(cty => {
    //             doc.font(Roboto).fontSize(10).fillColor('black').text(`City: ${cty}`, { align: 'left' });
    //         });

    //         doc.font(RobotoBold).fontSize(10).fillColor('#bf5c46').text(`Dates: ${experience.startDate.join(' - ')} - ${experience.endDate.join(' - ')}`, { align: 'left' });

    //         experience.description.forEach(desc => {
    //             doc.font(Roboto).fontSize(10).fillColor('black').text(`Description: ${desc}`, { align: 'left' });
    //         });
    //     } else {
    //         console.error(`Invalid experience at index ${index}.`);
    //     }
    // });


    // Yetenekler
    doc.moveDown(1);
    doc.font(RobotoBold).fontSize(14).fillColor('white').text('YETKİNLİKLER', contactInfoX, contactInfoY + 220, { align: 'left' });
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

function applyTemplate3(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');

    const scaleX = 0.7;

    doc.rect(0, 0, 1920, 1000).fill('#fef9f9');
    doc.rect(-2, 0, 1920 * scaleX, 150).fill('#fce7f1');
    doc.rect(50, 0, 200, 1920).fill('#edeefc');

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

function applyTemplate4(doc, name, surname, eposta, phonenumber, address, photoBuffer, site, position, about, skilles, langs) {
    const Roboto = path.join(__dirname, '../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../font/Roboto/Roboto-Light.ttf');

    const scaleX = 0.7;

    doc.rect(0, 0, 1920, 1000).fill('#fef9f9');
    doc.rect(-2, 0, 1920 * scaleX, 150).fill('#fce7f1');
    doc.rect(50, 0, 200, 1920).fill('#edeefc');





}

function applyDefaultTemplate(doc, name, surname, eposta, phonenumber, address, photoBuffer, site) {
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

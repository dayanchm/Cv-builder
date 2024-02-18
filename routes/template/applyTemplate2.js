const path = require('path');

function applyTemplate2(doc, name, surname,
    eposta,
    phonenumber,
    address,
    photoBuffer,
    site,
    position, about, skilles, langs, experiences, referance, academi, date, city, posta, birth, asker, surucu, medeni, gender) {
    const Roboto = path.join(__dirname, '../../font/Roboto/Roboto-Regular.ttf');
    const RobotoMedium = path.join(__dirname, '../../font/Roboto/Roboto-Medium.ttf');
    const RobotoBold = path.join(__dirname, '../../font/Roboto/Roboto-Bold.ttf');
    const RobotoLight = path.join(__dirname, '../../font/Roboto/Roboto-Light.ttf');

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
    doc.font(RobotoBold).fontSize(9).fillColor('white').text('• ' + 'Doğum Yeri: ' + birth,{ align: 'left', width: 200 });
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

module.exports = applyTemplate2;
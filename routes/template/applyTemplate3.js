const path = require('path');


function applyTemplate3(doc, name, surname,
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
    const RobotoItalic = path.join(__dirname, '../../font/Roboto/Roboto-Italic.ttf');

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


module.exports = applyTemplate3;
// controllers/langController.js

const enTranslations = require('../locales/en/translation.json');
const frTranslations = require('../locales/tr/translation.json');

exports.getIndex = (req, res) => {
  const lang = req.lang; 

  let translations;
  if (lang === 'tr') {
    translations = frTranslations;
  } else {
    translations = enTranslations;
  }

  res.render('index', { translations }); // Düzeltildi
};
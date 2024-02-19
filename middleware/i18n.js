// middleware/i18n.js
module.exports = function(req, res, next) {
    // Burada isteğin dil ayarlarını kontrol edebilirsiniz.
    // Örneğin, istek başlıklarına veya bir oturum değişkenine bakabilirsiniz.
    // Burada basit bir örnek:
  
    // Varsayılan olarak İngilizce kullan
    let lang = 'en';
  
    // İstek üzerindeki dil ayarlarını kontrol et
    if (req.headers['accept-language']) {
      lang = req.headers['accept-language'].split(',')[0]; // İlk kabul edilen dil
    }
  
    // Dil ayarını istek nesnesine ekle, böylece diğer middleware ve routelar erişebilir
    req.lang = lang;
  
    // Sonraki middleware'e devam et
    next();
  };
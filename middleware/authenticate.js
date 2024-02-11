const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user; // Her istekte user bilgisini response.locals'a ekleyin
    } else {
        res.locals.user = null; // Oturum açmamışsa user bilgisini null olarak ayarlayın
    }
    next();
};

module.exports = authenticateUser;
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");
const Seo = require("../models/seo.model")(sequelize, DataTypes);


class SeoController {
    
}


module.exports= {
    SeoController
}
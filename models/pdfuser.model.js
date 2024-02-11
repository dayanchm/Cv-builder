module.exports = (sequelize, DataTypes) => {
    const PdfUser = sequelize.define('pdfuser', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
    });

    return PdfUser;
};

module.exports = (sequelize, DataTypes) => {
    const Site = sequelize.define("site",
        {
            site_title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            site_desc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            addres: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fav_icon: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Site;
};

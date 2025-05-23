module.exports = (sequelize, DataTypes) => {
    const Cookie = sequelize.define("cookie",
      {
        order: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        desc: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
      }
    );
    return Cookie;
  };
  
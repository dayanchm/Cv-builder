module.exports = (sequelize, DataTypes) => {
    const Faq = sequelize.define("faq",
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
    return Faq;
  };
  
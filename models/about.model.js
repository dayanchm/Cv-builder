module.exports = (sequelize, DataTypes) => {
    const About = sequelize.define("about",
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
        img: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
      }
    );
    return About;
  };
  
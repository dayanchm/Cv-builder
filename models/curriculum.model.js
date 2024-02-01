module.exports = (sequelize, DataTypes) => {
    const Cirriculum = sequelize.define("cirriculum",
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
    return Cirriculum;
  };
  
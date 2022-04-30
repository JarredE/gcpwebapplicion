module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("Status", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Status;
  };
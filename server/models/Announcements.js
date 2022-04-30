module.exports = (sequelize, DataTypes) => {



 

    const Announcement = sequelize.define("Announcement", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      announcement: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
    
    
    Announcement.findOrCreate({
      where: {id: 1},
      defaults: {
        announcement: 'No volunteer announcement just yet.',
      }
    })
    
    Announcement.findOrCreate({
      where: {id: 2},
      defaults: {
        announcement: 'No referrer announcement just yet.'
      }
    })


return Announcement;









  };
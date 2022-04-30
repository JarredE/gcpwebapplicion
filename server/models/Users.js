
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   isUnique: function (value, next) {
      //     var self = this;
      //     Users.findOne({ where: { username: value } })
      //       .then(function (user) {
      //         if (user && self.id !== user.id) {
      //          // return next('username already in use!');
      //          throw new Error('Username already in use');

      //         }
      //         return next();
      //       })
      //       .catch(function (err) {
      //         return next(err);
      //       });
      //   }
      // }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    },
    Phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneProvider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Notification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Agency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Agency_zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nearest_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    self_notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    num_assigned: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    num_held: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    num_completed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

    // Users.associate = (models) => {
    // Users.hasMany(models.Referral, {
    // as: 'referrals', foreignKey: 'referrerid',
    // onDelete: "cascade"})
   //};
  return Users;
};

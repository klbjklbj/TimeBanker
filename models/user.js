module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {

    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    skill: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    image: DataTypes.TEXT,
    isLoggedOn:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    } 
  });

  return User;
};


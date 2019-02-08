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

    isLoggedOn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address2: {
      type: DataTypes.STRING,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUppercase: true
      }
    },

    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING
    },

    personHours: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  });

  return User;
};


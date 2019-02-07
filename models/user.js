module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {

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

<<<<<<< HEAD
  user.sync().then(() => {
    User.create({
      firstName: 'Leonard',
      lastName: 'Nimoy',
      skill: 'Logic and Mind Melding',
      email: 'spock@vulcan.con',
      image: 'https://66.media.tumblr.com/c8945ee30829cb081e4c2eeaca115b16/tumblr_plxye0xXPy1w314t0o1_540.png'
    });
    user.create({
      firstName: 'William',
      lastName: 'Shatner',
      skill: 'Captain',
      email: 'kirk@enterprise.com',
      image: 'https://www.gettyimages.com/detail/news-photo/canadian-actor-william-shatner-as-captain-james-t-kirk-in-news-photo/81792246'
    });
  });

  return user;
=======
  return User;
>>>>>>> 2050151e5d2f03b7ae196d674347100e449b9b72
};


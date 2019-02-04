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

  User.sync().then(() => {
    User.create({
      firstName: 'Leonard',
      lastName: 'Nimoy',
      skill: 'Logic and Mind Melding',
      email: 'spock@vulcan.con',
      image: 'https://66.media.tumblr.com/c8945ee30829cb081e4c2eeaca115b16/tumblr_plxye0xXPy1w314t0o1_540.png'
    });
    User.create({
      firstName: 'William',
      lastName: 'Shatner',
      skill: 'Captain',
      email: 'kirk@enterprise.com',
      image: 'https://www.gettyimages.com/detail/news-photo/canadian-actor-william-shatner-as-captain-james-t-kirk-in-news-photo/81792246'
    });
  });

  return User;
};


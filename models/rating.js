module.exports = function(sequelize, DataTypes) {
    var Rating = sequelize.define("Rating", {
      // Giving the Author model a name of type STRING
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },


     Date : {
        type: DataTypes.STRING ,
        allowNull: false,
        validate: {
          len: [1]
        }
      },


      Review: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },


    });


    Rating.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Rating.belongsTo(models.Listing, {
          foreignKey: {
            allowNull: false
          }
        });
      };
  

    return Rating;
  };
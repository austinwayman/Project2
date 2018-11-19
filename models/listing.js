module.exports = function(sequelize, DataTypes) {
    var Listing = sequelize.define("Listing", {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      City: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      State: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      
      BedroomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      BathroomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      
      Description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

            
      PricePerNight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      Img1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      
      Img2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      
      Img3: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      EndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      Taken: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }


    });

    Listing.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Listing.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

  
    Listing.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Listing.hasMany(models.Rating, {
        onDelete: "cascade"
      });
    };
  
  
    return Listing;
  };
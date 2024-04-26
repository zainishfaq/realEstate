import { DataTypes } from 'sequelize';
import sequelize from '../../db/config.js';

const ListingModel = sequelize.define('Listing', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regularPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discountPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  furnished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  parking: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  offer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  imageUrls: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: false,
  },
  userRef: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default ListingModel;

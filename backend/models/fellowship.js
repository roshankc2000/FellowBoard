import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Fellowship = sequelize.define('Fellowship', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  special_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [6, 6],  // Ensures the code is exactly 6 characters long
    },
  },
}, {
  timestamps: true,
  tableName: 'fellowships',
});

export default Fellowship;

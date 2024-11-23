// models/resource.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'; // Assuming you have a Sequelize instance exported from db.js

const Resource = sequelize.define('Resource', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filepath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fellowship_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'resources',  // Table name should be plural by convention
});

export default Resource;

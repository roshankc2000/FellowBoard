import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Announcement = sequelize.define('Announcement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fellowship_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: true,  // Nullable: null means it's for all fellows
  },
}, {
  timestamps: true,
});

export default Announcement;
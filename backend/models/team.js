import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Fellowship from './fellowship.js';

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team_code: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      len: [6, 6], // Ensure the code is exactly 6 digits
      isNumeric: true, // Ensure the code is numeric
    },
    defaultValue: () => Math.floor(100000 + Math.random() * 900000).toString(), // Generates a 6-digit code
  },
  fellowship_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Fellowship,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'teams',
});

// Association with Fellowship
Team.belongsTo(Fellowship, { foreignKey: 'fellowship_id' });

export default Team;

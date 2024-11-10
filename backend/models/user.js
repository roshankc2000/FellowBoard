import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Fellowship from './fellowship.js';
import Team from './team.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 64],  // Ensures password is between 8 and 64 characters
        msg: 'Password must be between 8 and 64 characters long',
      },
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
  fellowship_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Fellowship,
      key: 'id',
    },
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Team,
      key: 'id',
    },
    unique: true, // Ensure one user can only join one team
  },
}, {
  timestamps: true,
  tableName: 'users',
});

// Associations
User.belongsTo(Fellowship, { foreignKey: 'fellowship_id' });
User.belongsTo(Team, { foreignKey: 'team_id' });

export default User;

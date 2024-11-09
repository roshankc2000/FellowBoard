import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

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
}, {
  timestamps: true,
  tableName: 'users',
});

export default User;

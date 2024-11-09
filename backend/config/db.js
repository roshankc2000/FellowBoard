import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectDB };

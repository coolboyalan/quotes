const { Sequelize } = require('sequelize');
const pg = require('pg');

pg.defaults.parseInt8 = true;

const databaseUrl = process.env.DB_URL

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres', // Change this to your database dialect (e.g., postgres for PostgreSQL)
  dialectModule: pg
});

export default sequelize;

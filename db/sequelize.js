const { Sequelize } = require("sequelize");
const pg = require("pg");

pg.defaults.parseInt8 = true;

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.HOST,
  dialect: "postgres", // Change this to your database dialect (e.g., postgres for PostgreSQL)
  dialectModule: pg,
});

export default sequelize;

require('dotenv').config();
const { defineConfig } = require('prisma/config');
const { PrismaPg } = require('@prisma/adapter-pg');

module.exports = {
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
};

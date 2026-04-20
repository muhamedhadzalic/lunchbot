require('dotenv').config();
const { defineConfig } = require('prisma/config');
const { PrismaPg } = require('@prisma/adapter-pg');

module.exports = defineConfig({
  schema: './prisma/schema.prisma',
  migrate: {
    async adapter(env) {
      return new PrismaPg(env.DATABASE_URL);
    },
  },
});

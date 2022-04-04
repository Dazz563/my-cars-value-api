const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: process.env.TYPE,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.js'],
      host: process.env.HOST,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: process.env.TYPE,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.ts'],
      host: process.env.HOST,
      username: process.env.USERNAME,
      password: process.env.USERNAME,
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'mysql',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;

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
      type: 'mysql',
      database: 'my_car_value_db',
      entities: ['**/*.entity.js'],
      host: 'localhost',
      username: 'root',
      password: 'root',
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'mysql',
      database: 'test_my_car_value_db',
      entities: ['**/*.entity.js'],
      host: 'localhost',
      username: 'root',
      password: 'root',
      migrationsRun: true,
    });
    break;
  case 'production':
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;

import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from 'ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(dbConfig),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'mysql',
    //       database: config.get<string>('DB_NAME'),
    //       synchronize: true,
    //       autoLoadEntities: true,
    //       username: config.get<string>('USERNAME'),
    //       password: config.get<string>('PASSWORD'),
    //       port: config.get<number>('PORT'),
    //       host: config.get<string>('HOST')
    //     }
    //   }
    // }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [
    // Applying a globally scoped pipe
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  // Applying a globally scoped middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}

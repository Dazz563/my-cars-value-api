import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'my_car_value_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

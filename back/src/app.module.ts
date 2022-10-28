import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      // port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: ['dist/**/*.entity{.js,.ts}'],
      synchronize: true,
      autoLoadEntities: true,
    } as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    EventModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

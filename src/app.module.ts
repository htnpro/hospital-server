import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Config } from './common/providers/config/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { BookModule } from './book/book.module';
import { CallbackModule } from './callback/callback.module';

const config = new Config();

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env' }),
    MongooseModule.forRoot(process.env.DB_HOST, config.dbConfig),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/files'
    }),
    UserModule,
    DoctorModule,
    SpecialitiesModule,
    BookModule,
    CallbackModule
  ],
  controllers: [ AppController ],
  providers: [ AppService, Config ],
  exports: [ Config ]
})
export class AppModule {}

import { UserAuthModule } from './user_auth/userauth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserAuthModule,
    DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

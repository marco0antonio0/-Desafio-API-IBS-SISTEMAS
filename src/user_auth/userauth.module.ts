import { UserauthService } from './userauth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserauthController } from './userauth.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule, JwtModule.register({ secret: process.env.SECRETTOKEN })],
    controllers: [
        UserauthController,],
    providers: [
        UserauthService,], exports: [UserauthService]
})
export class UserAuthModule { }

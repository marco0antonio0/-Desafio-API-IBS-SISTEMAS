import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserAuthModule } from 'src/user_auth/userauth.module';

@Module({
    imports: [DatabaseModule, UserAuthModule],
    controllers: [UserController],
    providers: [
        UserService],
})
export class UserModule { }

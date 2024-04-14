// database.module.ts

import { Module } from '@nestjs/common';
import { createDatabaseConnection } from './database.config';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [
        {
            provide: 'DATABASE_CONNECTION',
            useFactory: async () => await createDatabaseConnection({
                host: process.env.HOSTPROD,
                user: process.env.USERPROD,
                password: process.env.PASSWORDPROD,
                database: process.env.DATABASEPROD,
            }),
        },
        DatabaseService,
    ],
    exports: [DatabaseService],
})
export class DatabaseModule { }

import { Injectable, Inject } from '@nestjs/common';
import { Connection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { UserDto, UserUpdateDTO } from 'src/user/validation/user.dto';
import { RegisterAuthDto } from 'src/user_auth/validation/register.dto';

@Injectable()
export class DatabaseService {
    constructor(@Inject('DATABASE_CONNECTION') private connection: Connection) { }

    async query(sql: string, values?: any[]): Promise<any[]> {
        try {
            const [rows, fields] = await this.connection.query(sql, values);

            return [rows, fields];
        } catch (error) {
            return [];
        }

    }

}

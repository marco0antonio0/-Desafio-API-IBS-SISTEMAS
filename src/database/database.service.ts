import { Injectable, Inject } from '@nestjs/common';
import { Connection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';


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

    async closeConnection(): Promise<void> {
        try {
            await this.connection.end();  // Encerra a conexão
        } catch (error) {
            console.error('Error closing the database connection:', error);
        }
    }

}

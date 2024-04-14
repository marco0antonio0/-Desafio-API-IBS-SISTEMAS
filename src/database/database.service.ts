import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { createDatabaseConnection } from './database.config';

@Injectable()
export class DatabaseService {
    private connection: Connection | null = null;

    constructor(@Inject('DATABASE_CONNECTION') private databaseConnection: Connection) { }

    private async ensureConnection(): Promise<void> {
        if (!this.connection) {
            this.connection = this.databaseConnection;
        } else {
            // Verifica se a conexão está perdida
            try {
                await this.connection.query('SELECT 1');
            } catch (error) {
                console.error('Connection lost, reconnecting...');
                await this.openConnection(); // Reconecta em caso de perda de conexão
            }
        }
    }

    async query(sql: string, values?: any[]): Promise<any[]> {
        try {
            await this.ensureConnection(); // Garante que haja uma conexão ativa
            const [rows, fields] = await this.connection.query(sql, values);
            return [rows, fields];
        } catch (error) {
            console.error('Error executing query:', error);
            return [];
        }
    }

    private async openConnection(): Promise<void> {
        try {
            this.connection = await createDatabaseConnection({
                host: process.env.HOSTPROD,
                user: process.env.USERPROD,
                password: process.env.PASSWORDPROD,
                database: process.env.DATABASEPROD,
            });

        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error; // Lança o erro para ser tratado fora do serviço
        }
    }
}

// database.config.ts
// dados de conexão sql server
import * as mysql from 'mysql2/promise';

export async function createDatabaseConnection(dbConfig) {
    return await mysql.createConnection(dbConfig);
}
export const query0 = `
CREATE TABLE IF NOT EXISTS ficha (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    sexo ENUM('masculino', 'feminino', 'outros') NOT NULL,
    data_nascimento DATE NOT NULL,
    estado_civil ENUM('solteiro', 'casado', 'divorciado', 'uniao instavel') NOT NULL,
    cep VARCHAR(10) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    numero INT(10) NOT NULL,
    complemento VARCHAR(255),
    bairro VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL
);
`
export const query1 = `
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
)`
// user.service.ts

import { ConflictException, Injectable } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
import { UserDto, UserDtoByEmail, UserUpdateDTO } from './validation/user.dto';

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) { }

    async consultaUsersEndereco(): Promise<any[]> {
        const res = await this.databaseService.query("SELECT * FROM ficha", [])


        // Se a consulta retornar linhas
        if (Array.isArray(res[0])) {
            return res[0] as RowDataPacket[];
        }



        // Se a consulta não retornar nada
        return [];
    }

    async consultaUsersEnderecoById(id): Promise<any[]> {
        const res = await this.databaseService.query("SELECT * FROM ficha WHERE id = ?", [id])


        // Se a consulta retornar linhas
        if (Array.isArray(res[0])) {
            return res[0] as RowDataPacket[];
        }


        // Se a consulta não retornar nada
        return [];
    }

    async consultaUsersEnderecoByEmail(email): Promise<any[]> {
        const res = await this.databaseService.query("SELECT * FROM ficha WHERE email = ?", [email])


        // Se a consulta retornar linhas
        if (Array.isArray(res[0])) {
            return res[0] as RowDataPacket[];
        }

        // Se a consulta não retornar nada
        return [];
    }

    async deleteUsersEnderecoByEmail(email): Promise<any[]> {
        const res = await this.databaseService.query("DELETE FROM ficha WHERE email = ? ", [email])

        try {
            if (res[0]['affectedRows'] > 0) {
                return [true]

            } else {
                return [false]
            }
        } catch (error) {
            return [false]

        }
    }

    async cadastroUsersEndereco(user: UserDto, email: string): Promise<any[]> {
        // obj -> lista
        // complemento opcional ?caso tenha algo ele insere caso contratio ele simplesmente deixa vazio
        const lista_de_dados = [
            email,
            user.nome,
            user.sexo,
            user.data_nascimento,
            user.estado_civil,
            user.cep,
            user.endereco,
            user.numero,
            user.complemento ? user.complemento : "",
            user.bairro,
            user.estado,
            user.cidade]
        try {
            const verify = await this.databaseService.query('SELECT * FROM ficha WHERE email = ?', [email])
            if (verify[0].lenght == undefined) {
                const res = await this.databaseService.query("INSERT INTO ficha (id ,email , nome, sexo, data_nascimento, estado_civil, cep, endereco, numero, complemento, bairro, estado, cidade) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", lista_de_dados)
                var resultado = res[0] == undefined
                return [!resultado]
            } else {
                throw new ConflictException("ficha ja existente")
            }

        } catch (error) {
            throw new ConflictException(error)

        }

    }

    async atualizaUsersEnderecoByEmail(user: UserUpdateDTO, email: UserDtoByEmail): Promise<any[]> {

        let query = 'UPDATE ficha SET '
        let index = 0
        // query constructor
        for (const key in user) {
            if (Object.hasOwnProperty.call(user, key)) {
                const value = user[key];
                if (key != "id" && key != "email") {
                    if (index == 0) {
                        if (key == "cep" || key == "numero") {
                            query += `${key} = ${value} `;
                        } else {
                            query += `${key} = "${value}" `;
                        }

                    } else {
                        if (key == "cep" || key == "numero") {
                            query += `, ${key} = ${value} `;
                        } else {
                            query += `, ${key} = '${value}' `;
                        }

                    }
                }
                // contador de passos
                if (index == 0 && key == "email") {
                    index
                } else {
                    index++
                }

            }
        }
        query += `WHERE email = '${email}'`
        // Executando a query
        try {
            const res = await this.databaseService.query(query, [])
            // obtendo resposta se ocorreu alguma alteração
            if (res[0]['changedRows'] > 0 || res[0]['affectedRows'] > 0) {
                return [true]
            } else {
                return [false]
            }
        } catch (error) {
            // console.log(error)
            return [false]
        }

    }
}


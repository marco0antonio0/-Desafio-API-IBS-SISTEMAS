/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
import { RegisterAuthDto } from './validation/register.dto';

@Injectable()
export class UserauthService {
    constructor(private readonly jwtService: JwtService, private readonly databaseService: DatabaseService) {

    }

    createToken(id: number, nome: string, email: string, fase: string) {
        return this.jwtService.sign({
            idUser: id,
            nome: nome,
            email: email
        }, { expiresIn: "7 days", audience: fase, issuer: fase })
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token)
            return data
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async Register(obj) {
        let instancess = await this.consultaUsersByEmail(obj.email)
        if (instancess[0]) {
            throw new ConflictException('Erro email ja cadastrado')
        }

        try {
            let instance = await this.cadastroUserAuth(obj)
            if (instance[0]) {
                return this.createToken(obj['id'], obj['nome'],
                    obj['email'], "registro")
            } else {
                throw new ConflictException('Erro email ja cadastrado')
            }

        } catch (error) {
            // mensagem de erro => não autorizado devido a senha ou nome incorretos
            throw new ConflictException('Erro interno')

        }


    }

    async Login(email, senha) {
        let instance = await this.consultaUsersByEmail(email)
        try {
            if (instance) {
                if (instance[0]['senha'] == senha) {
                    // ============================================
                    //          sucess authenticator

                    return this.createToken(instance[0]['id'],
                        instance[0]['nome'], instance[0]['email'], "login")
                } else {
                    // mensagem de erro => não autorizado devido a senha ou nome incorretos
                    throw new UnauthorizedException('nome e/ou senha incorretos.')

                }
            } else {
                // mensagem de erro => não autorizado devido a senha ou nome incorretos
                throw new UnauthorizedException('nome e/ou senha incorretos.')

            }
        } catch (error) {
            // mensagem de erro => não autorizado devido a senha ou nome incorretos
            throw new UnauthorizedException('nome e/ou senha incorretos.')
        }


    }

    async consultaUsersByEmail(email): Promise<any[]> {

        try {
            const res = await this.databaseService.query(`SELECT * FROM user WHERE email = ?`, [email])
            // Se a consulta retornar linhas
            if (Array.isArray(res[0])) {
                return res[0] as RowDataPacket[];
            }



            // Se a consulta não retornar nada
            return [];
        } catch (error) {
            console.log(error)
            return [];

        }

    }

    async cadastroUserAuth(user: RegisterAuthDto): Promise<any[]> {
        try {
            const res = await this.databaseService.query(`INSERT INTO user (id, nome, senha, email,data_nascimento) VALUES (NULL, ?, ?, ?, ?)`, [user.nome, user.senha, user.email, user.data_nascimento])
            return [true]
        } catch (error) {
            return [false]
        }

    }

    async consultaUsersByAll(): Promise<any[]> {

        try {
            const res = await this.databaseService.query(`SELECT * FROM user`, [])
            // Se a consulta retornar linhas
            if (Array.isArray(res[0])) {
                return res[0] as RowDataPacket[];
            }



            // Se a consulta não retornar nada
            return [];
        } catch (error) {
            console.log(error)
            return [];

        }

    }
}

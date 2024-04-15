/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Headers, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserAuthDto } from './validation/Auth.dto';
import { RegisterAuthDto } from './validation/register.dto';
import { DatabaseService } from 'src/database/database.service';
import { UserauthService } from './userauth.service';
import { LoginAuthDto } from './validation/login.dto';
import { TokenAuthDto } from './validation/checkToken.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminPermissionsAuthGuard } from 'src/guards/AdminPermissions.guard';

@ApiTags("Login | Registro | Validação de token")
@Controller("auth")
export class UserauthController {
    constructor(private readonly userauthService: UserauthService) { }
    // rota acesso geral para logar usuario
    @ApiOperation({ description: "Entrada dos dados de login\n\n acesso permitido a todos \n\entradas: email e senha" })
    @ApiBody({ description: "Dados de login", type: LoginAuthDto })
    @Post("login")
    async login(@Body() obj: LoginAuthDto) {
        let response = await this.userauthService.Login(obj.email, obj.senha)

        return { token: response }
    }
    // rota acesso geral para cadastrar usuario
    @ApiOperation({ description: "Entrada dos dados para **registro de usuario**\n\n acesso permitido a todos \n\entradas: nome,senha e email" })
    @ApiBody({ description: "Dados de Registro", type: RegisterAuthDto })
    @Post("register")
    async register(@Body() obj: RegisterAuthDto) {
        let response = await this.userauthService.Register(obj)
        return { status: response ? "sucess create user" : "fail create user", token: response }
    }

    // rota acesso geral para validar token usuario
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ description: "Entrada dos dados para **validação da token JWT**\n\n acesso permitido a todos \n\entradas: tokenJWT\n\nPametro token JWT inserido no Headers em \n\n```Authorizarion: Bearers YourTokenJWT```\n\nUtilize a tokeJWT no Botão Authorization na interface do swagger para utilizar dessa rota" })
    @Post("check-token")
    async checkToken(@Req() req) {
        // let response = await this.userauthService.checkToken(obj)
        return { decode: 'ok', content: req.tokenPayload }
    }


    // rota -- read
    // apenas o admin pode ter acesso a rota get-all
    @UseGuards(AdminPermissionsAuthGuard)
    @ApiOperation({ description: "Consulta todos as fichas de usuarios\n\n acesso permitido apenas para superAdmin" })
    @ApiBearerAuth()
    @Get('all')
    async read(@Req() req) {
        const users = await this.userauthService.consultaUsersByAll();
        return { status: true, payloadToken: req.tokenPayload, router: "Read By All auth", content: users, }
    }
}

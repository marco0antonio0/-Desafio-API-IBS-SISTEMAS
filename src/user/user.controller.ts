/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserDtoByEmail, UserDtoByID, UserUpdateDTO } from './validation/user.dto';
import { AdminPermissionsAuthGuard } from 'src/guards/AdminPermissions.guard';
import { UniPermissionsAuthGuardByArgs } from 'src/guards/UniPermissionByArgs.guard';
import { ApiBearerAuth, ApiBody, ApiHeaders, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags("CRUD ficha-usuario")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    // rota -- read
    // apenas o admin pode ter acesso a rota get-all
    @UseGuards(AdminPermissionsAuthGuard)
    @ApiOperation({ description: "Consulta todos as fichas de usuarios\n\n acesso permitido apenas para superAdmin" })
    @ApiBearerAuth()
    @Get('id')
    async read(@Req() req) {
        const users = await this.userService.consultaUsersEndereco();
        return { status: true, payloadToken: req.tokenPayload, router: "Read By All", content: users, }
    }

    // rota -- read por id
    // apenas o admin pode ter acesso a esta rota
    @UseGuards(AdminPermissionsAuthGuard)
    @ApiOperation({ description: "**Consulta** uma unica ficha de usuario definido pelo **id** passado\n\nArgs URL necessario **id**, exemplo: <SUA_ROTA>?id=<SEU_ID_CADASTRADO>\n\n acesso permitido apenas para superAdmin|propietario" })
    @ApiBearerAuth()
    @Get("search-id")
    @ApiParam({ name: "id", description: "id referente ao usuario", type: UserDtoByID })
    async readById(@Req() req, @Query('id') id) {
        const users = await this.userService.consultaUsersEnderecoById(id);
        return { status: true, payloadToken: req.tokenPayload, router: "Read By ID", content: users }
    }

    // rota -- read por email
    // apenas o admin e o propietario pode ter acesso a esta rota
    @UseGuards(UniPermissionsAuthGuardByArgs)
    @ApiBearerAuth()
    @ApiOperation({ description: "**Consulta** uma unica ficha de usuario definido pelo **email** passado\n\nArgs URL necessario **email** , exemplo: <SUA_ROTA>?email=<SEU_EMAIL_CADASTRADO>\n\n acesso permitido apenas para superAdmin|propietario" })
    @ApiParam({ name: "email", description: "email referente ao usuario", type: UserDtoByEmail })
    @Get("search-email")
    async readByEmail(@Req() req, @Query('email') email) {
        const users = await this.userService.consultaUsersEnderecoByEmail(email);
        return { status: true, payloadToken: req.tokenPayload, router: "Read By EMAIL", content: users }

    }

    // rota -- criação de usuario
    // apenas o admin e o propietario pode ter acesso a esta rota
    // finalidade:
    // realziar o cadastro da ficha: nome,sexo,data de nascimento,estado civil,multiplos endereços[CEP,Endereço,Número,Complemento(opcional),Bairro,Estado,Cidade]
    @UseGuards(UniPermissionsAuthGuardByArgs)
    @ApiBearerAuth()
    @ApiOperation({ description: "**Cria** uma unica ficha de usuario definido pelos **dados** passado pelo **body**\n\nArgs URL necessario **email** , exemplo: <SUA_ROTA>?email=<SEU_EMAIL_CADASTRADO>\n\nrealiza o cadastro da ficha: nome,sexo,data de nascimento,estado civil,multiplos endereços[CEP,Endereço,Número,Complemento(opcional),Bairro,Estado,Cidade]\n\nacesso permitido apenas para superAdmin|propietario" })
    @ApiParam({ name: "email", description: "email referente ao usuario", type: UserDtoByEmail })
    @ApiBody({ description: "dados necessarios para se **criar** o perfil-ficha", type: UserDto })
    @Post("create-ficha")
    async create(@Req() req, @Query('email') email, @Body() obj: UserDto) {
        const users = await this.userService.cadastroUsersEndereco(obj, email);
        return { status: users[0] ? "sucess create" : "fail create", payloadToken: req.tokenPayload, router: "Create", content: obj }
    }

    // rota -- deletar um usuario pelo email
    // finalidade:
    // informa o email possivel deletar
    @UseGuards(UniPermissionsAuthGuardByArgs)
    @ApiBearerAuth()
    @ApiOperation({ description: "**Deleta** uma unica ficha de usuario definido pelo **email** passado via query url\n\nArgs URL necessario **email** , exemplo: <SUA_ROTA>?email=<SEU_EMAIL_CADASTRADO>\n\nrealiza o cadastro da ficha: nome,sexo,data de nascimento,estado civil,multiplos endereços[CEP,Endereço,Número,Complemento(opcional),Bairro,Estado,Cidade]\n\nacesso permitido apenas para superAdmin|propietario" })
    @ApiParam({ name: "email", description: "email referente ao usuario", type: UserDtoByEmail })
    @Delete("delete-ficha")
    async delete(@Req() req, @Query("email") email) {
        const users = await this.userService.deleteUsersEnderecoByEmail(email);
        return { status: users[0] ? "sucess delete email " + email : "fail execute action delete email " + email, payloadToken: req.tokenPayload, router: "Delete" }
    }

    // rota -- atualizar um usuario
    // finalidade:
    // informa o email possivel atualizar a ficha
    @UseGuards(UniPermissionsAuthGuardByArgs)
    @ApiBearerAuth()
    @ApiOperation({ description: "**Atualiza** uma unica ficha de usuario definido pelos **dados** passado via **body**\n\nArgs URL necessario **email** , exemplo: <SUA_ROTA>?email=<SEU_EMAIL_CADASTRADO>\n\nrealiza o cadastro da ficha: nome,sexo,data de nascimento,estado civil,multiplos endereços[CEP,Endereço,Número,Complemento(opcional),Bairro,Estado,Cidade]\n\nacesso permitido apenas para superAdmin|propietario" })
    @ApiParam({ name: "email", description: "email referente ao usuario", type: UserDtoByEmail })
    @ApiBody({ description: "dados necessarios para se **atualizar** o perfil-ficha", type: UserDto })
    @Put("update-ficha")
    async update(@Req() req, @Query("email") email, @Body() obj: UserUpdateDTO) {
        const users = await this.userService.atualizaUsersEnderecoByEmail(obj, email);
        return { status: users[0] ? "sucess update email = " + email : "fail update email = " + email, payloadToken: req.tokenPayload, router: "Uptate", message: '' }
    }
}

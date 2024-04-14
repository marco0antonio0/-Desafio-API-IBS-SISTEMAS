// create-user.dto.ts

import { IsString, IsIn, IsDateString, Validate, IsOptional, IsNumberString, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';




// declarando a classe UserDto
export class UserDto {
    @ApiProperty({
        description: "Entrada do tipo email('string')",
        example: "yourEmail@test.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "nome do usuario", example: "marco antonio" })
    @IsString()
    nome: string;

    @ApiProperty({
        enum: ['masculino', 'feminino', 'outros'],
        description: "Entradas do tipo enum possiveis : ['masculino', 'feminino', 'outros']",
        example: "masculino"
    })
    @IsIn(['masculino', 'feminino', 'outros'])
    sexo: 'masculino' | 'feminino' | 'outros';

    @ApiProperty({
        description: "Entrada string do tipo date no formato : ano-mes-dia",
        example: "2000-02-24"
    })
    @IsDateString()
    data_nascimento: string;

    @ApiProperty({
        enum: ['solteiro', 'casado', 'divorciado', 'uniao instavel'],
        description: "Entradas possiveis : ['solteiro', 'casado', 'divorciado', 'uniao instavel']",
        example: "solteiro"
    })
    @IsIn(['solteiro', 'casado', 'divorciado', 'uniao instavel'])
    estado_civil: 'solteiro' | 'casado' | 'divorciado' | 'uniao instavel';

    @ApiProperty({
        description: "Entrada do tipo number",
        example: "123"
    })
    @IsNumberString()
    cep: string;

    @ApiProperty({
        description: "Entrada do endereço do usuario",
        example: "lorem,impsum dolor,n456"
    })
    @IsString()
    endereco: string;

    @ApiProperty({
        description: "Entrada do tipo number, numero da residencia do usuario",
        example: "789"
    })
    @IsNumberString()
    numero: string;

    @ApiProperty({
        required: false,
        description: "Entrada do tipo string , campo Opcional",
        example: "bloco 4 apto 89"
    })
    @IsString()
    @IsOptional()
    complemento?: string;

    @ApiProperty({ description: "Entrada string, bairro do usuario", example: "br1" })
    @IsString()
    bairro: string;

    @ApiProperty({ description: "Entrada string, estado do usuario", example: "PA" })
    @IsString()
    estado: string;

    @ApiProperty({ description: "Entrada string, cidade do usuario", example: "Ananindeua" })
    @IsString()
    cidade: string;
}

export class UserUpdateDTO extends PartialType(UserDto) {
    @ApiProperty({
        description: "Entrada opcional, id referente ao usuario",
        example: "123"
    })
    @IsOptional()
    @IsNumberString()
    id: string | '';
}

export class UserDtoByEmail {
    @ApiProperty({ description: "Entrada string do tipo email, email referente ao usuario", example: "yourEmail@test.com" })
    @IsEmail()
    email: string;

}
export class UserDtoByID {
    @ApiProperty({
        description: "Entrada opcional, id referente ao usuario",
        example: "123"
    })
    @IsOptional()
    @IsNumberString()
    id: string | '';

}
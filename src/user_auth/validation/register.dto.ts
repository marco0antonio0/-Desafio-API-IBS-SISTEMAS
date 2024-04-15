// create-user.dto.ts

import { IsString, IsStrongPassword, IsNumberString, IsJWT, IsOptional, IsEmail, IsDateString } from 'class-validator';
import { UserAuthDto } from './Auth.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';


// declarando a classe UserDto
export class RegisterAuthDto extends UserAuthDto {

    @IsDateString()
    data_nascimento: string;

    @ApiProperty({
        description: "Entrada do tipo email('string')",
        example: "yourEmail@teste.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Entrada do tipo string",
        example: "your name"
    })
    @IsString()
    nome: string;

    @ApiProperty({
        description: "Entrada do tipo password('string') caracteristicas: [minLength: 3, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 0]",
        example: "1234"
    })
    @IsStrongPassword({ minLength: 3, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 0 })
    senha: string
}


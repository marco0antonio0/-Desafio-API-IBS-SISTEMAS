// create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword, IsNumberString, IsJWT, IsOptional, IsEmail } from 'class-validator';


// declarando a classe UserDto
export class UserAuthDto {
    @ApiProperty({ description: "Entrada do tipo email('string')" })
    @IsEmail()
    email: string;

    @ApiProperty({})
    @IsString()
    nome: string;

    @ApiProperty({ description: "Entrada do tipo password('string') caracteristicas: [minLength: 3, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 0]" })
    @IsStrongPassword({ minLength: 3, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 0 })
    senha: string


}


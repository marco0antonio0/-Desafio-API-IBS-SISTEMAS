// create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';



// declarando a classe UserDto
export class TokenAuthDto {
    @ApiProperty({ description: "Entrada do tipo JWT('string') campo validado pela logica de estruturação JWT" })
    @IsJWT()
    token: string

}


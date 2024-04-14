import { IsString, IsIn, IsStrongPassword, IsDateString, Validate } from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';


// formatando as especificações para data -> formato dd-MM-yyyy
@ValidatorConstraint({ name: 'customDate', async: false })
export class CustomDateValidator implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        // Regex para validar o formato dd-MM-yyyy
        const regex = /^(0[1-9]|[1-2]\d|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;

        // Verifica se o valor corresponde ao formato esperado
        return regex.test(value);
    }

    defaultMessage(args: ValidationArguments) {
        return 'O campo $property deve estar no formato dd-MM-yyyy';
    }
}
import {IsEmail, IsNotEmpty, IsString, IsUUID, Matches, MaxLength, MinLength, NotContains} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateUserRequestDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(48)
    @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
    email!: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(48)
    @NotContains(" ", { message: `Password should not contain whitespace` })
    @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { message: `Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character` })
    password!: string;
}

export class CreateUserResponseDto {
    @IsUUID()
    id!: string; 

	@IsString()
    @IsEmail()
	email!: string;

    static factory(email: string): CreateUserResponseDto {
		const response = new CreateUserResponseDto();
		response.email = email;
		return response;
	}
}
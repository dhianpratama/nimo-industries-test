import {IsEmail, IsNotEmpty, IsString, IsUUID, Matches, MaxLength, MinLength, NotContains} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class LoginRequestDto {
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

export class LoginResponseDto {
	@IsString()
	accessToken!: string;

    static factory(accessToken: string): LoginResponseDto {
		const response = new LoginResponseDto();
		response.accessToken = accessToken;
		return response;
	}
}
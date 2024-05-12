import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @Length(3, 50)
  name: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsString()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsBoolean()
  subscription: boolean;
}

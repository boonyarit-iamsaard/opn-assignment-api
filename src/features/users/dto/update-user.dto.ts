import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @IsBoolean()
  @IsOptional()
  subscription?: boolean;
}

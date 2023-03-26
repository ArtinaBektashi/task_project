import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from '../../../common/decorators/validation.decorator';

export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  slug: string;
}

export class UpdateRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}
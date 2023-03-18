import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUnique } from '../../../common/decorators/validation.decorator';
import { Project } from '../entities/project.entity';
import { Type } from '../enums/type.enum';


export class UpdateProjectDto implements Partial<Project> {
  @IsString()
  @IsOptional()
  @ApiProperty()
  url?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;


  @IsEnum(Type)
  @IsOptional()
  @ApiProperty()
  type?: Type;

}

import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "../enums/status.enum";
import { Type } from "../enums/type.enum";

export class CreateTaskDto{

    @IsString()
    @ApiProperty()
    name:string

    @IsString()
    @ApiProperty()
    description:string

    @IsEnum(Type)
    @ApiProperty()
    type : Type

    @IsEnum(Status)
    @ApiProperty()
    status : Status

  
    @ApiProperty()
    deadline : string
}

export class UpdateTaskDto{

    @IsString()
    @IsOptional()
    @ApiProperty()
    name:string

    @IsString()
    @IsOptional()
    @ApiProperty()
    description:string

    @IsEnum(Type)
    @IsOptional()
    @ApiProperty()
    type : Type

    @IsEnum(Status)
    @IsOptional()
    @ApiProperty()
    status : Status


    @IsOptional()
    @ApiProperty()
    deadline : string
}

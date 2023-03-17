import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { FileType } from "../enums/filetype.enum";

export class CreateReportDto{

    @IsString()
    @ApiProperty()
    name:string

    @IsString()
    @ApiProperty()
    url:string

    @IsEnum(FileType)
    @ApiProperty()
    filetype : FileType

}

export class UpdateReportDto{
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    name:string

    @IsString()
    @IsOptional()
    @ApiProperty()
    url:string

    @IsEnum(FileType)
    @IsOptional()
    @ApiProperty()
    filetype : FileType
}

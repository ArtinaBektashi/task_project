import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { FileType } from "../enums/filetype.enum";


@Entity('report')
export class Report extends AuditEntity{
    @Column({nullable:true})
    name: string

    @Column({nullable: true })
    url:string

    @Column({
        type:'enum',
        default : FileType.PDF,
        enum : FileType
    })
    filetype:FileType

}
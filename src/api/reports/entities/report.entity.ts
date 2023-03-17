import { Project } from "src/api/projects/entities/project.entity";
import { User } from "src/api/user/entities/user.entity";
import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, JoinTable, OneToMany } from "typeorm";
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

    @OneToMany(() => User, (user) => user.reports)
    user : User

    @OneToMany(() => Project, (project) => project.reports)
    project: Project
    
}
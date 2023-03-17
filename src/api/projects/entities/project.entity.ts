import { Report } from "src/api/reports/entities/report.entity";
import { User } from "src/api/user/entities/user.entity";
import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Type } from "../enums/type.enum";

@Entity('project')
export class Project extends AuditEntity{
    
    @Column({nullable: true })
    url:string

    @Column({nullable: true })
    name:string

    @Column({
        type: 'enum',
        default: Type.ECOMMERCE,
        enum: Type,
      })
      type : Type

    @ManyToMany(() => User)
    @JoinTable()
    users : User[]

    @ManyToOne(() => Report, (report) => report.project)
    reports : Report
}

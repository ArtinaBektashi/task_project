import { User } from "src/api/user/entities/user.entity";
import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Type } from "../enums/type.enum";

@Entity('projects')
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
}

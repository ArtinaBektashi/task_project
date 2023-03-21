import { Project } from "src/api/projects/entities/project.entity";
import { User } from "src/api/user/entities/user.entity";
import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Status } from "../enums/status.enum";
import { Type } from "../enums/type.enum";

@Entity('task')
export class Task extends AuditEntity{
    @Column({nullable: true })
    name:string

    @Column({nullable: true })
    description:string

    @Column({ type: 'date' })
    deadline : Date

    @Column({
        type: 'enum',
        default : Type.DEVELOPING,
        enum: Type
    })
    type: Type

    @Column({
        type:'enum',
        default : Status.TODO,
        enum:Status
    })
    status: Status

    @ManyToOne(() => User, (user) => user.tasks)
    user: User

    @ManyToOne(() => Project ,(project) => project.tasks)
    project:Project
}
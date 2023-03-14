import { BaseEntity, Column, Entity } from "typeorm";

@Entity('roles')
export class Roles extends BaseEntity{
    @Column({ nullable: true })
    name: string;

    @Column({type:"integer",default:1 })
    total_permission : number;
}
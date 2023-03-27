import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('settings')
export class Settings{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:true})
    key:string
    
    @Column({nullable:true})
    value:string
}
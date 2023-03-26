import { AuditEntity } from "src/common/db/customBaseEntites/AuditEntity";
import { Column, Entity } from "typeorm";
import { MediaType } from "../enums/media.type";

@Entity('media')
export class Media extends AuditEntity{
    @Column({nullable:true})
    url:string

    @Column({
        type:'enum',
        default : MediaType.FILES,
        enum: MediaType
    })
    type : MediaType
}
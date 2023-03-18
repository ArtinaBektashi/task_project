import { Exclude } from 'class-transformer';
import { Column, JoinTable, ManyToMany, Entity, Index, ManyToOne,  } from 'typeorm';
import { UserGender } from '../enums/userGender.enum';
import { UserRoles } from '../enums/roles.enum';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { UserStatus } from '../enums/userStatus.enum';
import { Report } from 'src/api/reports/entities/report.entity';
import { Project } from 'src/api/projects/entities/project.entity';

@Entity('users')
export class User extends AuditEntity {
  @Column({
    type: 'enum',
    default: UserRoles.ADMIN,
    enum: UserRoles,
  })
  role: UserRoles;
  @Column({ default: false })
  isRoleOverridden: boolean;

  @Column({ type: 'integer', default: 1 })
  permissions: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  hashedRt: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: UserGender,
    default: UserGender.OTHER,
  })
  gender: UserGender;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  timezone: string;
  @Column({ nullable: true })
  birthDate: Date;
  @Column({ nullable: true })
  isVerified: boolean;

  @Column({ type: 'enum', default: UserStatus.ACTIVE, enum: UserStatus })
  status: UserStatus;

  @Column({ nullable: true })
  avatar: string;

  @ManyToOne(() => Report, (report) => report.user)
  reports: Report[]
}

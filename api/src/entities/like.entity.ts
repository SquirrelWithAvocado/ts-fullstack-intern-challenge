import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique
} from "typeorm";
import { User } from "./user.entity";

@Entity()
@Unique(['catId', 'user'])
export class Like {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255, nullable: false })
    catId: string

    @Column({ length: 255, nullable: false })
    imageUrl: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(type => User, { onDelete: "CASCADE" })
    user: User
}
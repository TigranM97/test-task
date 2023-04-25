import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UsersDTO {
    @Column({ type: "varchar" })
    firstName: string

    @Column({ type: "varchar" })
    lastName: string

    @Column()
    age: number

    @Column({ type: "varchar", unique: true, nullable: false })
    email: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column({ nullable: true })
    @UpdateDateColumn()
    updatedAt: Date

    @Column({ nullable: true })
    @DeleteDateColumn()
    deletedAt: Date
}
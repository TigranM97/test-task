import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('friends')
export class Friends{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'int'})
    user1id: number

    @Column({type: 'int'})
    user2id: number

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
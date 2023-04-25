import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('friend-request')
export class FriendRequest{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'int'})
    userFromId: number

    @Column({type: 'int'})
    userToId: number
    
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
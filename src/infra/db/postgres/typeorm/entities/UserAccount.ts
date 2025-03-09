import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class UserAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;
}

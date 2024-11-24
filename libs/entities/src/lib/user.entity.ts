import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', nullable: false, unique: true })
	email!: string;

	@Column({ type: 'varchar', nullable: false })
	password!: string;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
	updatedAt!: Date;

	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
	deletedAt!: Date;
}

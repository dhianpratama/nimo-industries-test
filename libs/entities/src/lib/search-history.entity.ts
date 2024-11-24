import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'search_histories' })
export class SearchHistoryEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne(() => UserEntity, { nullable: true })
	@JoinColumn({ name: 'user_id' })
	user?: UserEntity;

  	@Column({ type: 'uuid', name: 'user_id', nullable: true })
  	userId?: string;

    @Column({ type: 'varchar' })
    searchQuery?: string;

    @Column({ type: 'float' })
    result?: number;

	@Column({ name: 'status', type: 'varchar', nullable: true})
	status!: string;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
	updatedAt!: Date;

	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
	deletedAt!: Date;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'food' })
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: null, nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  status: Boolean;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column("timestamp", { nullable: true, default: () => null })
  updated_at: Date;
}

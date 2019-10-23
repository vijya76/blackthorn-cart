import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  public category_id: string

  @Column({ type: 'varchar' })
  public name: string

  @Column({ type: 'double precision', default: 0.0 })
  public taxes: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

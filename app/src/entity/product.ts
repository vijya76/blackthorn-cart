import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public product_id: string

  @Column({ type: 'varchar' })
  public name: string

  @Column({ type: 'double precision', default: 10.0 })
  public cost: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

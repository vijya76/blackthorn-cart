import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public order_id: string

  @Column({ type: 'uuid' })
  public cart_id: string

  @Column({ type: 'double precision', default: 0.0 })
  public subtotal: number

  @Column({ type: 'double precision', default: 0.0 })
  public total: number

  @Column({ type: 'double precision', default: 0.0 })
  public discounts: number

  @Column({ type: 'double precision', default: 0.0 })
  public tax: number

  @Column({ type: 'jsonb' })
  items: object;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

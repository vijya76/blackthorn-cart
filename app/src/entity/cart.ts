import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'

import { Item } from './item'

@Entity({ name: 'cart' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  public cart_id: string

  @Column({ type: 'double precision', default: 0.0 })
  public subtotal: number

  @Column({ type: 'double precision', default: 0.0 })
  public total: number

  @Column({ type: 'double precision', default: 0.0 })
  public discounts: number

  @Column({ type: 'double precision', default: 0.0 })
  public tax: number

  @ManyToMany(type => Item)
  @JoinTable()
  items: Item[];

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

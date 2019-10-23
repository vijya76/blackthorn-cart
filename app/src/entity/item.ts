import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'

import { Category } from './category'
@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn('uuid')
  public item_id: string

  @Column({ type: 'varchar' })
  public name: string

  @Column({ type: 'double precision', default: 10.0 })
  public price: number

  @Column({ type: 'double precision', default: 0.0 })
  public tax: number

  @Column({ type: 'double precision', default: 0.0 })
  public discount: number

  @Column({ type: 'double precision', default: 1.0 })
  public quantity: number

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

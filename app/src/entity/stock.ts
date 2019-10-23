import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm'

import { Item } from './item'

@Entity({ name: 'stock' })
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  public stock_id: string

  @Column({ type: 'double precision', default: 10.0 })
  public count: number

  @OneToOne(type => Item)
  @JoinColumn()
  item: Item;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

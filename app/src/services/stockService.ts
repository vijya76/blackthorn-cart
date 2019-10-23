import { getManager } from 'typeorm'
import { Stock } from '../entity/stock'

export class StockService {
  getAllStocks () {
    // get stock repository and find all stocks
    return getManager().getRepository(Stock).find()
  }

  saveStock (stock: Stock) {
    return getManager().getRepository(Stock).save(stock)
  }

  deleteStock (stock: Stock) {
    return getManager().getRepository(Stock).remove(stock)
  }

  getStockById (stockId: number) {
    return getManager().getRepository(Stock).findOne(stockId)
  }
}

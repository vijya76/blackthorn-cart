import { getManager } from 'typeorm'
import { Orders } from '../entity/orders'
import { Cart } from '../entity/cart'
import { StockService } from './stockService'
import { CartService } from './cartService'

export class OrderService {
  async getAllOrders (pageno: number) {
    // get order repository and find all orders
    const order = await getManager().getRepository(Orders).find({ skip: (pageno - 1) * 5, take: 5 })
    return order
  }

  deleteOrder (order: Orders) {
    return getManager().getRepository(Orders).remove(order)
  }

  async getOrderById (orderId: number) {
    const order = await getManager().getRepository(Orders).findOne(orderId)
    return order
  }

  async getOrderByCartId (cartId: number) {
    const order = await getManager().getRepository(Orders).findOne(cartId)
    return order
  }

  async createOrder (cart: Cart) {
    await getManager().transaction(async entityManager => {
      let stockService = new StockService()
      let order = new Orders()
      // for (const item of order.items) {
      //   let stocks = await stockService.getStockByItem(item.item_id)
      //   let stock = stocks[0]
      //   if (stock.count! >= item.quantity) {
      //     return
      //   }
      // };
      order.cart_id = cart.cart_id
      order.tax = cart.tax
      order.discounts = cart.discounts
      order.total = cart.total
      order.subtotal = cart.subtotal
      order.items = cart.items

      cart.items = []
      cart.total = 0
      cart.subtotal = 0
      cart.tax = 0
      cart.discounts = 0
      console.log('cart :                  ', cart)
      entityManager.save(cart)
      for (const item of order.items) {
        let stocks = await stockService.getStockByItem(item.item_id)
        let stock = stocks[0]
        stock.count -= item.quantity
        console.log('stock :                  ', stock)
        entityManager.save(stock)
      };
      console.log('order :                  ', order)
      entityManager.save(order)
    })
  }
}

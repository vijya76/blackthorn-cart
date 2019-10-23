import { getManager } from 'typeorm'
import { Cart } from '../entity/cart'
import { Item } from 'src/entity/item'

export class CartService {
  getAllCarts () {
    // get cart repository and find all carts
    return getManager().getRepository(Cart).find()
  }

  saveCart (cart: Cart) {
    return getManager().getRepository(Cart).save(cart)
  }

  deleteCart (cart: Cart) {
    return getManager().getRepository(Cart).remove(cart)
  }

  getCartById (cartId: number) {
    return getManager().getRepository(Cart).findOne(cartId)
  }

  addItem (cart: Cart, item: Item) {
    let items = cart.items
    let itemIndex = items.findIndex(obj => obj.item_id === item.item_id)
    if (itemIndex != -1) {
      items[itemIndex].quantity += 1
    } else {
      items.push(item)
    }
    cart.items = items
    return cart
  }

  removeItem (cart: Cart, item: Item) {
    let items = cart.items
    let itemIndex = items.findIndex(obj => obj.item_id === item.item_id)
    if (itemIndex != -1) {
      items[itemIndex].quantity += 1
    } else {
      items.push(item)
    }
    cart.items = items
    return cart
  }

  updateCart (cart: Cart) {
    cart = this.calculateSubTotal(cart)
    cart = this.calculateDiscounts(cart)
    cart = this.calculateTotal(cart)
    return cart
  }
  calculateTotal (cart: Cart) {
    cart.total = (cart.subtotal - cart.discounts) + cart.subtotal * cart.tax * 0.01
    return cart
  }

  calculateDiscounts (cart: Cart) {
    let items = cart.items
    items.forEach(item => {
      cart.discounts += item.price * item.discount * 0.01
    })
    return cart
  }

  calculateSubTotal (cart: Cart) {
    let items = cart.items
    items.forEach(item => {
      cart.subtotal += item.price
    })
    return cart
  }
}

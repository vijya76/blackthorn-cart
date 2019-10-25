import { getManager } from 'typeorm'
import { Cart } from '../entity/cart'
import { Item } from 'src/entity/item'

export class CartService {
  async getAllCarts (pageno: number) {
    // get cart repository and find all carts
    const cart = await getManager().getRepository(Cart).find({ skip: (pageno - 1) * 5, take: 5 })
    for (var k in cart) {
      cart[k].items = await getManager()
        .createQueryBuilder()
        .cache(180)
        .relation(Cart, 'items')
        .of(cart[k]) // you can use just cart id as well
        .loadMany()
    }
    return cart
  }

  saveCart (cart: Cart) {
    return getManager().getRepository(Cart).save(cart)
  }

  deleteCart (cart: Cart) {
    return getManager().getRepository(Cart).remove(cart)
  }

  async getCartById (cartId: number) {
    const cart = await getManager().getRepository(Cart).findOne(cartId)
    cart.items = await getManager()
      .createQueryBuilder()
      .cache(180)
      .relation(Cart, 'items')
      .of(cart) // you can use just cart id as well
      .loadMany()
    return cart
  }

  addItem (cart: Cart, item: Item) {
    let items = cart.items
    let itemIndex = items.findIndex(obj => obj.item_id == item.item_id)
    if (itemIndex != -1) {
      console.log('adding')
      items[itemIndex].quantity += 1
    } else {
      items.push(item)
    }
    cart.items = items
    console.log('cart.items : ', cart.items)
    return cart
  }

  removeItem (cart: Cart, item: Item) {
    let items = cart.items
    let itemIndex = items.findIndex(obj => obj.item_id === item.item_id)
    if (itemIndex != -1) {
      if (items[itemIndex].quantity > 1) {
        items[itemIndex].quantity -= 1
      } else {
        items.splice(itemIndex, 1)
      }
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
    cart.total = (cart.subtotal - cart.discounts) + cart.tax
    return cart
  }

  calculateDiscounts (cart: Cart) {
    let items = cart.items
    items.forEach(item => {
      cart.discounts += (item.price * item.discount * 0.01) * item.quantity
    })
    return cart
  }

  calculateTaxes (cart: Cart) {
    let items = cart.items
    items.forEach(item => {
      cart.tax += (item.price * item.tax * 0.01) * item.quantity
    })
    return cart
  }

  calculateSubTotal (cart: Cart) {
    let items = cart.items
    items.forEach(item => {
      cart.subtotal += item.price * item.quantity
    })
    return cart
  }
}

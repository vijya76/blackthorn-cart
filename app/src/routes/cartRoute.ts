import * as CartController from '../controllers/cartController'

const express = require('express')

export const initCartRoutes = () => {
  const cartRouter = express.Router()

  // post /create
  cartRouter.post('/', CartController.saveCart
  )

  // post /additem
  cartRouter.post('/addItem/', CartController.addItem
  )

  // post /removeitem
  cartRouter.post('/removeItem/', CartController.removeItem
  )

  // GET
  cartRouter.get('/:cart_id', CartController.fetchCart
  )

  // PUT
  cartRouter.put('/', CartController.saveCart
  )

  // DELETE
  cartRouter.delete('/', CartController.deleteCart
  )

  // GET
  cartRouter.get('/', CartController.fetchCart
  )

  return cartRouter
}

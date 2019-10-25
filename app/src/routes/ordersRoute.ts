import * as OrderController from '../controllers/ordersController'

const express = require('express')

export const initOrdersRoutes = () => {
  const orderRouter = express.Router()

  // post /create
  orderRouter.post('/', OrderController.saveOrder
  )

  // GET
  orderRouter.get('/:order_id', OrderController.fetchOrder
  )

  // DELETE
  orderRouter.delete('/', OrderController.deleteOrder
  )

  // GET
  orderRouter.get('/', OrderController.fetchOrder
  )

  return orderRouter
}

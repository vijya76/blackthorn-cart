import { OrderService } from '../services/ordersService'
import { Request, Response } from 'express'
import { BaseResponse } from '../base-response'
import { CartService } from '../services/cartService'
import { Cart } from '../entity/cart'

/**
 * POST /
 * Save order.
 */
export let saveOrder = async (req: Request, res: Response) => {
  let orderRepo = new OrderService()
  let cartRepo = new CartService()
  let cartEntity: Cart = new Cart()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    cartEntity = await cartRepo.getCartById(req.body.cart_id)
    let result = await orderRepo.createOrder(cartEntity)

    baseResponse.isSuccess = true
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = e
  }
  res.send(baseResponse)
}

/**
 * GET /
 * Fetch order.
 */
export let fetchOrder = async (req: Request, res: Response) => {
  let orderRepo = new OrderService()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    let result
    console.log('here')
    if (req.params.order_id != undefined) {
      console.log('here1')
      result = await orderRepo.getOrderById(req.params.order_id)
    } else {
      console.log('here2')
      result = await orderRepo.getAllOrders(req.query.page)
    }
    console.log('result :    ', result)
    baseResponse.isSuccess = true
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = e
  }
  res.send(baseResponse)
}

/**
 * Delete /
 * Delete order.
 */
export let deleteOrder = async (req: Request, res: Response) => {
  let orderRepo = new OrderService()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    let result = await orderRepo.deleteOrder(req.body)

    baseResponse.isSuccess = true
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = e
  }
  res.send(baseResponse)
}

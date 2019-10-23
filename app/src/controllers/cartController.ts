import { CartService } from '../services/cartService'
import { Request, Response } from 'express'
import { BaseResponse } from '../base-response'
import { Cart } from '../entity/cart'

/**
 * POST /
 * Save cart.
 */
export let saveCart = async (req: Request, res: Response) => {
  let cartRepo = new CartService()
  let cartEntity: Cart = new Cart()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    cartEntity.cart_id = req.body.cart_id
    let result = await cartRepo.saveCart(cartEntity)

    baseResponse.isSuccess = true
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = JSON.stringify(e)
  }
  res.send(baseResponse)
}

/**
 * POST /
 * Add Item.
 */
export let addItem = async (req: Request, res: Response) => {
  let cartRepo = new CartService()
  let cartEntity: Cart = new Cart()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    cartEntity = await cartRepo.getCartById(req.body.cart_id)
    cartRepo.addItem(cartEntity, req.body.item)
    cartEntity = cartRepo.updateCart(cartEntity)
    let result = await cartRepo.saveCart(cartEntity)
    baseResponse.isSuccess = true
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = JSON.stringify(e)
  }
  res.send(baseResponse)
}

/**
 * POST /
 * Add Item.
 */
export let removeItem = async (req: Request, res: Response) => {
  let cartRepo = new CartService()
  let cartEntity: Cart = new Cart()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    cartEntity = await cartRepo.getCartById(req.body.cart_id)
    cartRepo.removeItem(cartEntity, req.body.item)
    cartEntity = cartRepo.updateCart(cartEntity)
    let result = await cartRepo.saveCart(cartEntity)
    baseResponse.isSuccess = true
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = JSON.stringify(e)
  }
  res.send(baseResponse)
}

/**
 * GET /
 * Fetch cart.
 */
export let fetchCart = async (req: Request, res: Response) => {
  let cartRepo = new CartService()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    let result
    if (req.params.cart_id != undefined) {
      result = await cartRepo.getCartById(req.params.cart_id)
    } else {
      result = await cartRepo.getAllCarts(req.query.page)
    }

    baseResponse.isSuccess = true
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = JSON.stringify(e)
  }
  res.send(baseResponse)
}

/**
 * Delete /
 * Delete cart.
 */
export let deleteCart = async (req: Request, res: Response) => {
  let cartRepo = new CartService()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    let result = await cartRepo.deleteCart(req.body)

    baseResponse.isSuccess = true
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = JSON.stringify(e)
  }
  res.send(baseResponse)
}

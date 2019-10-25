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
    baseResponse.response = e
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
    if (cartEntity != undefined) {
      if (req.body.item == undefined) {
        baseResponse.responseCode = 400
        baseResponse.message = 'invalid item'
      } else {
        cartRepo.addItem(cartEntity, req.body.item)
        cartEntity = cartRepo.updateCart(cartEntity)
        baseResponse.response = await cartRepo.saveCart(cartEntity)
        baseResponse.isSuccess = true
        baseResponse.responseCode = 200
      }
    } else {
      baseResponse.isSuccess = false
      baseResponse.responseCode = 400
      baseResponse.message = 'invalid cart id'
    }
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = e
  }
  res.send(baseResponse.responseCode, baseResponse)
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
    if (cartEntity != undefined) {
      if (req.body.item == undefined) {
        baseResponse.responseCode = 400
        baseResponse.message = 'invalid item'
      } else {
        cartRepo.removeItem(cartEntity, req.body.item)
        cartEntity = cartRepo.updateCart(cartEntity)
        baseResponse.response = await cartRepo.saveCart(cartEntity)
        baseResponse.responseCode = 200
      }
    } else {
      baseResponse.isSuccess = false
      baseResponse.responseCode = 400
      baseResponse.message = 'invalid cart id'
    }
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = e
  }
  res.send(baseResponse.responseCode, baseResponse)
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

    if (result.length > 0) {
      baseResponse.responseCode = 200
      baseResponse.isSuccess = true
      baseResponse.response = result
    } else {
      baseResponse.responseCode = 400
      baseResponse.isSuccess = false
      baseResponse.response = result
      baseResponse.message = 'No cart found'
    }
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = e
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
    baseResponse.response = e
  }
  res.send(baseResponse)
}

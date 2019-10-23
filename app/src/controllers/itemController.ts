import { ItemService } from '../services/itemService'
import { Request, Response } from 'express'
import { BaseResponse } from '../base-response'
import { Item } from '../entity/item'
import { StockService } from '../services/stockService'
import { Stock } from '../entity/stock'

/**
 * POST /
 * Save item.
 */
export let saveItem = async (req: Request, res: Response) => {
  let itemRepo = new ItemService()
  let stockRepo = new StockService()
  let itemEntity: Item = new Item()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    itemEntity.name = req.body.name
    itemEntity.price = req.body.price
    itemEntity.categories = req.body.categories
    let result = await itemRepo.saveItem(itemEntity)
    let stock = new Stock()
    stock.item = result
    stock.count = req.body.stock
    stockRepo.saveStock(stock)

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
 * Fetch item.
 */
export let fetchItem = async (req: Request, res: Response) => {
  let itemRepo = new ItemService()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    let result
    if (req.params.item_id != undefined) {
      result = await itemRepo.getItemById(req.params.item_id)
    } else {
      result = await itemRepo.getAllItems()
      // for (var k in result) {
      //   let item = new Item()
      //   item.item_id = result[k].item_id
      //   itemRepo.deleteItem(item)
      // }
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
 * Delete item.
 */
export let deleteItem = async (req: Request, res: Response) => {
  let itemRepo = new ItemService()
  let stockRepo = new StockService()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    let result
    // if (req.params.item_id != undefined) {
    result = await itemRepo.deleteItem(req.body)
    // }
    let stock = new Stock()
    stock.item = req.body
    stockRepo.deleteStock(stock)

    baseResponse.isSuccess = true
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = JSON.stringify(e)
  }
  res.send(baseResponse)
}

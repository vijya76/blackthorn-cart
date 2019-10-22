import { ProductService } from '../services/productService'
import { Request, Response } from 'express'
import { BaseResponse } from '../base-response'
import Product from '../entity/product'

/**
 * POST /
 * Save Product.
 */
export let createProduct = async (req: Request, res: Response) => {
  let productRepo = new ProductService()
  let productEntity: Product = new Product()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    productEntity.name = req.body.name
    productEntity.cost = req.body.cost
    let result = await productRepo.saveProduct(productEntity)
    console.log(result)
    baseResponse.isSuccess = true
    baseResponse.response = JSON.stringify(result)
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = JSON.stringify(e)
  }
  res.send(baseResponse)
}

/**
 * GET /
 * Fetch Product.
 */
export let fetchProduct = async (req: Request, res: Response) => {
  let productRepo = new ProductService()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    let result
    if (req.params.product_id != undefined) {
      result = await productRepo.getProductById(req.params.product_id)
    } else {
      result = await productRepo.getAllProducts()
    }

    console.log(result)
    baseResponse.isSuccess = true
    baseResponse.response = JSON.stringify(result)
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = JSON.stringify(e)
  }
  res.send(baseResponse)
}

/**
 * PUT /
 * Update Product.
 */
export let updateProduct = async (req: Request, res: Response) => {
  let productRepo = new ProductService()
  let productEntity: Product = new Product()
  let baseResponse: BaseResponse = new BaseResponse()

  // try {
  //   productEntity = await productRepo.getProductById(req.body.id)
  //   productEntity.name = req.body.name
  //   productEntity.cost = req.body.cost
  //   let result = await productRepo.saveProduct(productEntity)
  //   console.log(result)
  //   baseResponse.isSuccess = true
  //   baseResponse.response = JSON.stringify('success')
  // } catch (e) {
  //   baseResponse.isSuccess = false
  //   baseResponse.response = JSON.stringify(e)
  // }
  res.send(baseResponse)
}

/**
 * Delete /
 * Delete Product.
 */
export let deleteProduct = async (req: Request, res: Response) => {
  let productRepo = new ProductService()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    let result
    if (req.params.product_id != undefined) {
      result = await productRepo.deleteProduct(req.body)
    }

    console.log(result)
    baseResponse.isSuccess = true
    baseResponse.response = JSON.stringify(result)
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = JSON.stringify(e)
  }
  res.send(baseResponse)
}

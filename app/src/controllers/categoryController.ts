import { CategoryService } from '../services/categoryService'
import { Request, Response } from 'express'
import { BaseResponse } from '../base-response'
import { Category } from '../entity/category'

/**
 * POST /
 * Save category.
 */
export let saveCategory = async (req: Request, res: Response) => {
  let categoryRepo = new CategoryService()
  let categoryEntity: Category = new Category()
  let baseResponse: BaseResponse = new BaseResponse()
  try {
    categoryEntity.category_id = req.body.category_id

    if (req.body.name != undefined) {
      categoryEntity.name = req.body.name
      if (req.body.taxes != undefined) {
        categoryEntity.taxes = req.body.taxes
        baseResponse.response = await categoryRepo.saveCategory(categoryEntity)
        baseResponse.responseCode = 200
      } else {
        baseResponse.responseCode = 400
        baseResponse.message = 'Enter valid name'
      }
    } else {
      baseResponse.responseCode = 400
      baseResponse.message = 'Enter valid name'
    }

    baseResponse.isSuccess = true
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = e
  }
  res.send(baseResponse.responseCode, baseResponse)
}

/**
 * GET /
 * Fetch category.
 */
export let fetchCategory = async (req: Request, res: Response) => {
  let categoryRepo = new CategoryService()
  let baseResponse: BaseResponse = new BaseResponse()
  let result, responseCode
  try {
    baseResponse.isSuccess = true
    if (req.params.category_id != undefined) {
      result = await categoryRepo.getCategoryById(req.params.category_id)
      if (result.length <= 0) {
        responseCode = 400
        baseResponse.isSuccess = false
      } else {
        responseCode = 200
      }
    } else {
      result = await categoryRepo.getAllCategorys()
      responseCode = 200
    }
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = e
    responseCode = 400
  }
  res.send(responseCode, baseResponse)
}

/**
 * Delete /
 * Delete category.
 */
export let deleteCategory = async (req: Request, res: Response) => {
  let categoryRepo = new CategoryService()
  let baseResponse: BaseResponse = new BaseResponse()
  let result, responseCode
  baseResponse.isSuccess = true
  try {
    if (req.body.category_id != undefined) {
      result = await categoryRepo.deleteCategory(req.body)
      responseCode = 200
    } else {
      responseCode = 400
      baseResponse.isSuccess = false
    }

    baseResponse.response = result
  } catch (e) {
    responseCode = 400
    baseResponse.isSuccess = false
    baseResponse.response = e
  }
  res.send(responseCode, baseResponse)
}

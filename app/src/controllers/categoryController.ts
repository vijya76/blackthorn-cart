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
    categoryEntity.name = req.body.name
    categoryEntity.taxes = req.body.taxes
    let result = await categoryRepo.saveCategory(categoryEntity)

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
 * Fetch category.
 */
export let fetchCategory = async (req: Request, res: Response) => {
  let categoryRepo = new CategoryService()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    let result
    if (req.params.category_id != undefined) {
      result = await categoryRepo.getCategoryById(req.params.category_id)
    } else {
      result = await categoryRepo.getAllCategorys()
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
 * Delete category.
 */
export let deleteCategory = async (req: Request, res: Response) => {
  let categoryRepo = new CategoryService()
  let baseResponse: BaseResponse = new BaseResponse()

  try {
    let result
    // if (req.params.category_id != undefined) {
    result = await categoryRepo.deleteCategory(req.body)
    // }

    baseResponse.isSuccess = true
    baseResponse.response = result
  } catch (e) {
    baseResponse.isSuccess = false
    baseResponse.response = JSON.stringify(e)
  }
  res.send(baseResponse)
}

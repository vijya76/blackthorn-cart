import * as CategoryController from '../controllers/categoryController'

const express = require('express')

export const initCategoryRoutes = () => {
  const categoryRouter = express.Router()

  // post /create
  categoryRouter.post('/', CategoryController.saveCategory
  )

  // GET /deploy
  categoryRouter.get('/:category_id', CategoryController.fetchCategory
  )

  // PUT /deploy
  categoryRouter.put('/', CategoryController.saveCategory
  )

  // DELETE /deploy
  categoryRouter.delete('/', CategoryController.deleteCategory
  )

  // GET /deploy
  categoryRouter.get('/', CategoryController.fetchCategory
  )

  return categoryRouter
}

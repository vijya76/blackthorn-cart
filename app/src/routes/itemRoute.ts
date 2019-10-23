import * as ItemController from '../controllers/itemController'

const express = require('express')

export const initItemRoutes = () => {
  const itemRouter = express.Router()

  // post /create
  itemRouter.post('/', ItemController.saveItem
  )

  // GET /deploy
  itemRouter.get('/:item_id', ItemController.fetchItem
  )

  // PUT /deploy
  itemRouter.put('/', ItemController.saveItem
  )

  // DELETE /deploy
  itemRouter.delete('/', ItemController.deleteItem
  )

  // GET /deploy
  itemRouter.get('/', ItemController.fetchItem

  )

  return itemRouter
}

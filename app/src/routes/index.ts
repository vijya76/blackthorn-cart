import { initItemRoutes } from './itemRoute'
import { initCategoryRoutes } from './categoryRoute'
import { Request, Response } from 'express'

const initRoutes = async (app) => {
  app.use('/item', initItemRoutes())
  app.use('/category', initCategoryRoutes())

  app.get('/error', (req: Request, res: Response) => {
    res.render('error')
  })
}

export default initRoutes

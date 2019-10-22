import initProductRoutes from './productRoute'

const initRoutes = async (app) => {
  app.use('/product', initProductRoutes())

  app.get('/error', (req, res) => {
    res.render('error')
  })
}

export default initRoutes

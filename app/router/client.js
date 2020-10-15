module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.client.home.index)
  router.get('/blog/list', controller.client.home.list)
  router.get('/blog/selectArticleById/:id', controller.client.home.selectArticleById)
  router.get('/blog/images/advImages', controller.client.home.getAdvImages)
  router.get('/blog/getTypeInfo', controller.client.home.getTypeInfo)
  router.get('/blog/getListByList/:id', controller.client.home.getListByList)
}
// var router = require('koa-router')();
import Router from 'koa-router'
import Api from '../controllers'

const router = Router()

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: '数据库增删查改操作'
  };
  await ctx.render('index', {});
})

router.get('/foo', async function (ctx, next) {
  await ctx.render('index', {
    title: 'koa2 foo'
  });
});

/**********接口请求**********/

//获取所有user
router.get('/api/getAll', Api.getAll)
//新增一个user
router.post('/api/add', Api.add)
//修改一个user
router.post('/api/update', Api.update)
//查找一个user
router.get('/api/search', Api.search)
//删除最后一个user
router.get('/api/delete', Api.del)

export default router;

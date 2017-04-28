// var router = require('koa-router')();
import Router from 'koa-router'
import UserModel from '../models/user'
const router = Router()

router.get('/login', async function (ctx, next) {
  await ctx.render('login', {
    title: '注册'
  });
})

router.post('/login/register', async function (ctx, next) {
  const reqData = ctx.request.body;
  const res = await UserModel.create(reqData);
  if (res) {
    ctx.body = {
      success: true,
      data: res,
      message: '新增记录成功'
    }
  }
})

export default router;

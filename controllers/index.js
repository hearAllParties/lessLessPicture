import UserModel from '../models/user'

const getAll = async(ctx, next) => {
  // console.log(ctx.request.query, ctx.request.body)
  const users = await UserModel.find({});
  ctx.body = {
    success: true,
    data: users || {},
    message: '获取记录成功'
  }

  //调用静态方法 功能同上
  // UsersModel.fetch(function(err, users) {
  //     if (err) {
  //         console.log(err)
  //     }
  //     ctx.body = {
  //         success: true,
  //         users: users
  //     }
  // })
}

const add = async(ctx, next) => {
  const reqData = ctx.request.body;
  const res = await UserModel.create(reqData);
  if (res) {
    ctx.body = {
      success: true,
      data: res,
      message: '新增记录成功'
    }
  }
}

const update = async(ctx, next) => {
  const reqData = ctx.request.body;
  // await UserModel.update({name: reqData.name}, {age: 25}, function(err, item){
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log('更新数据成功', item); //{ n: 1, nModified: 1, ok: 1 }
  //   }
  // });

  const filterData = await UserModel.findOne({
    name: reqData.name
  });
  filterData.age = reqData.age;
  const res = await filterData.save();
  if (res) {
    ctx.body = {
      success: true,
      data: res,
      message: '更新记录成功'
    }
  }
}

const search = async(ctx, next) => {
  const reqData = ctx.request.query;
  const res = await UserModel.find({
    age: reqData.age
  });
  if (res.length) {
    ctx.body = {
      success: true,
      data: res,
      message: '查找记录成功'
    }
  } else {
    ctx.body = {
      success: true,
      data: res,
      message: '暂无记录'
    }
  }
}

const del = async(ctx, next) => {
  const lastData = await UserModel.find().sort({_id: -1}).findOne();
  if (lastData) {
    const res = await lastData.remove();
    ctx.body = {
      success: true,
      data: res,
      message: '删除记录成功'
    }
  } else {
    ctx.body = {
      success: false,
      data: {},
      message: '暂无记录，删除失败'
    }
  }
}

export default {
  getAll,
  add,
  update,
  search,
  del
}

import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from 'koa-cors'
import convert from "koa-convert"
// import session from 'koa2-cookie-session'
import session from 'koa-session-redis'

import index from './routes/index'
import login from './routes/login'
import users from './routes/users'
import mongoose from 'mongoose'
import config from './config'

const app = new Koa();

/****   mongodb   ****/
// mongoose.Promise = global.Promise;
// mongoose.connect(config.mongoUrl, {
//   auth: {
//     authdb: 'admin'
//   }
// }, function(err) {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log('mongodb 连接成功')
//   }
// });
// const db = mongoose.connection;
// db.on('error',console.error.bind(console,'mongodb 连接错误:'));
// db.once('open', function() {
//   console.log('mongodb 连接成功')
// });

// error handler
onerror(app);

// middlewares
app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(convert(cors()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  map: {
    html: 'lodash'
  }
}));

app.keys = ['lesslesspricture'] // 设置cookie秘钥

app.use(session({
    store: {
        host: '127.0.0.1',
        port: 6379,
        ttl: 60 * 60,
        options: {
            auth_pass: 'eugene',
        },
        db: 0
    }
}));

app.use(async (ctx, next) => {
    ctx.cookies.set(
        'token',
        'hello world',
        {
            domain: 'localhost',  // 写cookie所在的域名
            path: '/',       // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date('2017-09-15'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
            overwrite: false  // 是否允许重写
        }
    )
    await next()
});
// app.use(ctx => {
//     ctx.session.user = {
//         name: "myname"
//     };
//     // ctx.body = ctx.session;
// });


// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// routes
app.use(index.routes(), index.allowedMethods());
app.use(login.routes(), login.allowedMethods());
app.use(users.routes(), users.allowedMethods());

module.exports = app;

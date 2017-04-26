// const Koa = require('koa');
// const views = require('koa-views');
// const json = require('koa-json');
// const onerror = require('koa-onerror');
// const bodyparser = require('koa-bodyparser')();
// const logger = require('koa-logger');
// const index = require('./routes/index');
// const users = require('./routes/users');
import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
// import models from './models'
import index from './routes/index'
import users from './routes/users'
import mongoose from 'mongoose'
import config from './config'

const app = new Koa();

/****   mongodb   ****/
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'mongodb 连接错误:'));
db.once('open', function() {
  console.log('mongodb 连接成功')
});

// error handler
onerror(app);

// middlewares
app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  map: {
    html: 'lodash'
  }
}));

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

module.exports = app;

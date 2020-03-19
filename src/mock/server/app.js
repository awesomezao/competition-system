
const Koa=require('koa')
const Router = require('koa-router')
const mockRouter=require('./router')
const bodyParser = require('koa-bodyparser')
const koaBody=require('koa-body')

const app = new Koa();
app.use(koaBody({
  multipart:true
}))
app.use(bodyParser({ multipart: true }));
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length,Authorization,Accept,X-Requested-With'
  );
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  ctx.method === 'OPTIONS' ? (ctx.body = 200) : await next();
});
app.use(mockRouter.routes()).use(mockRouter.allowedMethods());


app.listen(3001, () => {
  console.log('mock server is running at http://localhost:3001');
});

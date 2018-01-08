const Koa = require('koa')
const app = new Koa()
const session = require('koa-session');
const Tree = require('./components/tree/tree.js')


app.use(ctx => {
  ctx.body = {}
})

app.listen(3000)

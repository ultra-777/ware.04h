const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const send = require('koa-send');
const configureRoutes = require('./api');
const REST_PREFIX = /api\/.+/;
const port = 32001;

const app = new Koa();
const router = new Router();

app.use(cors());

app.use(bodyParser());

configureRoutes(router);

app
	.use(router.routes())
	.use(router.allowedMethods());

app.use(async (ctx, next) => {
	try {
		const {
			request: {
				url
			}
		} = ctx;

		if (url.match(REST_PREFIX)) {
			await next();
		}
		else {
			switch (url) {
				case '/':
				case '/auth':
				case '/fund':
				case '/result':
					await send(ctx, 'index.html', {root: '../public'});
					break;
				default:
					await send(ctx, ctx.path, {root: '../public'});
					break;
			}
		}
}
catch (err) {
	console.log(err);
	ctx.status = 500;
	ctx.body = "Internal Server Error";
}
});

app.listen(port);

console.log(`server is listening on port: ${port}`);

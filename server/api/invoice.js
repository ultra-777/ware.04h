const BASE_INVOICE = 80;
const DEVIATION = 40;

module.exports = ctx => {
	ctx.body = Math.round(BASE_INVOICE + Math.random() * DEVIATION);
};

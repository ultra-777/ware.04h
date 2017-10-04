const BASE_BALANCE = 80;
const DEVIATION = 40;

module.exports = ctx => {

	let balance = Math.round(BASE_BALANCE + Math.random() * DEVIATION);

	ctx.body = balance;
};

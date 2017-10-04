const MASKED_PHONE_EXPRESSION = /\d{11}$/;
const ACCOUNT_PASSWORD = 'password';

module.exports = ctx => {

	const {
		request: {
			body: {
				phone,
				password
			}
		}
	} = ctx;

	let match = (phone || '').match(MASKED_PHONE_EXPRESSION);

	let succeeded =
		!!match &&
		(password === ACCOUNT_PASSWORD);

	ctx.status = /*succeeded ?*/ 200 /*: 401*/;
	ctx.body = succeeded ? '' : `Authentication failed for phone/password: ${phone}/${password}`;
};

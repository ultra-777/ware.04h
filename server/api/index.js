const auth = require('./auth');
const balance = require('./balance');
const invoice = require('./invoice');
const action = require('./action');

const API_PREFIX = '/api/v1/';

module.exports = (router) => {
  router
    .post(`${API_PREFIX}login/`, auth)
    .get(`${API_PREFIX}balance/`, balance)
	  .get(`${API_PREFIX}invoice/`, invoice)
	  .post(`${API_PREFIX}pay/`, action)
	  .post(`${API_PREFIX}cancel/`, action)
};

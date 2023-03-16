const au = require('./auth');
const us = require('./user');
const categoriesController = require('./categoriesController');

const projectController = require('./projectController');
const toolsController = require('./toolsController');

module.exports = {
	us,
	au,
	categoriesController,
	projectController,
	toolsController,
};

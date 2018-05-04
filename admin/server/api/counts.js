var async = require('async');

module.exports = function (req, res) {
	var keystone = req.keystone;
	var counts = {};
	async.each(keystone.lists, function (list, next) {
		var model = list.model.find();
		// custom query with default conditions
		if(list.options.defaultConditions) {
			for(let field in list.options.defaultConditions) {
				for(let condition in list.options.defaultConditions[field]) {
					let data = list.options.defaultConditions[field][condition];
					// build query
					model.where(field)[condition](data);
				}	
			}
		}
		model.count(function (err, count) {
			counts[list.key] = count;
			next(err);
		});
	}, function (err) {
		if (err) return res.apiError('database error', err);
		return res.json({
			counts: counts,
		});
	});
};

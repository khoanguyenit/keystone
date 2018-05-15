var ExMatch = require('expression-match'); // Matches objects with expressions

/**
 * Checks if something is an object
 *
 * @param  {Any} arg   The something we want to check the type of
 * @return {Boolean} If arg is an object or not
 */
function isObject (arg) {
	return Object.prototype.toString.call(arg) === '[object Object]';
};

/**
 * Evaluates the visibility of a field based on its dependencies and their values
 *
 * @param  {Object|Any} notDependsOn The dependsOn variable we get from the field
 * @param  {Object}		values    The values currently in the fields
 * @return {Boolean}			  If the current field should be displayed based
 *                          	  on it's dependencies and their values
 */
module.exports = function evalNotDependsOn (notDependsOn, values) {
	if (!isObject(notDependsOn) || !Object.keys(notDependsOn).length) {
		return false;
	}

	// Checks if the current field should be displayed, based on the values of
	// other fields and the dependsOn configuration of this field
	var Match = new ExMatch(notDependsOn, values, false);
	return Match.match();
};

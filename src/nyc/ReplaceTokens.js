/**
 * @module nyc/ReplaceTokens
 */
console.log('wtf')
/**
 * @desc Class to provide string replacement functionality
 * @public
 * @class
 * @constructor
 */
class ReplaceTokens {
	/**
	 * @desc Replace tokens in a string with values from a provided object
	 * @public
	 * @method
	 * @param {string} str String with tokens to be replaced
	 * @param {Object<string, string>} values Values token for replacement
	 * @return {string} String with replacement value substitution
	 */
	replace(str, values) {
		Object.keys(values).forEach(function(name) {
			str = str.replace(new RegExp('\\$\\{' + name + '\\}', 'g'), values[name] !== undefined ? values[name] : '')
		})
		return str
	}
}
console.log(ReplaceTokens.prototype)
module.exports = ReplaceTokens

/**
 * Check if argument is an option (begins with -- or -)
 * @param {string} arg - Argument to check
 * @returns {bool} Is it then?
 */
const isOption = (arg) => /^--/.test(arg) || /^-/.test(arg);

/**
 * Gets the name of a given option (ex: --plep ==> plep)
 * @param {string} arg => Argument (option) from which to extract the name
 * @returns {string} option name
 */
const getOptionName = (arg) => arg.replace(/-(-)?/g, '');

/**
 * @function
 * @name argumentate
 * Extracts options and variables from arguments
 * @param {string[]} args - List of arguments, usually process.argv (.slice(2) to remove paths)
 * @returns {Object} {options:{}, variables: []} Object containing options {opt: true}, and array of variables
 *
 * @example
 * $ argumentate(['start', '-p=8080', '-c', './myconfig.json'])
 * 
 * > { 
 * >	options: {
 * >		p: '8080',
 * >		c: './myconfig.json'
 * >	},
 * >	variables: ['start']
 * > }
 */
module.exports = function(args) {
	let options = {};
	let variables = [];

	for(let i = 0; i < args.length; i++) {
		let arg = args[i];

		if(isOption(arg)) {

			if(arg.indexOf('=') > -1) {
				let [option, value] = arg.split('=');
				options[getOptionName(option)] = value;

			} else {
				if(!args[i+1] || isOption(args[i+1])) {
					options[getOptionName(arg)] = true;

				} else {
					options[getOptionName(arg)] = args[i+1];
					i++;

				}
			}

		} else {
			variables.push(arg);
		}
	}

	return {
		options,
		variables
	};
};

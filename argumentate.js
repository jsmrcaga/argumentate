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
const getOptionName = (arg, mappings={}) => {
	// Delete first dashes (ex: --plep-plop ==> plep-plop)
	let opt = arg.replace(/^-(-)?/g, '');
	// replace remaining dashes with _, example: plep-plop ==> plep_plop
	opt = opt.replace(/-/g, '_');

	if(mappings[opt]) {
		return mappings[opt];
	}

	return opt;
};

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
 *
 *
 * @example
 * argumentate(['start', '-p=8080', '-c', './myconfig.json'], { p: 'port', c: 'config' })
 *
 * > { 
 * >	options: {
 * >		port: '8080',
 * >		config: './myconfig.json'
 * >	},
 * >	variables: ['start']
 * > }
 */
module.exports = function(args, mapping={}) {
	let options = {};
	let variables = [];

	const set_option = (name, value) => {
		if(!options[name]) {
			return options[name] = value;
		}

		if(options[name] instanceof Array) {
			return options[name].push(value);
		}

		// options[name] exists and is not an array ==> value
		if(options[name] !== value) {
			return options[name] = [options[name], value];
		}
	};

	for(let i = 0; i < args.length; i++) {
		let arg = args[i];

		if(isOption(arg)) {

			if(arg.indexOf('=') > -1) {
				let [option, value] = arg.split('=');
				set_option(getOptionName(option, mapping), value);

			} else {
				if(!args[i+1] || isOption(args[i+1])) {
					set_option(getOptionName(arg, mapping), true);

				} else {
					set_option(getOptionName(arg, mapping), args[i+1]);
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

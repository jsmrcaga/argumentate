const isOption = (arg) => /^--/.test(arg) || /^-/.test(arg);

const getOptionName = (arg, mapping={}) => {
	// Delete first dashes (ex: --plep-plop ==> plep-plop)
	let opt = arg.replace(/^-(-)?/g, '');
	// replace remaining dashes with _, example: plep-plop ==> plep_plop
	opt = opt.replace(/-/g, '_');

	if(mapping[opt]) {
		if(mapping[opt] instanceof Object) {
			return mapping[opt].key;
		}
		return mapping[opt];
	}

	return opt;
};

const default_help = ({ options, variables, mapping }, { name, command }) => {
	const options_help = Object.entries(mapping).map(([k, v]) => {
		const word_option = typeof v === 'string' ? v : v.key;
		const word_description = v instanceof Object ? v.help : '';

		return `\t-${k}, --${word_option}\t\t${word_description}`;
	}).join('\n');

	return console.log(`
${name}

Usage:
	${command} [options]

Options:
${options_help}`);
};

// mapping is a list of options & default values, or description and keys
// { c: 'config', p: { key: 'port', help: 'The port to use when launching this command' } }
function argumentate({ args=process.argv.slice(2), mapping={}, config={} }={}) {
	const {
		useHelp=true,
		helpKey='h',
		helpWord='help',
		autoExit=true,
		help=default_help,
		name,
		command
	} = config;

	if(useHelp && !mapping[helpKey]) {
		mapping[helpKey] = helpWord;
	}

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

	if(useHelp && (options[helpWord] || options[helpKey])) {
		if(!(help instanceof Function)) {
			throw new Error(`The help argument must be a function, got ${typeof help}`);
		}

		help({ options, variables, mapping }, { name, command });
		if(autoExit) {
			return process.exit(0);
		}
	}

	return {
		options,
		variables
	};
};

module.exports = argumentate;

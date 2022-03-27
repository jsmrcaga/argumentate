const argumentate = require('../argumentate');

argumentate({
	mapping: {
		p: 'port',
		c: {
			key: 'config',
			help: 'Configuration options'
		}
	},
	config: {
		name: 'Test CLI',
		command: 'test-command',
		helpKey: 'k',
		helpWord: 'kelp'
	}
});

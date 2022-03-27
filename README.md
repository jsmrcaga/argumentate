# Argumentate

A *very* simple argv parser

# Installation
`npm install argumentate`

# Usage
```js
// make executable (not required, but needed if you are building a cli with a bin file (remember to put bin in your package.json!))
#!/usr/bin/env node

// import argumentate
let argumentate = require('argumentate');

// slice to remove path args
let { options, variables } = argumentate({
	args: process.argv.slice(2),
	mapping: {
		c: 'config',
		p: {
			key: 'port',
			help: 'Port to use when launching this command'
		}
	},
	config: {
		name: 'My CLI',
		command: 'invoke-like-this'
	}
);

// be happy
```

## Mappings

```js
 const { options, variables } = argumentate({
 	args: ['start', '-p=8080', '-c', './myconfig.json'],
 	mapping: {
	 	c: 'config',
		p: {
			key: 'port',
			help: 'Port to use when launching this command'
		}
 	}
 );

// returns
{ 
	options: {
		port: '8080',
		config: './myconfig.json'
	},
	variables: ['start']
}
````

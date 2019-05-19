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
let { options, variables } = argumentate(process.argv.slice(2));

// be happy
```

## Mappings

```js
 argumentate(['start', '-p=8080', '-c', './myconfig.json'], {
 	p: 'port',
 	c: 'config'
 });
 
{ 
	options: {
		port: '8080',
		config: './myconfig.json'
	},
	variables: ['start']
}
````

More info in comments!!

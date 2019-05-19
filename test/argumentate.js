const { expect } = require('chai');

const Argumentate = require('../argumentate');

describe('Argumentate', () => {
	it('Should be able to understand a simple option', () => {
		let args = ['-c'];
		let argumentate = Argumentate(args);

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('c');
		expect(argumentate.options.c).to.be.eql(true);
	});

	it('Should be able to understand a simple option, mapped', () => {
		let args = ['-c'];
		let argumentate = Argumentate(args, { c: 'config' });

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('config');
		expect(argumentate.options.config).to.be.eql(true);
	});

	it('Should be able to understand a simple variable', () => {
		let args = ['start'];
		let argumentate = Argumentate(args);

		expect(argumentate).to.have.property('variables');
		expect(argumentate.variables).to.have.length(1);
		expect(argumentate.variables[0]).to.be.eql('start');
	});

	it('Should be able to understand a simple option and a simple variable', () => {
		let args = ['start', '-c'];
		let argumentate = Argumentate(args);

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('c');
		expect(argumentate.options.c).to.be.eql(true);

		expect(argumentate).to.have.property('variables');
		expect(argumentate.variables).to.have.length(1);
		expect(argumentate.variables[0]).to.be.eql('start');
	});

	it('Should be able to understand a simple option with value (spaced)', () => {
		let args = ['-c', 'start'];
		let argumentate = Argumentate(args);

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('c');
		expect(argumentate.options.c).to.be.eql('start');
	});

	it('Should be able to understand a simple option with value (=)', () => {
		let args = ['-c=start'];
		let argumentate = Argumentate(args);

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('c');
		expect(argumentate.options.c).to.be.eql('start');
	});

	it('Should be able to understand a simple option with value (spaced)', () => {
		let args = ['start', '-c', 'poulet'];
		let argumentate = Argumentate(args);

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('c');
		expect(argumentate.options.c).to.be.eql('poulet');

		expect(argumentate).to.have.property('variables');
		expect(argumentate.variables).to.have.length(1);
		expect(argumentate.variables[0]).to.be.eql('start');
	});

	it('Should be able to understand a simple option with value (spaced & mapped)', () => {
		let args = ['start', '-c', 'poulet'];
		let argumentate = Argumentate(args, { c: 'config' });

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('config');
		expect(argumentate.options.config).to.be.eql('poulet');

		expect(argumentate).to.have.property('variables');
		expect(argumentate.variables).to.have.length(1);
		expect(argumentate.variables[0]).to.be.eql('start');
	});
});

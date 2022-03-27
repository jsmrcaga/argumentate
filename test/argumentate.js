const Sinon = require('sinon');
const { expect } = require('chai');

const Argumentate = require('../argumentate');

describe('Argumentate', () => {
	it('Should be able to understand a simple option', () => {
		let args = ['-c'];
		let argumentate = Argumentate({ args });

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('c');
		expect(argumentate.options.c).to.be.eql(true);
	});

	it('Should be able to understand a simple option, mapped', () => {
		let args = ['-c'];
		let argumentate = Argumentate({ args, mapping: { c: 'config' } });

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('config');
		expect(argumentate.options.config).to.be.eql(true);
	});

	it('Should be able to understand a simple variable', () => {
		let args = ['start'];
		let argumentate = Argumentate({ args });

		expect(argumentate).to.have.property('variables');
		expect(argumentate.variables).to.have.length(1);
		expect(argumentate.variables[0]).to.be.eql('start');
	});

	it('Should be able to understand a simple option and a simple variable', () => {
		let args = ['start', '-c'];
		let argumentate = Argumentate({ args });

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
		let argumentate = Argumentate({ args });

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('c');
		expect(argumentate.options.c).to.be.eql('start');
	});

	it('Should be able to understand a simple option with value (=)', () => {
		let args = ['-c=start'];
		let argumentate = Argumentate({ args });

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('c');
		expect(argumentate.options.c).to.be.eql('start');
	});

	it('Should be able to understand many identical options with value (=)/ without value', () => {
		let args = ['-c=start', '-c', 'plep', '-c=45'];
		let argumentate = Argumentate({ args });

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('c');
		expect(argumentate.options.c).to.be.an.instanceof(Array);
		expect(argumentate.options.c).to.be.eql(['start', 'plep', '45']);
	});

	it('Should be able to understand a simple option with value (spaced)', () => {
		let args = ['start', '-c', 'poulet'];
		let argumentate = Argumentate({ args });

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
		let argumentate = Argumentate({ args, mapping: { c: 'config' }});

		expect(argumentate).to.have.property('options');
		expect(Object.keys(argumentate.options).length).to.be.eql(1);
		expect(argumentate.options).to.have.property('config');
		expect(argumentate.options.config).to.be.eql('poulet');

		expect(argumentate).to.have.property('variables');
		expect(argumentate.variables).to.have.length(1);
		expect(argumentate.variables[0]).to.be.eql('start');
	});

	for(const arg of ['-h', '--help']) {
		it(`Should automatically call the help function if ${arg} is used`, () => {
			let args = [arg];
			let help = Sinon.fake();
			Argumentate({ args, config: { help, autoExit: false }});
			expect(help.calledOnce).to.be.true;
		});
	}

	for(const arg of ['-o', '--ooo']) {
		it(`Should call the help function with custom arg ${arg}`, () => {
			let args = [arg];
			let help = Sinon.fake();
			Argumentate({args, config: { help, autoExit: false, helpKey: 'o', helpWord: 'ooo' }});
			expect(help.calledOnce).to.be.true;
		});
	}

	it('Should not call the help function if useHelp is false', () => {
		const args = ['-h'];
		const help = Sinon.fake();
		Argumentate({args, config: { help, autoExit: false, useHelp: false  }});

		expect(help.callCount).to.be.eql(0);
	});
});

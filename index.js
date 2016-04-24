'use strict';
var defaultMethods = ['log', 'info', 'warn', 'error', 'trace'];
var defaultStyle = 'border:1px solid;color:%color%';
function noop() {}
function removeMethod(method) {
	this[method] = noop;
}
function addMethod(method) {
	if (this.style && method !== 'error') {
		this[method] = console[method].bind(console, '%c ' + this.id + ' ', this.style);
	} else {
		this[method] = console[method].bind(console, this.id + ':');
	}
}
function Console(id, opts) {
	opts = opts || {};
	this.id = id;
	this.color = opts.color || false;
	this.style = opts.style || defaultStyle.replace('%color%', this.color);
	this.methods = defaultMethods.concat(opts.methods || []);
	this.sub = opts.sub || [];
	this.on();
}
Console.prototype.on = function () {
	this.methods.forEach(addMethod, this);
	this.sub.forEach(function (sub) {
		sub.on();
	});
	return this;
};
Console.prototype.off = function () {
	this.methods.forEach(removeMethod, this);
	this.sub.forEach(function (sub) {
		sub.off();
	});
	return this;
};

module.exports = Console;

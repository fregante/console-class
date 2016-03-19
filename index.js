'use strict';
var methods = ['log','info','warn','error'];
var styleBase = 'border:1px solid;color:';

function Console(id, enabled) {
	this.id = id;
	this.enabled = typeof enabled === 'undefined' ? true : enabled;
}
Console.prototype.style = 'border:1px solid;color:%color%';
Console.prototype.color = false;
Console.prototype.on = function () { this.enabled = true; };
Console.prototype.off = function () { this.enabled = false; };
Console.prototype.addMethod = function (methodName) {
	this[methodName] = function () {
		if (!this.enabled) {
			return;
		}
		var args = Array.prototype.slice.call(arguments);
		if (this.color && methodName !== 'error') {
			args.unshift('%c ' + this.id + ' ', styleBase.replace('%color%', this.color));
		} else if (typeof args[0] === 'string') {
			// keep support for colored logs in the second argument if the first one is a string
			args[0] = this.id + ': ' + args[0];
		} else {
			args.unshift(this.id + ':');
		}

		console[methodName].apply(console, args);
	};
};

// generate common methods to prototype
methods.forEach(function (methodName) {
	Console.prototype.addMethod(methodName);
});

module.exports = Console;

var exec = require('child_process').exec;
var merge = require('merge');

/**
 *
 */
module.exports = function(settings) {
	var callback_this = this;

	this.raw = [];

	this.settings = {
		base: 120,
		address: 48,
		pin: 0,
		voltage: 3.3,
		interval: 300,
		samples: 20,
	};
	this.settings = merge(this.settings, settings);

	/**
	 *
	 */
	this.read = function() {
		exec(
			'gpio -x pcf8591:'
			+ callback_this.settings.base
			+ ':0x' + callback_this.settings.address
			+ ' aread ' + (callback_this.settings.base + callback_this.settings.pin),
			function(err, stdout, stderr) {
				callback_this.add(parseInt(stdout, 10));
			}
		);
	};

	// Instant availability
	this.read();

	/**
	 *
	 */
	this.interval = setInterval(
		function() {
			callback_this.read();
		},
		this.settings.interval
	);

	/**
	 *
	 */
	this.temperature = function() {
		return (this.val() / 255 * this.settings.voltage * 1000 - 500) / 10;
	};
	
	/**
	 *
	 */
	this.kelvins = function() {
		return this.temperature() + 273.15;
	};

	/**
	 *
	 */
	this.add = function(v) {
		this.raw.push(v);
		if (this.raw.length > this.settings.samples) {
			this.raw.shift();
		}
	};

	/**
	 *
	 */
	this.val = function() {
		var sum = 0;
		this.raw.forEach(function(v) {
			sum += v;
		});
		return sum / this.raw.length
	};
}

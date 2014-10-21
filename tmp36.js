var exec = require('child_process').exec;
var merge = require('merge');

/**
 *
 */
module.exports = function(settings) {
	var callback_this = this;

	this.raw = null;

	this.settings = {
		base: 120,
		address: 48,
		pin: 0,
		voltage: 3.3,
		interval: 300,
	};
	this.settings = merge(this.settings, settings);

	/**
	 *
	 */
	this.interval = setInterval(
		function() {
			exec(
				'gpio -x pcf8591:'
				+ callback_this.settings.base
				+ ':0x' + callback_this.settings.address
				+ ' aread ' + (callback_this.settings.base + callback_this.settings.pin),
				function(err, stdout, stderr) {
					callback_this.raw = parseInt(stdout, 10);
				}
			);
		},
		this.settings.interval
	);

	/**
	 *
	 */
	this.temperature = function() {
		return (this.raw / 255 * this.settings.voltage * 1000 - 500) / 10;
	}
	
	/**
	 *
	 */
	this.kelvins = function() {
		return this.temperature() + 273.15;
	}
}

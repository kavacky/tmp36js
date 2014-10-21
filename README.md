tmp36js
=======

Node.js module for temperature reading from TMP36 sensor via PCF8591 analog/digital converter using WiringPi GPIO command line utility.

Usage
-----
`var tmp36 = require('tmp36');
var t = new tmp36();
setInterval(
	function() {
		console.log(t.temperature());
	},
	500
);`

Defaults
--------
`{
	address: 120,
	base: 48,
	pin: 0,
	voltage: 3.3,
	interval: 300,
}`

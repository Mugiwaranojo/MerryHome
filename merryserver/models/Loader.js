"use strict";


const child = require('child_process');
const path = require('path')

var options = {
	encoding: 'UTF-8'
};

export class Loader {
	
	constructor (textValue) {
		this.textValue= textValue;
		this.process = null;
	}	
	
	show(){
		var script = path.resolve(__dirname, '../lib/loader.py');
		this.process = child.exec("python2.7 "+script+" \""+this.textValue+"\"", options, function(error, stdout, stderr) {
			console.log(stdout);
			if (error) {
				console.log(stderr);
			}
		});
	}
	
	
	stop(){
		if(this.process){
			var terminate = require('terminate');
				terminate(this.process.pid, function (err) {
					if (err) { // you will get an error if you did not supply a valid process.pid 
						console.log("terminate error: " + err); // handle errors in your preferred way. 
					}
				});
			this.process= null;
		}
	}
}
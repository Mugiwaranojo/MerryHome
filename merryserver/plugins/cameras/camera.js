var child = require('child_process')
	, path = require('path');

var options = {
	encoding: 'UTF-8'
};

class Camera{
	constructor(port, name, pathCam){
		this.port= port;
		this.name= name;
		this.path= pathCam;	
		this.script = path.resolve(__dirname, 'lib/camera.py');
		
		var command = 'python ' + this.script + ' -p ' + this.port+ ' -f ' + this.name + ' -c ' + this.path;
		//console.log(command);
		this.callback = function (error, stdout, stderr) {
			console.log(stdout);
			if (error) {
				console.log(stderr);
			}
		};
		//this.process = child.exec(command, options, this.callback);*/
		this.process= null;
	}
	
	getCommand(){
		return 'python ' + this.script + ' -p ' + this.port+ ' -f ' + this.name + ' -c ' + this.path;
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
	
	start(){
		this.stop();
		var command= this.getCommand();
		console.log(command);
		this.process = child.exec(command, options, this.callback);
	}
	
	isStarted(){
		return this.process!== null;
	}
}

export default Camera;
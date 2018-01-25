
const fs = require('fs'); 

export {getCameraPortFile};

function getCameraPortFile(fileName){
	
	if (fs.existsSync(__dirname+'/config.json')) { 
		var config = require(__dirname+'/config.json');
		for(var i in config.cameras){
			if(config.cameras[i].name+".jpg"==fileName){
				return config.cameras[i].port;
			}
		}
	}
	return  null;
}
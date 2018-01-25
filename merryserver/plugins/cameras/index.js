"use strict";

import Plugin from "../../models/Plugin.js";
import Camera from "./camera.js";

class CameraPlugin extends Plugin {
	constructor(path){
		super(path);
		this.cameras =[];
		
		for(var i in this.config.cameras){
			this.cameras[i] = new Camera(this.config.cameras[i].port, this.config.cameras[i].name+".jpg", this.config.cameras[i].path);
		}
	}
	
	getView(){
		var obj= this;
		this.view.list = this.config.cameras;
		for(var i in this.view.list){
			this.view.list[i]["event"]= "clientCameraEvent";
			this.view.list[i]["itemId"]= i;
			this.view.list[i]["activated"]= this.cameras[i].isStarted();
		}
		return this.view;
	}
	
	suscribeEvent(socketClient){
		const obj= this;
		socketClient.on("clientCameraEvent", function(data){
			console.log("clientCameraEvent");
			console.log(data);
			switch(data.command){
				case "start":
					obj.cameras[data.num].start();
					break;
				case "stop":
					obj.cameras[data.num].stop();
					break;
			}
		});
	}
}

export default new CameraPlugin(__dirname);
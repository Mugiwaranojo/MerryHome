"use strict";

const fs = require('fs'); 

export default class Plugin {

    constructor (path) {
	   this.service= null;
	   this.path = path;
       this.requests = {};
	   this.config = {};
	   this.view = null;
	   if (fs.existsSync(this.path+'/config.json')) { 
		  this.config = require(this.path+'/config.json')
	   }
	   if (fs.existsSync(this.path+'/requests.json')) { 
		  this.requests = require(this.path+'/requests.json');
		  console.log(this.requests);
	   }
	   if (fs.existsSync(this.path+'/view.json')) { 
		  this.view = require(this.path+'/view.json');
	   }
    }
	
	setService(service){
		this.service= service;
	}
	
	suscribeEvent(socketClient){
	
	}

	getRequests() {
		return this.requests;
	}
	
	getView(){
		return this.view;
	}

	doRequest(id, data) {
		return null;
	}
}
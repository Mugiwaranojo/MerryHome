"use strict";

const jwt = require('jsonwebtoken');
const fs = require('fs');
import EventEmitter from 'events';
import { getToken } from './AuthService.js'
import {searchRequest} from './voice-helper'

class PluginService {

    constructor () {
		this.plugins = [];
		this.clientsSockets = [];
		this.pluginsEvents = new EventEmitter();
		this.apicode = null;
		this.apiCrendentials= null;
    }
	
	setApiCode(data){
		this.apicode = data.apicode;
		console.log(this.apicode);
		var obj = this;
		getToken(this.apicode, function (error, response, body) {
			obj.apiCrendentials=body;
		});
	}
	
	addClientSocket(client){
		console.log("new client connected : "+ jwt.decode(client.handshake.query.token).email);
		for (var i in this.plugins){
			this.plugins[i].suscribeEvent(client);
		}
		this.clientsSockets.push(client);
	}
	
	emitEvent(name, data){
		for(var i in this.clientsSockets){
			this.clientsSockets[i].emit(name, data);
		}
	}
	
    loadPlugins(){
		var pluginsFolder="./plugins";
		this.plugins= [];
		fs.readdir(pluginsFolder, (err, files) => {
				files.forEach(file => {
					//if(file!="zwave" && file!="cameras"){
						console.log("load plugin ... "+file);
						var tmpPlugin= require("../"+pluginsFolder+"/"+file+"/index.js").default;
						tmpPlugin.setService(this);
						this.plugins.push(tmpPlugin);
					//}
				});
		});
    }
	
	updatePluginsService(){
		for (var i in this.plugins){
			this.plugins[i].setService(this);
		}
	}

    getPlugins(){
        return this.plugins;
    }

    getPluginsRequests(){
		var allRequests = {};
		for (var i in this.plugins){
				for (var j in this.plugins[i].getRequests()){
						allRequests[j]= this.plugins[i].getRequests()[j];
				}
		}
		return allRequests;	
    }
	
	getPluginsViews(){
		var allViews = [];
		for (var i in this.plugins){
			if(this.plugins[i].getView()){
				allViews.push(this.plugins[i].getView());
			}
		}
		return allViews;	
    }

    doPluginRequest(requestId, data){
        var tmpPlugin = this.getPluginByRequestId(requestId);
        if(tmpPlugin !== null){
			return tmpPlugin.doRequest(requestId,data);
        }else{
            return "Je ne comprends pas";
        }
    }
	
	voiceText(value) {
		var objRequest = searchRequest(value, this.getPluginsRequests());
		if(objRequest!=null){
			return this.doPluginRequest(objRequest.id, objRequest.data);
		}else{
			return "Je ne comprends pas";
		}
    }

    getPluginByRequestId(requestId){
        for (var i in this.plugins){
                for (var j in this.plugins[i].getRequests()){
                        if(requestId===j){
                                return this.plugins[i];
                        }
                }
        }
        return null;	
    }
}

export default new PluginService();
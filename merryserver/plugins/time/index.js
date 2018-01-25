"use strict";

import Plugin from "../../models/Plugin.js";

class TimePlugin extends Plugin {
	
	doRequest(id, data) {
		console.log("request : "+id);
		switch(id){
			case "time":
				var now = new Date();
				var response= "Il est "+now.getHours()+" heure "+now.getMinutes()+"."
				console.log("response : "+response);
				return response;
		}
		return null;
	}
	
}

export default new TimePlugin(__dirname);
"use strict";
import pluginService  from "../services/PluginService";

class PluginController {

    constructor () {
        pluginService.loadPlugins();
    }
	
	addClientSocket(client){
		pluginService.addClientSocket(client);
	}
	
    getAllPluginsRequests(req, res) {
        res.end(JSON.stringify(pluginService.getPluginsRequests()));
    }
	
	getAllPluginsViews(req, res) {
        res.end(JSON.stringify(pluginService.getPluginsViews()));
    }

    doRequest(req, res) {
		res.end(JSON.stringify(pluginService.doPluginRequest(req.params.requestId, req.body)));
    }
	
	voiceText(req, res) {
		res.end(JSON.stringify(pluginService.voiceText(req.body.value)));
    }
	
	setApiCode(req, res) {
		res.end(JSON.stringify(pluginService.setApiCode(req.body)));
    }
}

export default new PluginController();
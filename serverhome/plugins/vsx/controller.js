var vsx = require("./index.js");

class VSXController {
        
        constructor(io){
            this.io = io;
        }
        
        getView(req, res){
            var dataView = { 
                "type" : "VSX"
            };
            res.end(JSON.stringify(dataView));
        }
        
	postAction(req, res){
            switch(req.params.actionId){
                case "increaseSound":
                    vsx.request("VU", null);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "decreaseSound":
                    vsx.request("VD", null);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "muteSound":
                    vsx.request("MO", null);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "muteOffSound":
                    vsx.request("MF", null);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "setVolumeSound":
                    vsx.request("?V", req.body.value);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "powerOff":
                    vsx.request("?P", null);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "channelTV":
                    vsx.request("04FN", null);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                case "channelGame":
                    vsx.request("49FN", null);
                    res.end(JSON.stringify({resultText: "ok"}));
                    break;
                default:
                    res.end(JSON.stringify({}));
                    break;
            }
	}
}

module.exports = VSXController;
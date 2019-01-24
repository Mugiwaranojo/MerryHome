const request = require('sync-request');
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://fr.wikipedia.org/wiki/';


class WikipediaController {
    
    constructor(io){
        this.io = io;
        io.sockets.on('connection', function(socket){ 
            socket.on('wikipediasearch', function(searchvalue){
                console.log("wikipediasearch "+searchvalue);
                var isTable=true;
                rp(url+searchvalue)
                .then(function(html) {
                    var title= $('.firstHeading', html).text();
                    var infos = $('.infobox_v2', html).html();
                    if(!infos){
                        infos= $('.infobox_v3', html).html();
                        if(!infos){
                            infos=$('.mw-parser-output', html).html();
                            isTable= false;
                        }
                    }
                    socket.emit('wikipediaresult', {title: title, infos: infos, isTable: isTable});
                })
                .catch(function(err) {
                  //handle error
                }); 
            });
        });
    }
    
    getView(req, res){
        var dataView = { 
            "type" : "Wikipedia"
        };
        res.end(JSON.stringify(dataView));
    }
    
    postAction(req, res){
        switch(req.params.actionId){
            case "whois":
            case "whatis":
                var requestUrl="https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";
                requestUrl += parseDataSend(req.body.searchValue);
                console.log(requestUrl);
                var wikiReq = request('GET', requestUrl,{cache:'file'});
                var response = JSON.parse(wikiReq.getBody('utf8'));
                var textResponse= parseDataResponse(response);
                if(!textResponse){
                    res.end(JSON.stringify({resultText: "je n'ai pas d'informations"}));
                }else{
                    res.end(JSON.stringify({resultText: textResponse}));
                }
                break;
            default:
                res.end(JSON.stringify({}));
                break;
            
        }
    }
}

function parseDataSend(data){
	if(data.indexOf(" ")){
		var pieces = data.split(" ");
		data="";
		for ( var i in pieces){
			if(pieces[i].length>3){
				data += pieces[i].charAt(0).toUpperCase();
				data += pieces[i].substr(1);
				if(i!==pieces.length - 1){
					data+="_";
				}
			}
		}
	}
	return data;
}

function parseDataResponse(response){
	if(response){
		if(response.query){
			for(var i in response.query.pages){
				if(response.query.pages[i].extract){
					if(response.query.pages[i].extract.indexOf('\n')!==-1){
						var textResponse= response.query.pages[i].extract.substr(0, response.query.pages[i].extract.indexOf('\n'));
					}else{
						var textResponse= response.query.pages[i].extract;
					}
					if(textResponse.length > 300){
							textResponse= textResponse.substr(0, textResponse.indexOf("."));
					}
					console.log(textResponse);
					return textResponse;
				}
			}
		}
		console.log(response);
	}
	return false;
}

module.exports = WikipediaController;
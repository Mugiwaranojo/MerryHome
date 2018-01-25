const jwt = require('jsonwebtoken');
const jwtSecret 	= "your client secret";
const audience  	= "your audience url";
const client_id  	= "your client id";
const token_url  	= "your token url";
const callback_url  = "your callback url";


function authCheck(req, res, next){
	if(!checkedToken(req.headers.authorization)){
		res.sendStatus(401);
		return;
	}
	next();
}


function checkedToken(token){
	try {
		var decoded = jwt.decode(token, jwtSecret);
		return decoded.iss==audience;
	} catch(err) {
		console.log(err)
	  return null;
	}
}

function refreshtoken(req, res){
	var token = req.headers.authorization;
	try {
		var decoded = jwt.decode(token, jwtSecret);
		delete decoded['exp'];
		delete decoded['iat'];
		var rtoken = jwt.sign(decoded, jwtSecret,  { expiresIn: '10h' });
		res.end(JSON.stringify({'token': rtoken}));
	} catch(err) {
		console.log(err)
		res.sendStatus(401);
		return;
	}
	
}

function getToken(api_code, callback){
	
	var request = require("request");

	var options = { method: 'POST',
	  url: token_url,
	  headers: { 'content-type': 'application/json' },
	  body: 
	   { grant_type: 'authorization_code',
		 client_id: client_id,
		 client_secret: client_secret,
		 code: api_code,
		 redirect_uri: callback_url },
	  json: true };

	request(options, callback);
}

export {authCheck, checkedToken, getToken, jwtSecret, refreshtoken};
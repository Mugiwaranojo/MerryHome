'use strict';
const fs = require('fs'); 

/*
var options = {
  key: fs.readFileSync('./encryption/privkey.pem'),
  cert: fs.readFileSync('./encryption/cert.pem'),
  ca: fs.readFileSync('./encryption/chain.pem')
};
*/


const express = require('express');
const app = express();
//const server = require('https').createServer(options,app);
const server = require('http').createServer(app);  
const cors = require('cors');
const bodyParser = require('body-parser');
const socketioJwt = require('socketio-jwt');
const io = require('socket.io')(server,  { pingTimeout: 30000 });

const port = 3000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

import { authCheck, jwtSecret, refreshtoken } from "./services/AuthService";
import pluginController from "./controllers/PluginController";
import mjpegStreamerController from "./controllers/MjpegStreamerController";

io.set('authorization', socketioJwt.authorize({
  secret: jwtSecret,
  handshake: true
}));


//Waiting for loading all plugins in pluginservice
setTimeout(function(){
	//Configure routes
	
	//get all requests
	app.get('/requests', authCheck, pluginController.getAllPluginsRequests);
	
	//get plugins
	app.get('/plugins', authCheck, pluginController.getAllPluginsViews);
		
	//post a request and get a response
	app.post('/request/:requestId', authCheck, pluginController.doRequest);
	
	//post a request and get a response
	app.post('/voice', authCheck, pluginController.voiceText);
	
	//post a request and get a response
	app.post('/apicode', authCheck, pluginController.setApiCode);
	
	//get mjpeg
	app.get("/stream/:fileName/:token", mjpegStreamerController.getJPG);
	
	//post a request and get a response
	app.post('/refreshtoken', authCheck, refreshtoken);
	
	
	io.sockets.on('connection', (client) => {
		pluginController.addClientSocket(client);
	});
	
	server.listen(port);  
	console.log('merryServer RESTful API server started on: ' + port);
}, 2000);
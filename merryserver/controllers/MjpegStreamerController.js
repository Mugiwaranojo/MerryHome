"use strict";
const PubSub = require("pubsub-js");
const net = require('net');

import { getCameraPortFile } from "../plugins/cameras/utils";
import { checkedToken } from "../services/AuthService";

class MjpegStreamerController {
	
	getJPG(req, res) {
		var requestFile = req.params.fileName;
		var result= checkedToken(req.params.token);
		if(!result){
			res.sendStatus(401);
			return;
		}
		
		var port = getCameraPortFile(requestFile);
		if(!port){
			res.sendStatus(404);
			return;
		}
		
        res.writeHead(200, {
            'Content-Type': 'multipart/x-mixed-replace;boundary="BOUNDARY"',
            'Connection': 'keep-alive',
            'Expires': 'Fri, 27 May 1977 00:00:00 GMT',
            'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
            'Pragma': 'no-cache'
        });

        //
        // send new frame to client
        //
        var subscriber_token = PubSub.subscribe('MJPEG_'+requestFile, function(msg, data) {

            //console.log('sending image');

            res.write('--BOUNDARY\r\n')
            res.write('Content-Type: image/jpeg\r\n');
            res.write('Content-Length: ' + data.length + '\r\n');
            res.write("\r\n");
            res.write(Buffer(data, 'base64'), 'binary');
            res.write("\r\n");
        });
		
		//create client which retrieve image picture
		var client = new net.Socket({
			readable: true
		});
		client.connect(port, '127.0.0.1');
		var tmp_image = null;
		client.on('error', function (err) {
			if (err) {
				console.log(err)
			}
		});
		client.on('data', function (data) {
			var str = data.toString('UTF-8');
			var pos = str.indexOf(requestFile);
			if (pos >= 0) {
				if (tmp_image !== null) {
					tmp_image += str.substring(0, pos);
					PubSub.publish('MJPEG_'+requestFile, tmp_image);
				}
				tmp_image = str.substring(pos + requestFile.length);
			} else {
				tmp_image += str;
			}
		});
		
		//
        // connection is closed when the browser terminates the request
        //
        res.on('close', function() {
            //console.log("Connection closed!");
            PubSub.unsubscribe(subscriber_token);
            res.end();
		});
    }
}

export default new MjpegStreamerController();
import axios from 'axios';
import { getAccessToken, getIdToken } from './AuthService';

import openSocket from 'socket.io-client';


export {getRequestdata, sendRequest,sendApiCode, getPluginsViews, getStreamJPG, initSocket, subscribeToEvent, emitEvent};

const BASE_URL = 'url of your server api';

var socket = null;

function initSocket(){
    socket = openSocket(BASE_URL, {query: 'token='+getIdToken()});
    console.log(socket);
}


function getRequestdata() {
  const url = `${BASE_URL}/requests`;
  return axios.get(url, { headers: { Authorization: `${getAccessToken()}` }}).then(response => response.data);
}


function getPluginsViews() {
  const url = `${BASE_URL}/plugins`;
  return axios.get(url, { headers: { Authorization: `${getAccessToken()}` }}).then(response => response.data);
}

function getStreamJPG(imageFile) {
  var token = getAccessToken();
  return `${BASE_URL}/stream/`+imageFile+'/'+token.toString("base64");
}

function sendRequest(requestId, requestData){
    const url = `${BASE_URL}/request/`+requestId;
    return axios.post(url, requestData,{ headers: { Authorization: `${getAccessToken()}` }}).then(response => response.data);
 }
 
function sendApiCode(api_code){
    const url = `${BASE_URL}/apicode`;
    return axios.post(url, {"apicode":api_code},{ headers: { Authorization: `${getAccessToken()}` }});
 }
 
function subscribeToEvent(name, callback) {
    if(socket!==null){
        socket.on(name, callback);
    }
}

function emitEvent(name, data){
    if(socket!==null){
        socket.emit(name, data);
    }
}
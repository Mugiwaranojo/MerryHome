import axios from 'axios';
import openSocket from 'socket.io-client';

const BASE_URL = 'your server api';

var  socket = null;
const tts = require('react-native-android-speech');

export {initSocket, sendVoiceText, refreshToken, getPluginsViews, getStreamJPG, subscribeToEvent, emitEvent};


function refreshToken(token){
    const url = `${BASE_URL}/refreshtoken`;
    return axios.post(url, {}, { headers: { Authorization: `${token}` }}).then(response => response.data);
}

function initSocket(token){
    socket = openSocket(BASE_URL, {query: 'token='+token });
    subscribeToEvent("serverSay", (function (response){
                                        tts.speak({
                                            text:response,
                                            language : 'fr'
                                        });
                                    }));
}


function getPluginsViews(token) {
  const url = `${BASE_URL}/plugins`;
  return axios.get(url, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}

function getStreamJPG(imageFile, token) {
  return `${BASE_URL}/stream/`+imageFile+'/'+token.toString("base64");
}

function sendVoiceText(token, text){
    const url = `${BASE_URL}/voice`;
    return axios.post(url, {'value':text},{ headers: { Authorization: `${token}` }}).then(response => response.data);
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
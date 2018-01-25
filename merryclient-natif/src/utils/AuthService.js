import decode from 'jwt-decode';
import axios from 'axios';
import Auth0 from 'react-native-auth0';
import { AsyncStorage } from 'react-native';
import { refreshToken, initSocket }   from './merryhome-api';
import jwt from 'react-native-jwt-io';

const  jwtSecret = "your client secrey";
const ID_TOKEN_KEY = '@App:idtoken';
const ACCESS_TOKEN_KEY = '@App:accesstoken';
const USER = '@App:userinfo';
const CLIENT_ID = 'your client id';
const CLIENT_DOMAIN = 'your client domain';
const SCOPE = 'your scope';
const AUDIENCE = 'https://yourdomain.eu.auth0.com/userinfo';

const auth0 = new Auth0({ domain: CLIENT_DOMAIN, clientId: CLIENT_ID });

export function login() {
  auth0
    .webAuth
    .authorize({
        scope: SCOPE, 
        audience: AUDIENCE})
    .then(credentials =>{
      console.log(credentials);
      // Successfully authenticated
      // Store the accessToken
      setIdToken(credentials.idToken);
      var user = decode(credentials.idToken);
      setUserInfo(user);
      var token = jwt.encode(user, jwtSecret);
      setAccessToken(token);
    })
    .catch(error => console.log(error));
     auth0.crossOriginVerification();
}

export function logout() {
    AsyncStorage.removeItem(ID_TOKEN_KEY);
    AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    AsyncStorage.removeItem(USER);
}

async function setIdToken(token){
    try{
       await AsyncStorage.setItem(ID_TOKEN_KEY, token);
    }catch(error){
        console.log("error saving idToken "+error);
    }
}

export async function getIdToken() {
   return await AsyncStorage.getItem(ID_TOKEN_KEY);
}

export async function setAccessToken(token){
    try{
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
        
    }catch(error){
       console.log("error saving accessToken "+error);
    }
}

export async function getAccessToken() {
    var token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    setTimeout(function(){
        refreshToken(token).then(data=>{
            setAccessToken(data.token);
            var user = jwt.decode(data.token, jwtSecret);
            setIdToken(jwt.encode(user));
        });
    }, 30000);
    return token;
}

async function setUserInfo(info){
    try{
        await AsyncStorage.setItem(USER, JSON.stringify(info));
    }catch(error){
         console.log("error saving user "+error);
    }
}

export async function getUserInfo() {
    return JSON.parse(await AsyncStorage.getItem(USER));
}

export function isLoggedIn() {
  return getIdToken().then(value =>{
      return !!value && !isTokenExpired(value);
  });
}

function getTokenExpirationDate(encodedToken) {
 var tempToken = null; 
 try{
     tempToken = decode(encodedToken);
  }catch(error){
     logout();
     return null; 
  }
  const date = new Date(0);
  date.setUTCSeconds(tempToken.exp);
  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
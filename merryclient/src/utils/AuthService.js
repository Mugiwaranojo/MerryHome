import decode from 'jwt-decode';
import auth0 from 'auth0-js';
import axios from 'axios';

const ID_TOKEN_KEY = 'id_token';
const CODE = 'code';
const ACCESS_TOKEN_KEY = 'access_token';
const USER = 'user';

const CLIENT_ID = 'your client id';
const CLIENT_DOMAIN = 'your client domain';
const REDIRECT = 'your callback url';
const SCOPE = 'your scope';
const SCOPE_CONNECTION = 'your scope api';
const AUDIENCE = 'your audience';
const NONCE = 'abc';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token code',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    access_type: 'offline',
    connection : 'google-oauth2',
    scope_connection : SCOPE_CONNECTION,
    scope: SCOPE,
    nonce: NONCE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  window.location.href = "/";
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getCode() {
  return localStorage.getItem(CODE);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

// Get and store id_token in local storage
export function setCode() {
  let code = getParameterByName('code');
  localStorage.setItem(CODE, code);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function getUserInfo(){
    const url= "https://"+CLIENT_DOMAIN+"/userinfo";
    axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response =>{
        localStorage.setItem(USER, JSON.stringify(response.data));
    });
}

export function getUser(){
    return JSON.parse(localStorage.getItem(USER));
}
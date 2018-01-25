import { Component } from 'react';
import { setIdToken, setAccessToken, setCode,getCode, getUserInfo} from '../../utils/AuthService';
import { sendApiCode } from '../../utils/merryhome-api'

class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setCode();
    setIdToken();
    getUserInfo();
    sendApiCode(getCode()).then((response)=>{
        console.log(response);
        window.location.href = "/";
    });
  }

  render() {
    return null;
  }
};

export default Callback;
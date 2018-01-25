import SpeechAndroid from 'react-native-android-voice';

import React from 'react';
import { View, StyleSheet, Image, Dimensions, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Text } from 'native-base';

import {getAccessToken} from '../../utils/AuthService';
import {sendVoiceText} from '../../utils/merryhome-api';

const tts = require('react-native-android-speech');
const hudAnimation= require("../../../assets/hud.gif");

class Home extends React.Component {
    
    
    async handleClick() {
        try{
            //More Locales will be available upon release.
            var spokenText = await SpeechAndroid.startSpeech("Parlez moi", SpeechAndroid.FRENCH);
            console.log(spokenText);
            getAccessToken().then(token=>{
                sendVoiceText(token, spokenText).then(response=>{
                    console.log(response);
                    tts.speak({
                                text:response,
                                language : 'fr'
                            });
                }).catch(function(error){
                    console.log(error); // Network Error
                });
            });
            
        }catch(error){
            switch(error){
                case SpeechAndroid.E_VOICE_CANCELLED:
                     console.log("Voice Recognizer cancelled");
                    break;
                case SpeechAndroid.E_NO_MATCH:
                     console.log("No match for what you said");
                    break;
                case SpeechAndroid.E_SERVER_ERROR:
                     console.log("Google Server Error");
                    break;
                /*And more errors that will be documented on Docs upon release*/
                default:
                    console.log(error);
                    break;
            }
        }
    }
    
    render() {
        
        return (
                <View style={styles.container}>
                    <Image source={ hudAnimation  }/>
                    <View>
                        <Button onPress ={this.handleClick.bind(this)}
                                style={styles.button}>
                            <Icon name="microphone" size={22} color="#FFF" style={{padding:10}}/>
                        </Button>
                    </View>
                </View>
            );
    }
};

export default Home;


const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    minHeight: window.height - 80,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#000'
  },
  button: {
    width:100,
    alignItems:'center',
    justifyContent:'center'
  }
});
import React from 'react'
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

import {getRequestdata, sendRequest, subscribeToEvent} from '../../utils/merryhome-api'
import {searchRequest} from '../../utils/voice-helper'

import { Button, Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import Conversation from './Conversation'

import './css/VoiceRecognition.css';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

class VoiceRecognition extends React.Component {
  
  constructor(props){
	super(props);
	this.synth = window.speechSynthesis;
	this.state = { answers: [],
                       requests: []};
  }
  
  getRequestData() {
    getRequestdata().then((requests) => {
        console.log(requests);
        var obj= this;
        obj.setState({ "answers": obj.state.answers,
                       "requests": requests});
        this.props.recognition.onresult = function(event) {
            var result=event.results[event.results.length-1];
            if(result.isFinal){
                var now= new Date();
                var answers = obj.state.answers;
                answers.push({"text":result[0].transcript,
                              "orientation":"left",
                              "time": now.getTime(),
                              "user": ""});
                obj.setState({ "answers": answers,
                               "requests": obj.state.requests});
                var objRequest = searchRequest(result[0].transcript, requests);
                if(objRequest){
                    obj.sendRequest(objRequest.id, objRequest.data);
                }
            }
        };
    });
  }
  
  sendRequest(requestId, requestData){
    sendRequest(requestId, requestData).then((response) => {
        var answers = this.state.answers;
        var now= new Date();
        answers.push({"text":response,
                      "orientation":"right",
                      "time": now.getTime(),
                      "user": "Merry"});
        this.setState({ "answers":  answers,
                        "requests": this.state.requests});
        var utterThis = new SpeechSynthesisUtterance(response);
        this.synth.speak(utterThis);
    });	
  }
  
  handleClickSearch(e) {
        var text = $("#speakInput").val();
        var now= new Date();
        var answers = this.state.answers;
        answers.push({"text":text,
                      "orientation":"left",
                      "time": now.getTime(),
                      "user": ""});
        this.setState({ "answers": answers,
                       "requests": this.state.requests});
        
        var objRequest = searchRequest(text, this.state.requests);
        if(objRequest){
            this.sendRequest(objRequest.id, objRequest.data);
        }
  }
  
  componentDidMount(){
    this.getRequestData();
    subscribeToEvent("serverSay", (function (response){
        var answers = this.state.answers;
        var now= new Date();
        answers.push({"text":response,
                      "orientation":"right",
                      "time": now.getTime(),
                      "user": "Merry"});
        this.setState({ answers });
        var utterThis = new SpeechSynthesisUtterance(response);
        this.synth.speak(utterThis);
    }).bind(this));
  }
  
  render() {
    const { startListening, stopListening, browserSupportsSpeechRecognition } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    
    const  answersTemp  = this.state.answers;
    const  handleClickSearch = this.handleClickSearch.bind(this);
    const  requests  = $.map(this.state.requests, function(value, index) {
        return value.replace(/\(.+\)/i, "");
    });
    var answers =[];
    for(var i= answersTemp.length -1; i>= 0; i--){
        answers.push(answersTemp[i]);
    }
    return (
      <div className="recognitionPanel">
        { this.props.listening  ? 
            <Button bsStyle="danger" onClick={stopListening}><Glyphicon glyph="stop" /> stop</Button> : 
            <Button bsStyle="info" onClick={startListening }><Glyphicon glyph="play" /> start</Button> }	
        <div id="custom-search-input">
            <div className="input-group col-md-12">
                <input type="text" list="answers" className="form-control input-lg" id="speakInput" placeholder="Parle moi" />
                <datalist id="answers">
                { requests.map((request, index) => (
                    <option key={index} value={request}/>)
                )}
                </datalist>
                <span className="input-group-btn">
                    <button className="btn btn-info btn-lg" type="button" onClick={handleClickSearch}>
                        <i className="glyphicon glyphicon-search"></i>
                    </button>
                </span>
            </div>
        </div>
        <div id="chatUserServer" className="chat">
        { answers.map((answer, index) => (
            <Conversation key={index} orientation={answer.orientation} time={answer.time} text={answer.text} user={answer.user} />)
        )}
        </div>
      </div>
    );
  }
}

const options = {
  autoStart: true
};

VoiceRecognition.propTypes = propTypes;

export default SpeechRecognition(options)(VoiceRecognition)
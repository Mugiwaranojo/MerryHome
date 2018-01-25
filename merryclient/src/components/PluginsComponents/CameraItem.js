import React from 'react';

import {getStreamJPG} from '../../utils/merryhome-api';
import { emitEvent} from '../../utils/merryhome-api';

import { Button, Glyphicon } from 'react-bootstrap';
import './css/CameraItem.css';

class CameraItem extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { starting: false,
                       src: "video_blank.jpg" };    
    }
    
    handleClick(e) {
        var command = this.state.starting ? "stop" : "start";
        emitEvent(this.props.apiEvent, 
                 {"num": this.props.itemId,
                  "command": command});
        if(!this.state.starting){
            var self= this;
            this.setState({starting: true,
                           src: "loading.gif"});
            setTimeout(function(){
                self.setState({starting: true,
                               src: getStreamJPG(self.props.title+".jpg")});
            }, 5000);
        }else{
            this.setState({starting: false,
                       src: "video_blank.jpg"});
        }
    }
    
    render() {
        const srcImg= this.state.src;
        const buttonIcon= this.state.starting ? "stop" : "play";
        return (
                <div className="CameraItem">
                    <div>{this.props.title}</div>
                    <img id={this.props.title} src={srcImg} alt="video cam"/>
                    <Button className="btn btn-default"
                        type="button"
                        onClick={this.handleClick.bind(this)}>
                        <Glyphicon glyph={buttonIcon} /> 
                    </Button>
                </div>
            );
    }srcImg
};

export default CameraItem;
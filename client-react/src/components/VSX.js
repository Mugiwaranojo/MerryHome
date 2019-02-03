import React from 'react'
import PluginActionButton from "./PluginActionButton"
import ReactBootstrapSlider from "react-bootstrap-slider"
import {sendRequest} from '../utils/serverhome-api'
import './VSX.css';

class VSX extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            currentValue : 10
        };
        this.changeValue.bind(this);
    }
    
    changeValue(event){
        console.log("set vsx volume : "+event.target.value);
        sendRequest("vsx", "setVolumeSound", {value:event.target.value}).then((data)=>{
           console.log(data);
       });
    }
    
    render() {
        return (
            <div className='plugincontent plugin-vsx'>
                <div className="buttons">
                    <PluginActionButton pluginName="vsx" icon="off" action="powerOff" />
                    <PluginActionButton pluginName="vsx" icon="volume-off" action="muteSound" />
                    <PluginActionButton pluginName="vsx" icon="volume-down" action="decreaseSound" />
                    <PluginActionButton pluginName="vsx" icon="volume-up" action="increaseSound" />
                    <PluginActionButton pluginName="vsx" name="TV" action="channelTV" />
                    <PluginActionButton pluginName="vsx" name="PS4" action="channelGame" />
                </div>
                <ReactBootstrapSlider
                    value={this.state.currentValue}
                    slideStop={this.changeValue}
                    step={1}
                    max={60}
                    min={0}
                    orientation="honrizontal"
                    reversed={false}
                    />
            </div>  
        );
    }
};

export default VSX;
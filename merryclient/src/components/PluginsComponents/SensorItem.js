import React from 'react';

import {subscribeToEvent} from '../../utils/merryhome-api';
import { Glyphicon } from 'react-bootstrap';

import "./css/SensorItem.css"

class SensorItem extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { values: [] };
        subscribeToEvent(props.apiEventSubscribe, (function (data){
            if(!data.error){
                this.setState({values: data});
            }
        }).bind(this));
    }
    
    SensorItemType(){
        switch (this.props.title){
            case "temperature":
                var temp="N/A", hum="N/A"; 
                if(this.state.values.temperature){
                    temp = this.state.values.temperature;
                    hum  = this.state.values.humidity;
                }
                return (<div className="SensorItem">
                            <div>
                                <Glyphicon glyph="home" />
                                <span>{temp}°C</span>
                            </div>
                            <div>
                                <Glyphicon glyph="tint" />
                                <span>{hum}%</span>
                            </div>
                        </div>);
            case "photoresistance":
                var luxValue = 0;
                if(this.state.values.lux){
                    luxValue = this.state.values.lux;
                }
                if(luxValue){
                    luxValue= Math.round(luxValue/1000, -1);
                }
                return (<div className={"SensorItem photoresistance photoresistance_"+luxValue}>
                            <Glyphicon glyph="adjust" />
                        </div>);
            case "presence":
                var presenceValue = 0;
                if(this.state.values.presence){
                    presenceValue = this.state.values.presence;
                }
                return (<div className={"SensorItem presence presence_"+presenceValue}>
                            <Glyphicon glyph="screenshot" />
                        </div>);
            default:
                return "";
        }
    }
    
    
    render() {
        const SensorItemType = this.SensorItemType.bind(this);
        return (<SensorItemType />);
    }
};

export default SensorItem;
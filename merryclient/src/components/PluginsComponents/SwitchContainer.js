import React from 'react';

import './css/SwitchContainer.css';
import {subscribeToEvent, emitEvent} from '../../utils/merryhome-api';

class SwitchContainer extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { activated: props.activated };
        subscribeToEvent(props.apiEventSubscribe, (function (value){
            this.setState({activated: value});
        }).bind(this));
    }
    
    handleClick(e) {
        this.setState({activated: !this.state.activated});
        emitEvent(this.props.apiEvent, 
                 {"id": this.state.activated?"Off":"On",
                  "node": this.props.itemId});
    }
    
    render() {
    return (
        <div className="btn-group" aria-label={this.props.title}>
            <button 
              className={this.state.activated ? "btn btn-primary" : "btn btn-default"}
              type="button"
              onClick={this.handleClick.bind(this)}>
              ON
            </button>
            <button 
              className={this.state.activated ? "btn btn-default" : "btn btn-primary"}
              type="button" 
              onClick={this.handleClick.bind(this)}>
              OFF
            </button>
            <label>{this.props.title}</label>
        </div>
        );
    }
};

export default SwitchContainer;
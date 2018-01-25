import React from 'react';

import './css/Conversation.css';

class Conversation extends React.Component {
    
    render() {
        var now= new Date();
        var avatar= "";
        if(this.props.user===""){
            avatar = "http://placehold.it/50/55C1E7/fff&text=ME";
        }else{
            avatar = "http://placehold.it/50/FA6F57/fff&text=M";
        }
        var inverse = this.props.orientation==="left"? "right" : "left";
        return (             
            <div className={this.props.orientation+ " clearfix"}>
                <span className={"chat-img pull-"+this.props.orientation}>
                    <img src={avatar} alt="User Avatar" className="img-circle" />
                </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font pull-right">{this.props.user}</strong> 
                        <small className={"pull-"+inverse+" text-muted"}>
                            <span className="glyphicon glyphicon-time"></span>{ Math.floor((now.getTime() - this.props.time)/1000/60) } mins ago
                        </small>
                    </div>
                    <p>
                        {this.props.text}
                    </p>
                </div>
            </div>);
        
    }
};

export default Conversation;


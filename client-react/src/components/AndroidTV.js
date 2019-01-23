import React from 'react'
import PluginActionButton from "./PluginActionButton"
import './AndroidTV.css';

class AndroidTV extends React.Component {
    render() {
        var props = this.props; 
        return (
            <div className='plugincontent plugin-androidtv'>
                <div className="buttonscontrols">
                { props.viewInfo.items.controls.map((item, index) => (
                    <PluginActionButton key={index} itemType={props.viewInfo.itemType} pluginName={props.pluginName} name={item.name} icon={item.icon} action={item.action} data={item.data} />
                ))}
                </div>
                <div className="buttonschannels">
                { props.viewInfo.items.channels.map((item, index) => (
                    <PluginActionButton key={index} itemType={props.viewInfo.itemType} pluginName={props.pluginName} name={item.name} icon={item.icon} action={item.action} data={item.data} />
                ))}
                </div>
            </div>  
        );
    }
};

export default AndroidTV;
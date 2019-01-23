import React from 'react';
import PluginItem from "./PluginItem"
import AndroidTV from "./AndroidTV"

export default function PluginContent(props){
    if(props.viewInfo.type==="listItem"){
        return (
            <div className={'plugincontent plugin-'+props.pluginName}>
                { props.viewInfo.items.map((item, index) => (
                    <PluginItem key={index} itemType={props.viewInfo.itemType} pluginName={props.pluginName} name={item.name} icon={item.icon} action={item.action} data={item.data} device={item.device} />
                ))}  
            </div>
        );
    }else if(props.viewInfo.type==="AndroidTV"){
        return <AndroidTV viewInfo={props.viewInfo} pluginName={props.pluginName} />;
    }else{
        return <div></div>;
    }
}


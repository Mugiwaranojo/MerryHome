import React from 'react';
import SwitchContainer from './SwitchContainer';
import MediaItem from './MediaItem';
import InputItem from './InputItem';
import CameraItem from './CameraItem';
import SensorItem from './SensorItem';

import {
  Text
} from 'react-native';

export function PluginItem(props){
    if(props.itemType==="SwitchContainer"){
        return <SwitchContainer title={props.title} itemId={props.itemId} activated={props.activated}  apiEvent={props.apiEvent} apiEventSubscribe={props.apiEventSubscribe} />;
    }else if(props.itemType==="MediaItem"){
        return <MediaItem title={props.title} itemId={props.itemId} apiEvent={props.apiEvent} file={props.file} />;
    }else if(props.itemType==="Input"){
        return <InputItem itemId={props.itemId} apiEvent={props.apiEvent} type={props.type} icon={props.icon} title={props.title}/>;
    }else if(props.itemType==="CameraItem"){
        return <CameraItem title={props.title} itemId={props.itemId} apiEvent={props.apiEvent} activated={props.activated}/>;
    }else if(props.itemType==="SensorItem"){
        return <SensorItem title={props.title} apiEventSubscribe={props.apiEventSubscribe}/>;
    }else{
        return <Text></Text>;
    }
}
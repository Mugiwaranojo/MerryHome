import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  StyleSheet
} from 'react-native';
import { Text } from 'native-base';
import {subscribeToEvent} from '../../utils/merryhome-api';

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
                return (<View style={styles.sensor}>
                            <View style={styles.sensorValue}>
                                <Icon name="thermometer-half" size={22} color="#FFF" />
                                <Text style={{color:"white", marginLeft:10}}>{temp}°C</Text>
                            </View>
                            <View style={styles.sensorValue}>
                                <Icon name="tint" size={22} color="#FFF" />
                                <Text style={{color:"white", marginLeft:10}}>{hum}%</Text>
                            </View>
                        </View>);
            case "photoresistance":
                var luxValue = 0;
                if(this.state.values.lux){
                    luxValue = this.state.values.lux;
                }
                return (<View style={{
                                backgroundColor: luxValue > 80 ? "yellow" : "black",
                                flex: 1,
                                margin: 5,
                                borderRadius:10,
                                justifyContent: 'center', 
                                alignItems: 'center',
                                minHeight: 100
                              }}> 
                            <Icon name="adjust" size={22} color="#FFF"/>
                        </View>);
            case "presence":
                var presenceValue = 0;
                if(this.state.values.presence){
                    presenceValue = this.state.values.presence;
                }
                return (<View style={{
                                backgroundColor: presenceValue ? "yellow" : "green",
                                flex: 1,
                                margin: 5,
                                borderRadius:10,
                                justifyContent: 'center', 
                                alignItems: 'center',
                                minHeight: 100
                              }}> 
                            <Icon name="home" size={22} color="#FFF"/>
                        </View>);
            default:
                return <Text></Text>;
        }
    }
    
    
    render() {
        const SensorItemType = this.SensorItemType.bind(this);
        return (<SensorItemType />);
    }
};

const styles = StyleSheet.create({
  sensor: {
    backgroundColor: "blue",
    flex: 1,
    margin: 5,
    borderRadius:10,
    justifyContent: 'center', 
    alignItems: 'center',
    minHeight: 100
  },
  sensorValue:{
     flexDirection:'row',
     marginBottom:5
  }
});

export default SensorItem;
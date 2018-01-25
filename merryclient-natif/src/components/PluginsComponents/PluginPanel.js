import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import {PluginItem} from './PluginItem';
import InputItem from './InputItem';
import YoutubePanel from './YoutubePanel';
const backgroundImage= require("../../../assets/background.gif");

class PluginPanel extends React.Component {
    
    PluginContent(props){
        if(props.type==="List"){
            const controlButtons = props.controlePanel ? props.controlePanel.buttons : [];
            //console.log(props.controlePanel);
            return (
                    <ScrollView contentContainerStyle={styles.container}>
                        <Image source={backgroundImage} style={styles.background}/>
                        <View style={styles.panelControl}>
                        { controlButtons.map((item, index) => (
                            <InputItem key={index} itemId={item.itemId} apiEvent={item.event} type={item.type} icon={item.icon} title={item.title}/>
                        ))}
                        </View>
                        <View style={styles.list}>
                            { props.items.map((item, index) => (
                                 <PluginItem key={index} itemType={props.itemType} title={item.name? item.name:item.title} itemId={item.itemId} type={item.type} icon={item.icon} file={item.file} activated={item.activated}  apiEvent={item.event} apiEventSubscribe={item.eventSubscribe}/>
                            ))}
                        </View>
                    </ScrollView>
                    );
        }else if(props.type==="YoutubePanel"){
            return <YoutubePanel controlePanel={props.controlePanel}/>;
        }else{
            return (<View style={styles.container}><Text>en construction ...</Text></View>);
        }
    }
    
    render(){
        const PluginContent = this.PluginContent;
        return (
                <PluginContent type={this.props.type}  items={this.props.items} itemType={this.props.itemType} controlePanel={this.props.controlePanel}/>
                );
    }
};

export default PluginPanel;
    
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding:10,
    minHeight: window.height - 80
  },
  background: {
    position: "absolute",
    flex:1,
  },
  panelControl: {
    flexDirection:'row'
  },
  list:{
       flexWrap: 'wrap', 
       alignItems: 'flex-start',
       flexDirection:'row'
  }
});

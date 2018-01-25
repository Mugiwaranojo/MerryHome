import React from 'react';
import { getIdToken  } from '../../utils/AuthService';
import {getStreamJPG, emitEvent}  from '../../utils/merryhome-api';
import {
  StyleSheet,
  WebView,
  View,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Text } from 'native-base';

const blanckImage= require("../../../assets/video_blank.jpg");
const loadImage= require("../../../assets/loading.gif");

class CameraItem extends React.Component {
    
    constructor(props){
        super(props);
        var currentImage = props.activated ? <Image source={ loadImage } /> : <Image source={ blanckImage }/>;
        this.state = { starting: props.activated,
                       image:    currentImage};
        if(props.activated){
            var self = this;
            setTimeout(function(){
                getIdToken().then(token =>{
                    var camUri =  getStreamJPG(props.title+".jpg", token);
                    const CameraView = self.CameraView;
                    self.setState({starting: true,
                                   image: <CameraView url={ camUri  }/>});
                });       
            }, 5000);
        }
    }
    
    CameraView(props){
        return (<View>       
                    <WebView style={{width:320, height:240}}
                            automaticallyAdjustContentInsets={false}
                            scalesPageToFit={false}
                            startInLoadingState={false}
                            contentInset={{top: 0, right: 0, left: 0, bottom: 0}}
                            scrollEnabled={false}
                       source={{html: '<html><body style="background-color: black;"><img src="' + props.url + '"style="background-color: black;position: fixed; top: 0; left: 0;"></body></html>', baseUrl: '/'}} />
                </View>);
    }
    
    handleClick(e) {
        var command = this.state.starting ? "stop" : "start";
        emitEvent(this.props.apiEvent, 
                 {"num": this.props.itemId,
                  "command": command});
        if(!this.state.starting){
            var self= this;
            this.setState({starting: true,
                           image: <Image source={ loadImage  }/>});
            setTimeout(function(){
                getIdToken().then(token =>{
                    var camUri =  getStreamJPG(self.props.title+".jpg", token);
                    const CameraView = self.CameraView;
                    self.setState({starting: true,
                                   image: <CameraView url={ camUri  }/>});
                });       
            }, 5000);
        }else{
            this.setState({starting: false,
                           image: <Image source={ blanckImage  }/>});
        }
    }
    
    
    
    render() {
        const image= this.state.image;
        const buttonIcon= this.state.starting ? "stop" : "play";
        return ( 
                <View>
                    <Text style={{color:"#FFF"}}>{this.props.title}</Text>
                    { image  }
                    <Button style={{position:'absolute', right: 2, top: 22}}
                        onPress={this.handleClick.bind(this)}>
                        <Icon name={buttonIcon} size={22} color="#FFF" style={{padding:10}}/>
                    </Button>
                </View>
            );
    }
};

export default CameraItem;
import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Text } from 'native-base';
import { emitEvent} from '../../utils/merryhome-api';

class InputItem extends React.Component {
    
     constructor(props){
        super(props);
        this.state = { value: "" };    
    }
    
    InputTypeItem(){
        if(this.props.type==="button"){
            const title = this.props.icon ? <Icon name={this.props.icon} size={22} color="#FFF" style={{padding:10}}/> : <Text>{this.props.title}</Text>;
            return( <Button style={{margin: 5, flex:1, justifyContent: 'center', alignItems: 'center'}}
                        onPress={this.handleClick.bind(this)}>
                       {title}                           
                    </Button>);
        }else{
            return <Text></Text>;
        }
    }
    
    handleClick() {
        emitEvent(this.props.apiEvent, 
                 {"id": this.props.itemId});
    }
    
    handleChange(e){
        emitEvent(this.props.apiEvent, 
                 {"id": this.props.itemId,
                  "value":e.target.value});
        this.setState({value:e.target.value});
    }
    
    render() {
        
        const InputTypeItem = this.InputTypeItem.bind(this);
        return <InputTypeItem />;
    }
};

export default InputItem;
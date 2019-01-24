import React from 'react'
import { Form, FormGroup,FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap'
import {subscribeToEvent, emitEvent, sendRequest} from '../utils/serverhome-api'
import './Wikipedia.css';

class Wikipedia extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { searchValue: "",
                       shortResult: "",
                       isTable : false,
                       searchResult: null };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange (event) {
       this.setState({
            searchValue: event.target.value
        });
    }
    
    handleSubmit (event) {
        console.log("emit event wikipediasearch : "+this.state.searchValue);
        emitEvent("wikipediasearch", this.state.searchValue);
        var self= this;
        sendRequest("wikipedia", "whatis", {searchValue: this.state.searchValue}).then((data)=>{
            if(data.resultText){
                var utterThis = new SpeechSynthesisUtterance(data.resultText);
                utterThis.lang = 'fr-FR';
                console.log({"response":data.resultText});
                window.speechSynthesis.speak(utterThis);
                self.setState({
                    shortResult: data.resultText
                });
            }
        });
        if(event)
            event.preventDefault();
    }
    
    componentDidMount(){
        var self= this;
        subscribeToEvent("wikipediaresult", function(data){
            self.setState({
                searchResult: data.infos.replace(new RegExp("\/wiki\/", 'g'), "/plugin/wikipedia/"),
                isTable: data.isTable
            });
        });
        var lastPart = window.location.href.split("/").pop();
        if(lastPart !== "wikipedia"){
            this.state.searchValue= lastPart;
            this.handleSubmit(null);
        }
    }
    
    render() {
        var result = this.state.searchResult ? 
                        (this.state.isTable ?
                        <table dangerouslySetInnerHTML={{ __html: this.state.searchResult }} /> :
                        <div dangerouslySetInnerHTML={{ __html: this.state.searchResult }} />)
                    : "";
        return (
            <div className='plugincontent plugin-wikipedia'>
                <Form onSubmit={this.handleSubmit} inline>
                    <FormGroup controlId="formInlineName">
                        <ControlLabel>Search</ControlLabel>{' '}
                        <FormControl type="text" placeholder="terms" value={this.state.searchValue} onChange={this.handleChange} />
                    </FormGroup>{' '}
                    <Button type="submit"><Glyphicon glyph="search" /> </Button>
                </Form>
                <div className="shortResult">
                    <cite>{this.state.shortResult}</cite>
                </div> 
                <div className="result">
                    {result}
                </div> 
            </div>  
        );
    }
};

export default Wikipedia;
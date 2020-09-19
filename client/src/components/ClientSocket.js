import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5001";
const socket = socketIOClient(ENDPOINT)

class ClientSocket extends Component {
    constructor(props){
      super(props);
      this.state ={
        response: "",
        message: "",
      }
      this.clickButton = this.clickButton.bind(this);
      this.messageChange = this.messageChange.bind(this);
    }

    //Dev Note: I moved the socket variable out of the state because the socket does not have anything to do with the component's rendered content
    //// having the use this.state.socket.on (...) felt too much, and since moving it outside of the component does not break the chat app, i moved it outside
    //// I'm not sure if the socket.on(...) definitions should be place in the componentDidMount function, but I can keep it organized here to manage calling component functions from here
    componentDidMount(){
       
        socket.on('button-click-from-server', data => {
            this.setState({response: this.state.response + "\n" + data})
        });

        
    }
    
    clickButton(event) {
        console.log(this.state.message);
        this.setState({response: this.state.response + "\n" +this.state.message});
        socket.emit("button-click-from-client", this.state.message);
        event.preventDefault();
    }

    messageChange(event){
        this.setState({message: event.target.value});
    }

    render () {
        //TODO : The response output is putting all the messages on one line, need to make it look nicer
        return (
        <div>
          <p>{this.state.response}</p>
          <form onSubmit={this.clickButton}>
            <input type='text' onChange={this.messageChange} value={this.state.message} />
            <button type='submit'>send</button>
          </form>
        </div>
        );
    }
}

export default ClientSocket;
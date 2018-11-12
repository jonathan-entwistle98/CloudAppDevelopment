import React, {Component} from 'react';
import axios from "axios";

var numUsers = 5;
var users = [];
class Users extends Component {

    constructor(){
        super();
        this.state = {
            peopleObject: []
        }
    }

    componentDidMount(){
        axios.get('https://fkcoaovot5.execute-api.eu-west-2.amazonaws.com/default/getUsers').then( response => {
            this.setState({
                peopleObject: response
            });
        });
    }

    render(){

        if(this.state.peopleObject["data"] == undefined) {
            return null;
        }

        for(var i=0; i<this.state.peopleObject["data"]["Count"]; i++) {
            users.push(
                <option value={this.state.peopleObject["data"]["Items"][i]["userID"]}>{this.state.peopleObject["data"]["Items"][i]["userID"] + " " + this.state.peopleObject["data"]["Items"][i]["name"]}</option>
            );
        }

        return (
            users
        );

    }
}

export default Users;
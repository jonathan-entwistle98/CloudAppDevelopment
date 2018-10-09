import React, {Component} from 'react';

var numUsers = 5;
var users = [];
class Users extends Component {
    render(){
        for(var i=0; i<numUsers; i++) {
            users.push(
                <option value={'Placeholder' + i}>{'Placeholder' + i}</option>
            );
        }
        return (
            users
        );
    }
}

export default Users;
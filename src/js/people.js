import React, {Component} from 'react';
import axios from "axios";

class People extends Component {

    constructor(){
        super();
        this.state = {
            peopleObject: []
        }
        // this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        axios.get('https://fkcoaovot5.execute-api.eu-west-2.amazonaws.com/default/getUsers').then( response => {
            this.setState({
                peopleObject: response
            });
        });
    }

    deleteUser(userIDParam){
        $.ajax({
            type: "GET",
            url: "https://05a2ou2437.execute-api.eu-west-2.amazonaws.com/default/deleteUser?userID="+userIDParam,
            dataType: "json",
            success: function(data) {
                console.log("DeleteAjax!");
                console.log(data);
            }
        });
    }

    render(){

        if(this.state.peopleObject["data"] == undefined) {
            // console.log("#######");
            // console.dir(this.state.peopleObject["data"]);
            // console.log("#######");
            return null;
        }
        // console.log("++++++");
        // console.dir(this.state.peopleObject["data"]["Count"]);
        // console.log("++++++");

        var numPeople = 5;
        var people = [];
        people.push(
            <form method="GET" action="https://6qpjv26bl6.execute-api.eu-west-2.amazonaws.com/default/createUser" id="addNewUserForm" className="horizontalAlign">
                <div className="form-group horizontalAlign">
                    <label className="horizontalAlign marginForm" htmlFor="name">Add New User:</label>
                    <input type="text" className="form-control horizontalFullName marginForm" id="newPerson" placeholder="Full Name" name="name" />
                    <input type="number" className="form-control horizontalFullName marginForm" id="newPersonID" placeholder="ID Number" name="userID" />
                    <input type="password" className="form-control horizontalFullName marginForm" id="newPersonPassword" placeholder="Password" name="password" />
                </div>
                <div id="roleContainer" className="form-group horizontalAlign">
                    <select id="role" className="horizontalAlign" name="role">
                        <option value="" disabled selected>Select role</option>
                        <option value="admin">Admin</option>
                        <option value="developer">Developer</option>
                        <option value="auditor">Auditor</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary submitAlign">Submit</button>
            </form>
        )
        for(var i=0; i<this.state.peopleObject["data"]["Count"]; i++) {
            people.push(
                <div className="project row">
                    <div className="assignedProjects centerText2 col-md-3">
                        {this.state.peopleObject["data"]["Items"][i]["userID"]}
                    </div>
                    <div className="firstAndLastNames centerText2 col-md-3">
                        {this.state.peopleObject["data"]["Items"][i]["name"]}
                    </div>
                    <div className="permissionLevel centerText2 col-md-4">
                        {this.state.peopleObject["data"]["Items"][i]["role"]}
                    </div>
                    <div className="permissionLevel centerText2 col-md-1">
                        <button className="btn btn-success deleteAndEditButtons">Edit</button>
                    </div>
                    <div className="permissionLevel centerText2 col-md-1">
                        <button value={this.state.peopleObject["data"]["Items"][i]["userID"]} onClick={() => this.deleteUser} className="btn btn-danger deleteAndEditButtons">Delete</button>
                    </div>
                </div>
            );
        }
        return (
            people
        );
    }
}

export default People;
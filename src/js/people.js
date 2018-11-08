import React, {Component} from 'react';
import axios from "axios";

class People extends Component {

    constructor(){
        super();
        this.state = {
            peopleObject: [],
        }
    }

    hideform;

    componentDidMount(){
        axios.get('https://fkcoaovot5.execute-api.eu-west-2.amazonaws.com/default/getUsers').then( response => {
            this.setState({
                peopleObject: response
            });
        });
        this.hideAddNewUserForm();
    }

    deleteUser(event){
        $.ajax({
            type: "GET",
            url: "https://05a2ou2437.execute-api.eu-west-2.amazonaws.com/default/deleteUser?userID="+event.target.value,
            dataType: "json",
            success: function(data) {
                console.log("success!");
            }
        });
        window.setTimeout(1000);
        location.reload();
        return false;
    }

    createUser(event){
        var queryString = $('#addNewUserForm').serialize();
        console.log("queryString is: https://6qpjv26bl6.execute-api.eu-west-2.amazonaws.com/default/createUser?" + queryString);
        $.ajax({
            type: "GET",
            url: "https://6qpjv26bl6.execute-api.eu-west-2.amazonaws.com/default/createUser?"+queryString,
            dataType: "json",
            success: function(data) {
                console.log("success!");
            }
        });
        window.setTimeout(1000);
        location.reload();
        return false;
    }

    hideAddNewUserForm(){
        console.log("role cookieValue is: " + getCookieValue("role"));
        if(getCookieValue("role") != "admin") {
            this.hideform = false;
        }else{
            this.hideform = true;
        }
    }

    render(){

        if(this.state.peopleObject["data"] == undefined) {
            return null;
        }

        var numPeople = 5;
        var people = [];
        people.push(
            <form id="addNewUserForm" className={"horizontalAlign " + (this.hideForm ? 'show' : 'hidden')} onLoad={(e) => this.hideAddNewUserForm(e)} onSubmit={(e) => {this.createUser(); e.preventDefault();}}>
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
            </form>,
            <div class="project row">
                <div class="assignedProjects centerText2 col-md-3">
                    <b>User ID</b>
                </div>
                <div class="firstAndLastNames centerText2 col-md-3">
                    <b>User Name</b>
                </div>
                <div class="permissionLevel centerText2 col-md-4">
                    <b>User Role</b>
                </div>
            </div>

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
                        <button className={"btn btn-success deleteAndEditButtons " + (this.hideForm ? 'show' : 'hidden')}>Edit</button>
                    </div>
                    <div className="permissionLevel centerText2 col-md-1">
                        <button onClick={this.deleteUser} value={this.state.peopleObject["data"]["Items"][i]["userID"]} className={"btn btn-danger deleteAndEditButtons " + (this.hideForm ? 'show' : 'hidden')}>Delete</button>
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
import React, {Component} from 'react';
import axios from "axios";
import moment from "moment";

class People extends Component {

    constructor(){
        super();
        this.state = {
            peopleObject: [],
        }
    }

    hideForm;

    componentDidMount(){
        axios.get('https://fkcoaovot5.execute-api.eu-west-2.amazonaws.com/default/getUsers').then( response => {
            this.setState({
                peopleObject: response
            });
        });
        this.hideAddNewUserForm();
    }

    showCreateUserForm(){
        document.getElementById("addNewUserForm").classList.remove("hidden2");
        document.getElementById("newPeopleLabel").innerHTML = "Add New User: ";
        $('#addNewUserForm').trigger("reset");
        $('#newPersonID').prop('readonly', false);
        document.cookie = "deleteUser=newUser; expires=Thu, 19 Dec 2019 12:00:00 UTC; path=/";
    }

    hideCreateUserForm(){
        document.getElementById("addNewUserForm").classList.add("hidden2");
    }

    showEditUserForm(event){

        document.cookie = "deleteUser=deleteEdit; expires=Thu, 19 Dec 2019 12:00:00 UTC; path=/";
        document.getElementById("addNewUserForm").classList.remove("hidden2");
        document.getElementById("newPeopleLabel").innerHTML = "Edit User: ";
        var userArrayInformation = event.target.value.split(",");
        document.getElementById("newPersonID").value = userArrayInformation[0];
        document.getElementById("newPerson").value = userArrayInformation[1];
        document.getElementById("newPersonPassword").value = userArrayInformation[2];
        document.getElementById("role").value = userArrayInformation[3];
        $('#newPersonID').prop('readonly', true);
    }

    deleteUser(event){
        $.ajax({
            type: "GET",
            url: "https://05a2ou2437.execute-api.eu-west-2.amazonaws.com/default/deleteUser?userID="+event.target.value,
            dataType: "json",
            success: function(data) {
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
        });
        window.setTimeout(1000);
        location.reload();
        return false;
    }

    createUser(event){
        var queryString = $('#addNewUserForm').serialize();
        var userIDToDelete = document.getElementById("newPersonID").value;
        if(document.cookie.indexOf('deleteEdit')!= -1) {
            $.ajax({
                type: "GET",
                url: "https://05a2ou2437.execute-api.eu-west-2.amazonaws.com/default/deleteUser?userID="+userIDToDelete,
                dataType: "json",
                success: function(data) {
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus); alert("Error: " + errorThrown);
                }
            });
        }

        $.ajax({
            type: "GET",
            url: "https://6qpjv26bl6.execute-api.eu-west-2.amazonaws.com/default/createUser?"+queryString,
            dataType: "json",
            success: function(data) {
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
        });
        window.setTimeout(2000);
        location.reload();
        return false;
    }

    hideAddNewUserForm(){
        if(getCookieValue("role") != "admin") {
            this.hideForm = false;
        }else{
            this.hideForm = true;
        }
    }

    removeFilters(classNames){
        for(var k=0; k<document.getElementsByClassName(classNames).length; k++){
            document.getElementsByClassName(classNames)[k].classList.remove("hidden");
        }
    }

    searchPeople(){
        removeFilters("peopleContainer");
        var searchText = document.getElementById("searchPeople").value.toLowerCase();

        var peopleNames = [];
        var peopleNamesDivs = document.getElementsByClassName("firstAndLastNames");
        for(var k=0; k<peopleNamesDivs.length; k++){
            if(!peopleNamesDivs[k].innerHTML.toLowerCase().includes(searchText) && !peopleNamesDivs[k].innerHTML.toLowerCase().includes("user name")){
                peopleNamesDivs[k].parentNode.classList.add("hidden");
            }
        }
    }

    render(){

        if(this.state.peopleObject["data"] == undefined) {
            return null;
        }

        var people = [];
        people.push(
            <form id="addNewUserForm" className={"horizontalAlign hidden2 " + (this.hideForm ? 'show' : 'hidden')} onLoad={(e) => this.hideAddNewUserForm(e)} onSubmit={(e) => {this.createUser(); e.preventDefault();}}>
                <div className="form-group horizontalAlign">
                    <label id="newPeopleLabel" className="horizontalAlign marginForm" htmlFor="name">Add New User:</label>
                    <input type="number" className="form-control horizontalFullName marginForm" id="newPersonID" placeholder="ID Number" name="userID" />
                    <input type="text" className="form-control horizontalFullName marginForm" id="newPerson" placeholder="Full Name" name="name" />
                    <input type="password" className="form-control horizontalFullName marginForm addUserPassword" id="newPersonPassword" placeholder="Password" name="password" />
                </div>
                <div id="roleContainer" className="form-group horizontalAlign">
                    <select id="role" className="horizontalAlign form-control" name="role">
                        <option value="" disabled selected>Select role</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="developer">Developer</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary submitAlign">Submit</button>
                <button type="button" className="btn btn-danger" onClick={this.hideCreateUserForm}>Cancel</button>
            </form>,
            <div id="searchByDiv">
                <label id="searchPeopleLabel" htmlFor="searchPeople">Search by Name:</label>
                <input type="text" className="form-control" id="searchPeople" />
                <button type="button" className="btn btn-primary" onClick={this.searchPeople}>Search</button>
            </div>,
            <div className="project row">
                <div className="assignedProjects centerText2 col-md-3">
                    <b>User ID</b>
                </div>
                <div className="firstAndLastNames centerText2 col-md-3">
                    <b>User Name</b>
                </div>
                <div className="permissionLevel centerText2 col-md-4">
                    <b>User Role</b>
                </div>
                <div className="permissionLevel centerText2 col-md-2">
                    <button id="createNewUserButton" className={"btn btn-primary "+(this.hideForm ? 'show' : 'hidden')} onClick={this.showCreateUserForm}>Create New User</button>
                </div>

            </div>

        )
        for(var i=0; i<this.state.peopleObject["data"]["Count"]; i++) {

            var userInfoArray = [];
            userInfoArray[0] = this.state.peopleObject["data"]["Items"][i]["userID"]
            userInfoArray[1] = this.state.peopleObject["data"]["Items"][i]["name"];
            userInfoArray[2] = this.state.peopleObject["data"]["Items"][i]["password"];
            userInfoArray[3] = this.state.peopleObject["data"]["Items"][i]["role"];

            people.push(
                <div className="peopleContainer project row">
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
                        <button onClick={this.showEditUserForm} value={userInfoArray} className={"btn btn-success deleteAndEditButtons " + (this.hideForm ? 'show' : 'hidden')}>Edit</button>
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
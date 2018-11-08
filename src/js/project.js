import React, {Component} from 'react';
import moment from 'moment';

class Project extends Component {

    hideform;

    componentDidMount() {
        this.hideAddNewUserForm();
    }

    hideAddNewUserForm(){
        console.log("role cookieValue is: " + getCookieValue("role"));
        if(getCookieValue("role") != "admin") {
            this.hideform = false;
        }else{
            this.hideform = true;
        }
    }

    deleteProject(event){
        $.ajax({
            type: "GET",
            url: "https://jw33jclele.execute-api.eu-west-2.amazonaws.com/default/deleteProject?name="+event.target.value,
            dataType: "json",
            success: function(data) {
                console.log("success!");
            }
        });
        window.setTimeout(1000);
        location.reload();
        return false;
    }

    render() {
        var date = new Date(this.props.value["timedate"]);
        var statusText = "";
        if(this.props.value["status"] == "green"){
            statusText = "Testing In Progress";
        }else if(this.props.value["status"] == "orange"){
            statusText = "Dev in Progress";
        }else if(this.props.value["status"] == "red"){
            statusText = "Not yet started";
        }
        return (
            <div className="project row">
                <div className="projectLeader centerText2 col-md-2">
                    {this.props.value["name"]}
                </div>
                <div className="projectDescription centerText2 col-md-4">
                    {this.props.value["description"]}
                </div>
                <div className={this.props.value["status"] + ' centerText2  col-md-2'}>
                    <h5><b>
                    {statusText}
                    </b></h5>
                </div>
                <div className="projectStartDate centerText2 col-md-3">
                    Last Edited: {moment(date).fromNow()}
                </div>
                <div className="permissionLevel centerText2 col-md-1">
                    <button onClick={this.deleteProject} value={this.props.value["name"]} className={"btn btn-danger deleteAndEditButtons " + (this.hideForm ? 'show' : 'hidden')}>Delete</button>
                </div>
            </div>
        );
    }
}
export default Project;
import React, {Component} from 'react';
import moment from 'moment';

class Project extends Component {

    hideForm;
    ones;
    tens;
    teens;
    multipleContributorsOnly;

    constructor(props) {
        super(props);
        this.ones = ['','one','two','three','four','five','six','seven','eight','nine'];
        this.tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
        this.teens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
        this.hideAddNewUserForm();
    }

    setContributorsNames(projectInfoArray){
         var multipleContributors = "";
         multipleContributors = projectInfoArray[2].split("-");

        this.multipleContributorsOnly = [];
        for (var j=0; j<multipleContributors.length-1; j++){
            this.multipleContributorsOnly += (multipleContributors[j]);
            if(j!=multipleContributors.length-2){
                this.multipleContributorsOnly += ", ";
            }
        }
    }

    createProject(formName){
        var queryString = $('#createProjectForm+formName').serialize();
        $.ajax({
            type: "GET",
            url: "https://1xi9dx0p17.execute-api.eu-west-2.amazonaws.com/default/createProject?"+queryString,
            dataType: "json",
            success: function(data) {
            }
        });
        window.setTimeout(1000);
        location.reload();
        return false;
    }

    hideAddNewUserForm(){
        if(getCookieValue("role") == "developer") {
            this.hideForm = false;
        }else{
            this.hideForm = true;
        }
    }

    convert_millions(num){
        if (num>=1000000){
            return this.convert_millions(Math.floor(num/1000000))+" million "+this.convert_thousands(num%1000000);
        }
        else {
            return this.convert_thousands(num);
        }
    }

    convert_thousands(num){
        if (num>=1000){
            return this.convert_hundreds(Math.floor(num/1000))+" thousand "+this.convert_hundreds(num%1000);
        }
        else{
            return this.convert_hundreds(num);
        }
    }

    convert_hundreds(num){
        if (num>99){
            return this.ones[Math.floor(num/100)]+" hundred "+this.convert_tens(num%100);
        }
        else{
            return this.convert_tens(num);
        }
    }

    convert_tens(num){
        if (num<10) return this.ones[num];
        else if (num>=10 && num<20) return this.teens[num-10];
        else{
            return this.tens[Math.floor(num/10)]+" "+this.ones[num%10];
        }
    }

    convert(num){
        if (num==0) return "zero";
        else return this.convert_millions(num);
    }

    editProject(event){
        document.getElementById("createProjectForm").classList.remove("hidden");
        document.cookie = "deleteProject=yes; expires=Thu, 19 Dec 2019 12:00:00 UTC; path=/";
        var splitArray = event.target.value.split(',');
        document.getElementById("name").value = splitArray[0];
        document.getElementById("description").value = splitArray[1];
        document.getElementById("status").value = splitArray[3];

        var multipleContributors = [];
        multipleContributors = splitArray[2].split("-");

        var multipleContributorsOnly = [];
        for (var j=0; j<multipleContributors.length-1; j++){
            multipleContributorsOnly.push(multipleContributors[j]);
        }
        $("#leader").val(multipleContributorsOnly);

        var selectedIndex = null;

        if(splitArray[3] == "red"){
            selectedIndex = 0;
        }else if(splitArray[3] == "orange") {
            selectedIndex = 1;
        }else if(splitArray[3] == "green") {
            selectedIndex = 2;
        }
        var status = document.getElementById("status");
        status.options[status.options.selectedIndex].selected = true;
        $('.selectpicker').selectpicker('refresh');
    }

    deleteProject(event){
        $.ajax({
            type: "GET",
            url: "https://jw33jclele.execute-api.eu-west-2.amazonaws.com/default/deleteProject?name="+event.target.value,
            dataType: "json",
            success: function(data) {
            }
        });
        window.setTimeout(1000);
        location.reload();
        return false;
    }

    render() {
        var date = new Date(this.props.value["returnedObject"]["timedate"]);
        var statusText = "";
        var projectInfoArray = [];
        projectInfoArray[0] = this.props.value["returnedObject"]["name"];
        projectInfoArray[1] = this.props.value["returnedObject"]["description"];
        projectInfoArray[2] = this.props.value["returnedObject"]["leader"];
        projectInfoArray[3] = this.props.value["returnedObject"]["status"];
        projectInfoArray[4] = moment(date).fromNow();
        this.setContributorsNames(projectInfoArray);

        if(this.props.value["returnedObject"]["status"] == "green"){
            statusText = "Testing In Progress";
        }else if(this.props.value["returnedObject"]["status"] == "orange"){
            statusText = "Dev in Progress";
        }else if(this.props.value["returnedObject"]["status"] == "red"){
            statusText = "Not yet started";
        }

        return (
            <div className="projectContainer">
                <div className="card row">
                    <div className="card-header">
                        <a className="card-link collapsed" data-toggle="collapse" href={"#collapse" + this.convert(this.props.value["objectListPosition"])}>
                        <div className="project">
                            <div className="projectNames projectLeader centerText2 col-md-2">
                                {this.props.value["returnedObject"]["name"]}
                            </div>
                            <div className="projectDescription centerText2 col-md-4">
                                {this.props.value["returnedObject"]["description"]}
                            </div>
                            <div className={this.props.value["returnedObject"]["status"] + ' centerText2  col-md-2'}>
                                <h5><b style={{color: 'white'}}>
                                {statusText}
                                </b></h5>
                            </div>
                            <div className="projectStartDate centerText2 col-md-2">
                                {moment(date).fromNow()}
                            </div>
                            <div className="centerText2 col-md-1">
                                <button onClick={this.editProject} value={projectInfoArray} className={"btn btn-success editProjectButtons " + (this.hideForm ? 'show' : 'hidden')}>Edit</button>
                            </div>
                            <div className="centerText2 col-md-1">
                                <button onClick={this.deleteProject} value={this.props.value["returnedObject"]["name"]} className={"btn btn-danger deleteAndEditButtons " + (this.hideForm ? 'show' : 'hidden')}>Delete</button>
                            </div>
                        </div>
                        </a>
                    </div>
                </div>
                <div id={"collapse"+this.convert(this.props.value["objectListPosition"])} className="collapse" data-parent="#accordion" style={{height: 0 + 'px'}}>
                    <div className="card-body">
                        <div><b>Project Name:</b> {this.props.value["returnedObject"]["name"]}</div>
                        <div><b>Project Description:</b> {this.props.value["returnedObject"]["description"]}</div>
                        <div><b>Project Status:</b> {this.props.value["returnedObject"]["status"]}</div>
                        <div><b>Assigned Developers (UserIDs):</b> {this.multipleContributorsOnly}</div>
                        <div><b>Last Edited On: </b> {date.toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Project;
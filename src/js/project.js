import React, {Component} from 'react';
import moment from 'moment';

class Project extends Component {

    hideform;
    ones;
    tens;
    teens;

    componentDidMount() {
        this.hideAddNewUserForm();
    }

    constructor(props) {
        super(props);
        this.ones = ['','one','two','three','four','five','six','seven','eight','nine'];
        this.tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
        this.teens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    }

    hideAddNewUserForm(){
        console.log("role cookieValue is: " + getCookieValue("role"));
        if(getCookieValue("role") != "admin") {
            this.hideform = false;
        }else{
            this.hideform = true;
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
        var date = new Date(this.props.value["returnedObject"]["timedate"]);
        var statusText = "";
        if(this.props.value["returnedObject"]["status"] == "green"){
            statusText = "Testing In Progress";
        }else if(this.props.value["returnedObject"]["status"] == "orange"){
            statusText = "Dev in Progress";
        }else if(this.props.value["returnedObject"]["status"] == "red"){
            statusText = "Not yet started";
        }
        return (
            <div>
                <div className="card row">
                    <div className="card-header">
                        <a className="card-link collapsed" data-toggle="collapse" href={"#collapse" + this.convert(this.props.value["objectListPosition"])}>
                        <div className="project">
                            <div className="projectLeader centerText2 col-md-2">
                                {this.props.value["returnedObject"]["name"]}
                            </div>
                            <div className="projectDescription centerText2 col-md-4">
                                {this.props.value["returnedObject"]["description"]}
                            </div>
                            <div className={this.props.value["returnedObject"]["status"] + ' centerText2  col-md-2'}>
                                <h5><b>
                                {statusText}
                                </b></h5>
                            </div>
                            <div className="projectStartDate centerText2 col-md-3">
                                Last Edited: {moment(date).fromNow()}
                            </div>
                            <div className="permissionLevel centerText2 col-md-1">
                                <button onClick={this.deleteProject} value={this.props.value["returnedObject"]["name"]} className={"btn btn-danger deleteAndEditButtons " + (this.hideForm ? 'show' : 'hidden')}>Delete</button>
                            </div>
                        </div>
                        </a>
                    </div>
                </div>
                <div id={"collapse"+this.convert(this.props.value["objectListPosition"])} className="collapse" data-parent="#accordion" style={{height: 0 + 'px'}}>
                    <div className="card-body">
                        {this.props.value["returnedObject"]["name"]} {this.props.value["returnedObject"]["description"]} {this.props.value["returnedObject"]["status"]} {moment(date).fromNow()}
                    </div>
                </div>
            </div>
        );
    }
}
export default Project;
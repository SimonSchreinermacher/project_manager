import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import {isValidToken, getUsernameFromToken} from '../../services/AuthenticationManager.js';
import {axiosAuthenticatedCall} from '../../services/AxiosManager.js';
import './styles.css';

class CreateProject extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: "",
            language: "",
            deadline: ""
        };
    }

    cancelCreating(event){
        event.preventDefault();
        this.props.history.push('/');
    }

    handleSubmit(event){
        event.preventDefault();
        const username = getUsernameFromToken(localStorage.getItem("token"))

        const createdOn = moment().format().slice(0,10); //Generates a string of current time in format yyyy-mm-dd
        const data = {name: this.state.name, description: this.state.description, language: this.state.language, createdOn: createdOn, deadline: this.state.deadline}
        function onSuccess(res){
            this.props.history.push("/")
            window.location.reload();
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("post", "http://localhost:8080/" + username + "/projects", data, onSuccess.bind(this), onError.bind(this))
    }

    componentDidMount() {
        if(!isValidToken(localStorage.getItem("token"))){
            this.props.history.push("/login")
        }
    }

    render(){
        return(
            <div class="create-project-body">
                <form onSubmit={this.cancelCreating.bind(this)}>
                    <button class="btn btn-danger" type="submit">Cancel</button>
                </form>

                <h1 class="create-project-header">Create a new project</h1>

                <form class="form-group" onSubmit={this.handleSubmit.bind(this)}>
                    <p>Name</p>
                    <input class="form-control create-project-form" required onChange={e => this.setState({name: e.target.value})}></input>

                    <p>Description</p>
                    <textarea class="form-control create-project-form" required onChange={e => this.setState({description: e.target.value})}></textarea>

                    <p>Language</p>
                    <select class="form-control create-project-form" required onChange={e => this.setState({language: e.target.value})}>
                        <option selected disabled hidden></option>
                        <option>Python</option>
                        <option>Java</option>
                        <option>JavaScript</option>
                        <option>C</option>
                    </select>

                    <p>Deadline</p>
                    <input class="form-control create-project-form" type="date" onChange={e => this.setState({deadline: e.target.value})}></input>

                    <br></br>

                    <button class="btn btn-primary" type="submit">Add new project</button>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateProject);
import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import {isValidToken} from '../services/AuthenticationManager.js';
import {axiosAuthenticatedCall} from '../services/AxiosManager.js';

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
        axiosAuthenticatedCall("post", "http://localhost:8080/projects", data, onSuccess.bind(this), onError.bind(this))
    }

    componentDidMount() {
        if(!isValidToken(localStorage.getItem("token"))){
            this.props.history.push("/login")
        }
    }

    render(){
        return(
            <div>
                <form onSubmit={this.cancelCreating.bind(this)}>
                    <button type="submit">Cancel</button>
                </form>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p>Name</p>
                    <input required onChange={e => this.setState({name: e.target.value})}></input>

                    <p>Description</p>
                    <textarea required onChange={e => this.setState({description: e.target.value})}></textarea>

                    <p>Language</p>
                    <select required onChange={e => this.setState({language: e.target.value})}>
                        <option selected disabled hidden></option>
                        <option>Python</option>
                        <option>Java</option>
                        <option>JavaScript</option>
                        <option>C</option>
                    </select>

                    <p>Deadline</p>
                    <input required type="date" onChange={e => this.setState({deadline: e.target.value})}></input>

                    <br></br>

                    <button type="submit">Add new project</button>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateProject);
import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import {isValidToken} from '../../services/AuthenticationManager.js';
import './styles.css';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm_password: "",
            error_message: ""
        }
    }

    handleRegister(event){
        event.preventDefault();
        if(this.state.password !== this.state.confirm_password){
            this.setState({error_message: "Password and Confirm Password do not match"});
        }
        else{
            const data = {username: this.state.username, password: this.state.password}
            axios.post("http://localhost:8080/register", data)
            .then((res) => {
                this.props.history.push("/login");
            })
            .catch((err) => {
                if(err.request && !err.response){
                    this.setState({error_message: "Server unreachable"})
                }
                else{
                    if(err.response.status === 409){
                        this.setState({error_message: "Username already in use!"})
                    }
                }
                console.log(err);
            })
        }
    }

    componentDidMount() {
        if(isValidToken(localStorage.getItem("token"))){
            this.props.history.push("/")
        }
    }

    render(){
        let errorAlert;
        if(this.state.error_message !== ""){
            errorAlert = <Alert variant="danger">{this.state.error_message}</Alert>
        } 

        return(<div class="authentication-body">
            {errorAlert}
            <p>Register new account:</p>
            <form class="form-group" onSubmit={this.handleRegister.bind(this)}>
                <p>Username:</p>
                <input class="form-control" required onChange={e => this.setState({username: e.target.value})}></input>

                <br></br>
                <p>Password:</p>
                <input class="form-control" type="password" required onChange={e => this.setState({password: e.target.value})}></input>
                <br></br>

                <p>Confirm Password:</p>
                <input class="form-control" type="password" required onChange={e => this.setState({confirm_password: e.target.value})}></input>
                <br></br>
                <button class="btn btn-primary" type="submit">Register new account</button>
            </form>
            <NavLink to="/login">Already have an account? Click here</NavLink>
        </div>
        );
    }
}

export default Register;
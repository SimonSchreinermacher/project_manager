import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import {Alert} from 'react-bootstrap';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            error_message: ""
        }
    }

    handleRegister(event){
        event.preventDefault();
        const data = {username: this.state.username, password: this.state.password}
        axios.post("http://localhost:8080/register", data)
        .then((res) => {
            this.props.history.push("/login");
        })
        .catch((err) => {
            if(err.response.status === 409){
                this.setState({error_message: "Username already in use!"})
            }
            console.log(err);
        })
    }

    render(){
        let errorAlert;
        if(this.state.error_message !== ""){
            errorAlert = <Alert variant="danger">{this.state.error_message}</Alert>
        } 

        return(<div>
            {errorAlert}
            <p>Register new account:</p>
            <form onSubmit={this.handleRegister.bind(this)}>
                <p>Username:</p>
                <input onChange={e => this.setState({username: e.target.value})}></input>

                <br></br>
                <p>Password:</p>
                <input onChange={e => this.setState({password: e.target.value})}></input>
                <button type="submit">Register new account</button>
            </form>
            <NavLink to="/login">Already have an account? Click here</NavLink>
        </div>
        );
    }
}

export default Register;
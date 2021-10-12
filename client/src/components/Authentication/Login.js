import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import { isValidToken } from '../../services/AuthenticationManager.js';
import './styles.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            input_name: "",
            input_password: "",
            wrong_credentials: false
        }
    }

    handleLogin(event){
        event.preventDefault();
        console.log(this.state.input_name)
        console.log(this.state.input_password)
        const data = {username: this.state.input_name, password: this.state.input_password}
        axios.post("http://localhost:8080/login", data)
        .then((res) => {
            localStorage.setItem("token", res.data);
            this.props.history.push('/');
        })
        .catch((err) => {
            this.setState({wrong_credentials: true})
            console.log(err);
        })
    }

    componentDidMount() {
        if(isValidToken(localStorage.getItem("token"))){
            this.props.history.push("/")
        }
    }

    render(){
        let error_message;
        if(this.state.wrong_credentials){
            error_message = <Alert variant="danger">Wrong username or password</Alert>
        }
        return(
            <div class="authentication-body">
                {error_message}
                <p>Login with existing account:</p>
                <form class="form-group" onSubmit={this.handleLogin.bind(this)}>
                    <div >
                    <p>Enter username</p>
                    <input class="form-control" onChange={e => this.setState({input_name: e.target.value})}></input>
                    </div>
                    <br></br>
                    <p>Enter password</p>
                    <input class="form-control" type="password" onChange={e => this.setState({input_password: e.target.value})}></input>
                    <br></br>
                    <button class="btn btn-primary" type="submit">Login</button>
                </form>
                <NavLink to="/register">Dont have an account? Click here</NavLink>
            </div>
        );
    }
}

export default Login;
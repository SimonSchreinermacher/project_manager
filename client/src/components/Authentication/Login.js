import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './styles.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            input_name: "",
            input_password: ""
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
            console.log(err);
        })
    }

    render(){
        return(
            <div class="authentication-body">
                <p>Login with existing account:</p>
                <form class="form-group" onSubmit={this.handleLogin.bind(this)}>
                    <div >
                    <p>Enter username</p>
                    <input class="form-control" onChange={e => this.setState({input_name: e.target.value})}></input>
                    </div>
                    <br></br>
                    <p>Enter password</p>
                    <input class="form-control" onChange={e => this.setState({input_password: e.target.value})}></input>
                    <br></br>
                    <button class="btn btn-primary" type="submit">Login</button>
                </form>
                <NavLink to="/register">Dont have an account? Click here</NavLink>
            </div>
        );
    }
}

export default Login;
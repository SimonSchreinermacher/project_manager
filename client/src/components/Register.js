import React from 'react';
import axios from 'axios';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
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
            console.log(err);
        })
    }

    render(){
        return(<div>
            <p>Register new account:</p>
            <form onSubmit={this.handleRegister.bind(this)}>
                <p>Username:</p>
                <input onChange={e => this.setState({username: e.target.value})}></input>

                <br></br>
                <p>Password:</p>
                <input onChange={e => this.setState({password: e.target.value})}></input>
                <button type="submit">Register new account</button>
            </form>
        </div>
        );
    }
}

export default Register;
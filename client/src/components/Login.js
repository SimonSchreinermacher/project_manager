import React from 'react';
import axios from 'axios';

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
            
            this.props.history.push('/home');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <div>
                <p>Please log in!</p>
                <form onSubmit={this.handleLogin.bind(this)}>
                    <p>Enter username</p>
                    <input onChange={e => this.setState({input_name: e.target.value})}></input>
                    <br></br>
                    <p>Enter password</p>
                    <input onChange={e => this.setState({input_password: e.target.value})}></input>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
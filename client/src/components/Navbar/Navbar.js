import React from 'react';
import {getUsernameFromToken, isValidToken} from '../../services/AuthenticationManager.js';
import './styles.css'

class Navbar extends React.Component {

    handleLogout(event){
        event.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push("/login");
    }

    render(){
        let loggedInNavbar;
        if(isValidToken(localStorage.getItem('token'))){
            const user = getUsernameFromToken(localStorage.getItem('token'))
            loggedInNavbar = <div class="navbar-nav ms-auto">
                                <p class= "navbar-text navbar-nav navbar-loggedin">Logged in as {user}</p>
                                <form class="navbar-form navbar-logout" onSubmit={this.handleLogout.bind(this)}>
                                    <button class="btn btn-primary" type="submit">Log out</button>
                                </form>
                            </div>
        }
        return(
        <div>
            <nav class= "navbar navbar-expand-sm navbar-dark bg-dark">
                <a class= "navbar-brand navbar-logo" href="/">Project Manager</a>
                {loggedInNavbar}
            </nav>
        </div>
        );
    }
}


export default Navbar;
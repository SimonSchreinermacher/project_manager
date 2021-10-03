import React from 'react';
import axios from 'axios';
import {NavLink, withRouter} from 'react-router-dom';
import {authToken} from './AuthenticationManager.js';


class ProjectList extends React.Component {

    constructor(props){
        super(props);
        this.state={
            projects: []
        }
    }

    handleLogout(event){
        event.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push("/login");
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.history.push("/create");
    }

    componentDidMount(){
        authToken(localStorage.getItem("token"));
        axios.all([
            axios.post("http://localhost:8080/refreshtoken", {token: localStorage.getItem("token")}),
            axios.get("http://localhost:8080/projects")
        ])
        .then(axios.spread((res1, res2) => {
            localStorage.setItem("token", res1.data)
            this.setState({projects: res2.data})
        }))
        .catch((err) => {
            console.log(err);
            this.props.history.push("/login")
        })
        
    }

    render(){
        const project_list = this.state.projects.map(project => 
            <div key={project.project_id.toString()}>
                <NavLink to={"/project/" + project.project_id}>{project.name}</NavLink>
            </div>
            );

        return(
        <div>
            <form onSubmit={this.handleLogout.bind(this)}>
                <button type="submit">Log out</button>
            </form>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <button type="submit">Add new project</button>
            </form>
            <h1>Your projects:</h1>
            {project_list}
        </div>);
    }
}

export default withRouter(ProjectList);
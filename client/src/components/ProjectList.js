import React from 'react';
import axios from 'axios';
import {NavLink, withRouter} from 'react-router-dom';
import {authToken, isValidToken} from './AuthenticationManager.js';


class ProjectList extends React.Component {

    constructor(props){
        super(props);
        this.state={
            projects: []
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.history.push("/create");
    }

    componentDidMount(){
        console.log(localStorage.getItem("token"))
        if(isValidToken(localStorage.getItem("token"))){
            authToken(localStorage.getItem("token"));
            axios.get("http://localhost:8080/projects")
            .then((res) => {
                this.setState({projects: res.data});
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else{
            this.props.history.push("/login")
        }
        
    }

    render(){
        const project_list = this.state.projects.map(project => 
            <div key={project.project_id.toString()}>
                <NavLink to={"/project/" + project.project_id}>{project.name}</NavLink>
            </div>
            );

        return(
        <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <button type="submit">Add new project</button>
            </form>
            <h1>Your projects:</h1>
            {project_list}
        </div>);
    }
}

export default withRouter(ProjectList);
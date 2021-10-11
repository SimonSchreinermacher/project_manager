import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {authToken, getUsernameFromToken} from '../../services/AuthenticationManager.js';
import {axiosAuthenticatedCall} from '../../services/AxiosManager.js';
import './styles.css'


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
        authToken(localStorage.getItem("token"));
        const username = getUsernameFromToken(localStorage.getItem("token"))
        function onSuccess(res){
            this.setState({projects: res.data})
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("get", "http://localhost:8080/" + username + "/projects", [], onSuccess.bind(this), onError.bind(this))
        
    }

    render(){
        const project_list = this.state.projects.map(project => 
            <div class="link-element list-group-item list-group-item-success" key={project.project_id.toString()}>
                <NavLink to={"/project/" + project.project_id}>{project.name}</NavLink>
            </div>
            );

        return(
        <div class="project-list-body">
            <form class= "add-project-form" onSubmit={this.handleSubmit.bind(this)}>
                <button class="add-project-button btn btn-primary" type="submit">Add new project</button>
            </form>
            <h1 class= "header">Your projects:</h1>
            <div class="project-list list-group">
                {project_list}
            </div>
        </div>);
    }
}

export default withRouter(ProjectList);
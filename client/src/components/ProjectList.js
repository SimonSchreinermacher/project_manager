import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {authToken} from '../services/AuthenticationManager.js';
import {axiosAuthenticatedCall} from '../services/AxiosManager.js';


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
        function onSuccess(res){
            this.setState({projects: res.data})
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("get", "http://localhost:8080/projects", [], onSuccess.bind(this), onError.bind(this))
        
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
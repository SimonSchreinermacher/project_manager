import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {authToken} from '../../services/AuthenticationManager.js';
import {axiosAuthenticatedCall} from '../../services/AxiosManager.js';
import './styles.css'


class ProjectList extends React.Component {

    constructor(props){
        super(props);
        this.state={
            projects: [],
            filter_search: "",
            filter_status: "Running"
        }
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
        let filtered_projects = this.state.projects;
        if(this.state.filter_status === "Finished"){
            filtered_projects = this.state.projects.filter(project => project.finished);
        }
        else if(this.state.filter_status === "Running"){
            filtered_projects = this.state.projects.filter(project => !project.finished);
        }
        filtered_projects = filtered_projects.filter(project => {return project.name.includes(this.state.filter_search)})
        
        const project_list = filtered_projects.map(project => {
            let list;
            if((new Date(project.deadline) < new Date()) && !project.finished){
                list =  <div class="link-element list-group-item list-group-item-danger" key={project.project_id.toString()}>
                            <p class="link-status">{project.finished ? "Finished" : "Running"}</p>
                            <NavLink to={"/project/" + project.project_id}>{project.name}</NavLink>
                            <p class="link-overdue">Project overdue</p>
                        </div>
            }
            else{
                list =  <div class="link-element list-group-item list-group-item-success" key={project.project_id.toString()}>
                            <p class="link-status">{project.finished ? "Finished" : "Running"}</p>
                            <NavLink to={"/project/" + project.project_id}>{project.name}</NavLink>
                        </div>
            }
            return(list)});

        return(
        <div class="project-list-body">
            <form class= "add-project-form" onSubmit={this.handleSubmit.bind(this)}>
                <button class="add-project-button btn btn-primary" type="submit">Add new project</button>
            </form>
            <h1 class= "header">Your projects:</h1>
            <div class="projectlist-filter">
                <select class="projectlist-filter-status form-control" onChange={e => this.setState({filter_status:e.target.value})}>
                    <option>Running</option>
                    <option>Finished</option>
                    <option>All</option>
                </select>
                <form class="searchbar-form" >
                    <input class="searchbar form-control" placeholder="Search for projects" onChange={e => this.setState({filter_search: e.target.value})}></input>
                </form>
            </div>
            <div class="project-list list-group">
                {project_list}
            </div>
        </div>);
    }
}

export default withRouter(ProjectList);
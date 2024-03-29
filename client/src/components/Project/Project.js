import React from 'react';
import EditableInput from '../EditableComponents/EditableInput.js';
import EditableDropdown from '../EditableComponents/EditableDropdown.js';
import TodoList from '../TodoList/TodoList';
import {Route} from 'react-router-dom';
import CreateTodo from '../CreateTodo/CreateTodo.js';
import {axiosAuthenticatedCall} from '../../services/AxiosManager.js'
import {languages} from '../Constants.js';
import './styles.css';

class Project extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: "",
            name: "LOADING",
            description: "LOADING",
            language: "LOADING",
            createdOn: "LOADING",
            deadline: "yes",
            finished: "",
            todos: [],
            todos_shown: "Running",
            todo_key: 0
        };
    }

    addNewTodo(event){
        event.preventDefault();
        this.props.history.push("/project/" + this.props.match.params.id + "/newtask")
    }

    returnToOverview(event){
        event.preventDefault();
        this.props.history.push('/');
    }

    deleteProject(event){
        event.preventDefault();
        if(window.confirm("Are you sure you want to delete this project?")){

            function onSuccess(res){
                this.props.history.push("/")
                window.location.reload();
            }
            function onError(err){
                console.log(err);
                this.props.history.push("/login");
            }
            axiosAuthenticatedCall("delete", "http://localhost:8080/projects/" + this.props.match.params.id, [], onSuccess.bind(this), onError.bind(this));
        }
    }

    loadContent(){
        function onSuccess(res){
            this.setState({
                id: this.props.match.params.id,
                name: res.data.name,
                description: res.data.description,
                language: res.data.language,
                createdOn: res.data.created_on,
                deadline: res.data.deadline,
                finished: res.data.finished,
                todos: res.data.todos
            });
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("get", "http://localhost:8080/projects/" + this.props.match.params.id, [], onSuccess.bind(this), onError.bind(this));
    }

    componentDidUpdate(){
        if(this.state.id !== this.props.match.params.id){
            this.loadContent();
        }
    }

    componentDidMount(){
        this.loadContent();
    }

    finishProject(event){
        event.preventDefault();
        let confirm_dialog = this.state.finished ? "reactivate" : "finish";
        if(window.confirm("Are you sure you want to " + confirm_dialog + " this project?")){
            const data = {name: this.state.name, description: this.state.description, language: this.state.language, createdOn: this.state.createdOn, deadline: this.state.deadline, finished: !this.state.finished}
            this.editProject(data);
        }
    }

    confirmManualEditing(){
        const data = {name: this.state.name, description: this.state.description, language: this.state.language, createdOn: this.state.createdOn, deadline: this.state.deadline, finished: this.state.finished}
        this.editProject(data);
    }

    editProject(data){
        function onSuccess(res){
            window.location.reload();
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("put", "http://localhost:8080/projects/" + this.state.id, data, onSuccess.bind(this), onError.bind(this))
    }

    render(){
        let finish_button_text = (this.state.finished) ? "Set as running" : "Set as finished";

        return(
            <div class="project-body">

                <div class="project-manage">
                    <form class="project-hide" onSubmit={this.returnToOverview.bind(this)}>
                        <button class="btn btn-primary" type="submit">Hide project details</button>
                    </form>

                    <form class="project-delete" onSubmit={this.deleteProject.bind(this)}>
                        <button class="btn btn-danger" type="submit">Delete</button>
                    </form>
                </div>
                <br></br>
                <EditableInput
                    type="header"
                    text= {this.state.name}
                    editable = {!this.state.finished}
                    onChange={text => this.setState({name: text})}
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>

                <EditableInput 
                    type="text" 
                    text= {this.state.description} 
                    editable = {!this.state.finished}
                    onChange = {text => this.setState({description: text})} 
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>
                
                <EditableDropdown 
                    selected = {this.state.language} 
                    options = {languages}
                    editable = {!this.state.finished}
                    onChange = {selected => this.setState({language: selected})} 
                    prefix = "Language: "
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableDropdown>
                
                <EditableInput 
                    type="date" 
                    text= {this.state.deadline} 
                    editable = {!this.state.finished}
                    onChange = {text => this.setState({deadline: text})} 
                    prefix = "Project must be finished before: "
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>
                
                <div class="project-footer">
                <p class="project-createdon">Created on: {this.state.createdOn}</p>  

                <form class="project-finish" onSubmit={this.finishProject.bind(this)}>
                    <button class="btn btn-success" type="submit">{finish_button_text}</button>    
                </form>     
                </div>
                <Route exact path="/project/:id">
                    <TodoList todos = {this.state.todos} project_id = {this.props.match.params.id} project_finished = {this.state.finished}/>
                </Route>
                <Route path="/project/:id/newtask">
                    <CreateTodo></CreateTodo>
                </Route>
            </div>
        );
    }
}

export default Project;
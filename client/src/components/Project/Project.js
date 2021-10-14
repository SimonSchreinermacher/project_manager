import React from 'react';
//import Todo from './Todo.js';
import EditableInput from '../EditableComponents/EditableInput.js';
import EditableDropdown from '../EditableComponents/EditableDropdown.js';
import TodoList from '../TodoList/TodoList';
import {Route} from 'react-router-dom';
import CreateTodo from '../CreateTodo/CreateTodo.js';
import {axiosAuthenticatedCall} from '../../services/AxiosManager.js'
import {getUsernameFromToken} from '../../services/AuthenticationManager.js';
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
        const username = getUsernameFromToken(localStorage.getItem("token"))

        function onSuccess(res){
            this.props.history.push("/")
            window.location.reload();
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("delete", "http://localhost:8080/" + username + "/projects/" + this.props.match.params.id, [], onSuccess.bind(this), onError.bind(this));
    }

    loadContent(){
        const username = getUsernameFromToken(localStorage.getItem("token"))

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
        axiosAuthenticatedCall("get", "http://localhost:8080/" + username + "/projects/" + this.props.match.params.id, [], onSuccess.bind(this), onError.bind(this));
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
        const data = {name: this.state.name, description: this.state.description, language: this.state.language, createdOn: this.state.createdOn, deadline: this.state.deadline, finished: !this.state.finished}
        this.editProject(data);
    }

    confirmManualEditing(){
        const data = {name: this.state.name, description: this.state.description, language: this.state.language, createdOn: this.state.createdOn, deadline: this.state.deadline, finished: this.state.finished}
        this.editProject(data);
    }

    editProject(data){
        const username = getUsernameFromToken(localStorage.getItem("token"))

        function onSuccess(res){
            window.location.reload();
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("put", "http://localhost:8080/" + username + "/projects/" + this.state.id, data, onSuccess.bind(this), onError.bind(this))
    }

    render(){
        //TODO: Since Todo has a lifecycle, filtering here cannot be done so easily. Todo now gets a random key to be 
        //counted as new instance each time. This is not optimal and may need some improvement
        /*const todo_list = this.state.todos.filter(task => {return (task._finished ^ this.state.todos_shown === "Running")}).map(task => 
                <div> 
                    <Todo key = {Math.floor(Math.random() * 10000000)} todo = {task} project_id = {this.props.match.params.id}></Todo> 
                    <hr></hr>
                </div>
            );*/
        let finish_button_text;
        if(this.state.finished){
            finish_button_text = "Set as running";
        }
        else{
            finish_button_text = "Set as finished";
        }

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
                    onChange={text => this.setState({name: text})}
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>

                <EditableInput 
                    type="text" 
                    text= {this.state.description} 
                    onChange = {text => this.setState({description: text})} 
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>
                
                <EditableDropdown 
                    selected = {this.state.language} 
                    options = {languages}
                    onChange = {selected => this.setState({language: selected})} 
                    prefix = "Language: "
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableDropdown>
                
                <EditableInput 
                    type="date" 
                    text= {this.state.deadline} 
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
                    <TodoList todos = {this.state.todos} project_id = {this.props.match.params.id}/>
                </Route>
                <Route path="/project/:id/newtask">
                    <CreateTodo></CreateTodo>
                </Route>
            </div>
        );
    }
}

/*<p class="project-detail">Project has to be finished before:</p>
                <p class="project-detail">Language:</p>
                                <p>Created on:</p>
*/

export default Project;
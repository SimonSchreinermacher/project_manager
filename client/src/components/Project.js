import React from 'react';
//import Todo from './Todo.js';
import EditableInput from './EditableInput.js';
import TodoList from './TodoList.js';
import {Route} from 'react-router-dom';
import CreateTodo from './CreateTodo.js';
import {axiosAuthenticatedCall} from './AxiosManager.js'

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

    loadContent(){
        function onSuccess(res){
            this.setState({
                id: this.props.match.params.id,
                name: res.data.name,
                description: res.data.description,
                language: res.data.language,
                createdOn: res.data.created_on,
                deadline: res.data.deadline,
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

    editProject(){
        const data = {name: this.state.name, description: this.state.description, language: this.state.language, createdOn: this.state.createdOn, deadline: this.state.deadline}
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
        //TODO: Since Todo has a lifecycle, filtering here cannot be done so easily. Todo now gets a random key to be 
        //counted as new instance each time. This is not optimal and may need some improvement
        /*const todo_list = this.state.todos.filter(task => {return (task._finished ^ this.state.todos_shown === "Running")}).map(task => 
                <div> 
                    <Todo key = {Math.floor(Math.random() * 10000000)} todo = {task} project_id = {this.props.match.params.id}></Todo> 
                    <hr></hr>
                </div>
            );*/

        return(
            <div>

                <form onSubmit={this.returnToOverview.bind(this)}>
                    <button type="submit">Hide project details</button>
                </form>

                <form onSubmit={this.deleteProject.bind(this)}>
                    <button type="submit">Delete</button>
                </form>
                
                <h1>{this.state.name}</h1>
                <EditableInput text= {this.state.description} onChange = {text => this.setState({description: text})} onConfirm={this.editProject.bind(this)}></EditableInput>
                
                <br></br>
                <p>Language:</p>
                <EditableInput text= {this.state.language} onChange = {text => this.setState({description: text})} onConfirm={this.editProject.bind(this)}></EditableInput>
                
                <br></br>
                <p>Project has to be finished before:</p>
                <EditableInput text= {this.state.deadline} onChange = {text => this.setState({deadline: text})} onConfirm={this.editProject.bind(this)}></EditableInput>
                
                <br></br>
                <p>Created on:</p>
                <p>{this.state.createdOn}</p>

                <br></br>
                <h2>TODO:</h2>
                <form onSubmit={this.addNewTodo.bind(this)}>
                    <button type="submit">Add new</button>
                </form>
                
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

export default Project;
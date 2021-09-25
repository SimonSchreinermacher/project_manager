import React from 'react';
import axios from 'axios';
import Todo from './Todo.js';
import EditableInput from './EditableInput.js';

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
            todos_shown: "Running"
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

    changeTodosDisplayed(event){
        event.preventDefault();
        if(this.state.todos_shown === "Running"){
            this.setState({todos_shown: "Finished"});
        }
        else{
            this.setState({todos_shown: "Running"});
        }
        console.log(this.state.todos_shown)
    }

    deleteProject(event){
        event.preventDefault();
        axios.delete("http://localhost:8080/projects/" + this.props.match.params.id)
        .then((res) => {
            this.props.history.push("/")
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

    componentDidMount(){
        axios.get("http://localhost:8080/projects/" + this.props.match.params.id)
        .then((res) => {
            console.log(res.data);
            this.setState({
                id: res.data.project_id,
                name: res.data.name,
                description: res.data.description,
                language: res.data.language,
                createdOn: res.data.created_on,
                deadline: res.data.deadline,
                todos: res.data.todos
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    editProject(){
        console.log(this.state.id)
        console.log(this.state.name)
        console.log(this.state.description)
        console.log(this.state.deadline)
        console.log(this.state.createdOn)
        console.log(this.state.language)

        const data = {name: this.state.name, description: this.state.description, language: this.state.language, createdOn: this.state.createdOn, deadline: this.state.deadline}
        axios.put("http://localhost:8080/projects/" + this.state.id, data)
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        const todo_list = this.state.todos.filter(task => {return (task._finished ^ this.state.todos_shown === "Running")}).map(task => 
                <div>
                    <Todo todo = {task} project_id = {this.props.match.params.id}></Todo>
                </div>
            );

        return(
            <div>

                <form onSubmit={this.returnToOverview.bind(this)}>
                    <button type="submit">Back to overview page</button>
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
                <h2>TODO:</h2>
                <form onSubmit={this.addNewTodo.bind(this)}>
                    <button type="submit">Add new</button>
                </form>

                <form onSubmit={this.changeTodosDisplayed.bind(this)}>
                    <button type="submit">Currently showing {this.state.todos_shown} todos</button>
                </form>
                {todo_list}
            </div>
        );
    }
}

export default Project;
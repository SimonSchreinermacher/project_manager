import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import EditableInput from './EditableInput.js';

class Todo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: this.props.todo.title,
            category: this.props.todo.category, 
            importance: this.props.todo.importance, 
            is_finished: this.props.todo._finished
        };
    }

    deleteTodo(event){
        event.preventDefault();
        axios.delete("http://localhost:8080/projects/" + this.props.project_id + "/todos/" + this.props.todo.todo_id)
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    setAsFinished(event){
        event.preventDefault();
        const data = {title: this.state.title, category: this.state.category, importance: this.state.importance, is_finished: true}
        axios.put("http://localhost:8080/projects/" + this.props.project_id + "/todos/" + this.props.todo.todo_id, data)
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        console.log(this.state.title)
    }

    editTodo(){
        const data = {title: this.state.title, category: this.state.category, importance: this.state.importance, is_finished: this.state.is_finished}
        axios.put("http://localhost:8080/projects/" + this.props.project_id + "/todos/" + this.props.todo.todo_id, data)
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        let finishButton;
        if (!this.props.todo._finished){
            finishButton = <div>
                <form onSubmit={this.setAsFinished.bind(this)}>
                    <button type="submit">Finish</button>
                </form>
            </div>
        }
        else{
            finishButton = <div></div>
        }

        return(
            <div>
                <p>Title:</p>
                <EditableInput text= {this.state.title} onChange = {text => this.setState({title: text})} onConfirm={this.editTodo.bind(this)}></EditableInput>
                
                <br></br>
                <p>Category:</p>
                <EditableInput text= {this.state.category} onChange = {text => this.setState({category: text})} onConfirm={this.editTodo.bind(this)}></EditableInput>

                <br></br>
                <p>Importance:</p>
                <EditableInput text= {this.state.importance} onChange = {text => this.setState({importance: text})} onConfirm={this.editTodo.bind(this)}></EditableInput>

                <br></br>
                {finishButton}
                <form onSubmit={this.deleteTodo.bind(this)}>
                    <button type="submit">Delete</button>
                </form>
                <br></br>
            </div>
        );
    }
}

export default withRouter(Todo);
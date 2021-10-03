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
        axios.all([
            axios.post("http://localhost:8080/refreshtoken", {token: localStorage.getItem("token")}),
            axios.delete("http://localhost:8080/projects/" + this.props.project_id + "/todos/" + this.props.todo.todo_id)
        ])
        .then(axios.spread((res1, res2) => {
            localStorage.setItem("token", res1.data)
            window.location.reload();
        }))
        .catch((err) => {
            console.log(err);
            this.props.history.push("/login")
        })
    }

    changeStatus(event){
        event.preventDefault();
        const data = {title: this.state.title, category: this.state.category, importance: this.state.importance, is_finished: !this.state.is_finished}
        this.editTodo(data);
    }

    confirmManualEditing(){
        const data = {title: this.state.title, category: this.state.category, importance: this.state.importance, is_finished: this.state.is_finished}
        this.editTodo(data);
    }

    editTodo(data){
        console.log("Finished?", this.state.is_finished)
        axios.all([
            axios.post("http://localhost:8080/refreshtoken", {token: localStorage.getItem("token")}),
            axios.put("http://localhost:8080/projects/" + this.props.project_id + "/todos/" + this.props.todo.todo_id, data)
        ])
        .then(axios.spread((res1, res2) => {
            localStorage.setItem("token", res1.data)
            window.location.reload();
        }))
        .catch((err) => {
            console.log(err);
            this.props.history.push("/login")
        })
    }

    render(){
        let finishButton;
        if (!this.props.todo._finished){
            finishButton = <button type="submit">Finish</button>
        }
        else{
            finishButton = <button type="submit">Unfinish</button>
        }

        return(
            <div>
                <p>Title:</p>
                <EditableInput text= {this.state.title} onChange = {text => this.setState({title: text})} onConfirm={this.confirmManualEditing.bind(this)}></EditableInput>
                
                <br></br>
                <p>Category:</p>
                <EditableInput text= {this.state.category} onChange = {text => this.setState({category: text})} onConfirm={this.confirmManualEditing.bind(this)}></EditableInput>

                <br></br>
                <p>Importance:</p>
                <EditableInput text= {this.state.importance} onChange = {text => this.setState({importance: text})} onConfirm={this.confirmManualEditing.bind(this)}></EditableInput>

                <br></br>
                <form onSubmit={this.changeStatus.bind(this)}>
                    {finishButton}
                </form>
                
                <form onSubmit={this.deleteTodo.bind(this)}>
                    <button type="submit">Delete</button>
                </form>
                <br></br>
            </div>
        );
    }
}

export default withRouter(Todo);
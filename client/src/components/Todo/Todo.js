import React from 'react';
import {withRouter} from 'react-router-dom';
import EditableInput from '../EditableComponents/EditableInput.js';
import {axiosAuthenticatedCall} from '../../services/AxiosManager.js';
import {getUsernameFromToken} from '../../services/AuthenticationManager.js';
import './styles.css';

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
        const username = getUsernameFromToken(localStorage.getItem("token"))

        function onSuccess(res){
            window.location.reload(); 
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("delete", "http://localhost:8080/" + username + "/projects/" + this.props.project_id + "/todos/" + this.props.todo.todo_id, [], onSuccess.bind(this), onError.bind(this))
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
        const username = getUsernameFromToken(localStorage.getItem("token"))

        console.log("Finished?", this.state.is_finished)
        function onSuccess(res){
            window.location.reload();
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("put", "http://localhost:8080/" + username + "/projects/" + this.props.project_id + "/todos/" + this.props.todo.todo_id, data, onSuccess.bind(this), onError.bind(this));
    }

    render(){
        let finishButton;
        if (!this.props.todo._finished){
            finishButton = <button class="todo-finish-button btn btn-primary" type="submit">Finish</button>
        }
        else{
            finishButton = <button class="todo-finish-button btn btn-primary" type="submit">Unfinish</button>
        }

        return(
            <div class="todo-body">
                <EditableInput 
                    type="text" 
                    text= {this.state.title} 
                    onChange = {text => this.setState({title: text})} 
                    prefix = "Title: "
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>
                
                <EditableInput 
                    type="text" 
                    text= {this.state.category} 
                    onChange = {text => this.setState({category: text})} 
                    prefix = "Category: "
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>

                <EditableInput 
                    type="text" 
                    text= {this.state.importance} 
                    onChange = {text => this.setState({importance: text})} 
                    prefix = "Importance: "
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>

                <div class="todo-manage">
                    <form class="todo-finish" onSubmit={this.changeStatus.bind(this)}>
                        {finishButton}
                    </form>
                    
                    <form class="todo-delete" onSubmit={this.deleteTodo.bind(this)}>
                        <button class="todo-delete-button btn btn-danger" type="submit">Delete</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Todo);
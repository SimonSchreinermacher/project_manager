import React from 'react';
import {withRouter} from 'react-router-dom';
import EditableInput from './EditableInput.js';
import {axiosAuthenticatedCall} from '../services/AxiosManager.js';

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
        function onSuccess(res){
            window.location.reload(); 
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("delete", "http://localhost:8080/projects/" + this.props.project_id + "/todos/" + this.props.todo.todo_id, [], onSuccess.bind(this), onError.bind(this))
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
        function onSuccess(res){
            window.location.reload();
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("put", "http://localhost:8080/projects/" + this.props.project_id + "/todos/" + this.props.todo.todo_id, data, onSuccess.bind(this), onError.bind(this));
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
                <EditableInput 
                    type="text" 
                    text= {this.state.title} 
                    onChange = {text => this.setState({title: text})} 
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>
                
                <br></br>
                <p>Category:</p>
                <EditableInput 
                    type="text" 
                    text= {this.state.category} 
                    onChange = {text => this.setState({category: text})} 
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>

                <br></br>
                <p>Importance:</p>
                <EditableInput 
                    type="text" 
                    text= {this.state.importance} 
                    onChange = {text => this.setState({importance: text})} 
                    onConfirm={this.confirmManualEditing.bind(this)}>
                </EditableInput>

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
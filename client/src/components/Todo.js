import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Todo extends React.Component {

    deleteTodo(event){
        event.preventDefault();
        axios.delete("http://localhost:8080/projects/" + this.props.project_id + "/todos/" + this.props.todo.todo_id)
        .then((res) => {
            this.props.history.push("/")
        })
        .catch((err) => {
            console.log(err);
        })
    }

    setAsFinished(event){
        event.preventDefault();
        const data = {title: this.props.todo.title, category: this.props.todo.category, importance: this.props.todo.importance, is_finished: true}
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
                <p>Title: {this.props.todo.title}</p>
                <p>Category: {this.props.todo.category}</p>
                <p>Importance: {this.props.todo.importance}</p>
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
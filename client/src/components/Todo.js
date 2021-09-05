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

    render(){
        return(
            <div>
                <p>Title: {this.props.todo.title}</p>
                <p>Category: {this.props.todo.category}</p>
                <p>Importance: {this.props.todo.importance}</p>
                <form onSubmit={this.deleteTodo.bind(this)}>
                    <button type="submit">Delete</button>
                </form>
                <br></br>
            </div>
        );
    }
}

export default withRouter(Todo);
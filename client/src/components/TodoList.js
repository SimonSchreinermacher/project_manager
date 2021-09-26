import React from 'react';
import Todo from './Todo.js';

class TodoList extends React.Component {
    render(){
        const todo_list = this.props.todos.filter(task => {return (task._finished ^ this.props.mode === "Running")}).map(task => 
            <div> 
                <Todo key = {Math.floor(Math.random() * 10000000)} todo = {task} project_id = {this.props.project_id}></Todo> 
                <hr></hr>
            </div>
        );
        return(
            <div>
                {todo_list}
            </div>
        );
    }
}

export default TodoList;
import React from 'react';
import Todo from './Todo.js';

class TodoList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            filter: "All"
        }
    }

    render(){
        let filtered_todos;
        if(this.state.filter === "All"){
            filtered_todos = this.props.todos;
        }
        else{
            filtered_todos = this.props.todos.filter(task => {return task.category === this.state.filter})
        }
        const todo_list = filtered_todos.filter(task => {return (task._finished ^ this.props.mode === "Running")}).map(task => 
            <div> 
                <Todo key = {Math.floor(Math.random() * 10000000)} todo = {task} project_id = {this.props.project_id}></Todo> 
                <hr></hr>
            </div>
        );
        return(
            <div>
                <p>Filter:</p>
                <select onChange={e => this.setState({filter: e.target.value})}>
                    <option>All</option>
                    <option>Feature</option>
                    <option>Bug</option>
                    <option>Update</option>
                    <option>Refactor</option>
                </select>
                {todo_list}
            </div>
        );
    }
}

export default TodoList;
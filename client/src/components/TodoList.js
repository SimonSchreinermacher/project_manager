import React from 'react';
import Todo from './Todo.js';

class TodoList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            filter_category: "All",
            filter_status: "Running"
        }
    }

    changeTodosDisplayed(event){
        event.preventDefault();
        if(this.state.filter_status === "Running"){
            this.setState({filter_status: "Finished"});
        }
        else{
            this.setState({filter_status: "Running"});
        }
    }

    render(){
        let filtered_todos;
        if(this.state.filter_category === "All"){
            filtered_todos = this.props.todos;
        }
        else{
            filtered_todos = this.props.todos.filter(task => {return task.category === this.state.filter_category})
        }
        const todo_list = filtered_todos.filter(task => {return (task._finished ^ this.state.filter_status === "Running")}).map(task => 
            <div> 
                <Todo key = {Math.floor(Math.random() * 10000000)} todo = {task} project_id = {this.props.project_id}></Todo> 
                <hr></hr>
            </div>
        );
        return(
            <div>
                <form onSubmit={this.changeTodosDisplayed.bind(this)}>
                    <button type="submit">Currently showing {this.state.filter_status} todos</button>
                </form>

                <p>Filter:</p>
                <select onChange={e => this.setState({filter_category: e.target.value})}>
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
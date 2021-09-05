import React from 'react';

class Todo extends React.Component {
    
    render(){
        return(
            <div>
                <p>Title: {this.props.todo.title}</p>
                <p>Category: {this.props.todo.category}</p>
                <p>Importance: {this.props.todo.importance}</p>
                <br></br>
            </div>
        );
    }
}

export default Todo;
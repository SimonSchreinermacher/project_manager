import React from 'react';

class Project extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: "Project1",
            description: "some description of a project",
            language: "Python",
            deadline: "yes",
            todos: ["do something", "do more"]
        };
    }

    render(){
        const todo_list = this.state.todos.map(task => 
            <div>
                <p>{task}</p>
            </div>);

        return(
            <div>
                <h1>{this.state.name}</h1>
                <p>{this.state.description}</p>
                <p>Language: {this.state.language}</p>
                <p>Project has to be finished before: {this.state.deadline}</p>
                <h2>TODO:</h2>
                {todo_list}
            </div>
        );
    }
}

export default Project;
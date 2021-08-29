import React from 'react';
import axios from 'axios';

class Project extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: "LOADING",
            description: "LOADING",
            language: "LOADING",
            deadline: "yes",
            todos: []
        };
    }

    addNewTodo(event){
        event.preventDefault();
        this.props.history.push("/project/" + this.props.match.params.id + "/newtask")
    }

    returnToOverview(event){
        event.preventDefault();
        this.props.history.push('/');
    }

    componentDidMount(){
        axios.get("http://localhost:8080/projects/" + this.props.match.params.id)
        .then((res) => {
            console.log(res.data);
            this.setState({
                name: res.data.name,
                description: res.data.description,
                language: res.data.language,
                deadline: res.data.deadline,
                todos: res.data.todos
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        const todo_list = this.state.todos.map(task => 
            <div>
                <p>{task}</p>
            </div>);

        return(
            <div>
                <form onSubmit={this.returnToOverview.bind(this)}>
                    <button type="submit">Back to overview page</button>
                </form>
                
                <h1>{this.state.name}</h1>
                <p>{this.state.description}</p>
                <p>Language: {this.state.language}</p>
                <p>Project has to be finished before: {this.state.deadline}</p>
                <h2>TODO:</h2>
                <form onSubmit={this.addNewTodo.bind(this)}>
                    <button type="submit">Add new</button>
                </form>
                {todo_list}
            </div>
        );
    }
}

export default Project;
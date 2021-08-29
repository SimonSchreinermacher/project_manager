import React from 'react';
import axios from 'axios';
import moment from 'moment';

class CreateProject extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: "",
            language: "Python",
            deadline: ""
        };
    }

    cancelCreating(event){
        event.preventDefault();
        this.props.history.push('/');
    }

    handleSubmit(event){
        event.preventDefault();
        const createdOn = moment().format().slice(0,10); //Generates a string of current time in format yyyy-mm-dd

        const data = {name: this.state.name, description: this.state.description, language: this.state.language, createdOn: createdOn, deadline: this.state.deadline}
        axios.post("http://localhost:8080/projects", data)
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
                <form onSubmit={this.cancelCreating.bind(this)}>
                    <button type="submit">Cancel</button>
                </form>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p>Name</p>
                    <input onChange={e => this.setState({name: e.target.value})}></input>

                    <p>Description</p>
                    <textarea onChange={e => this.setState({description: e.target.value})}></textarea>

                    <p>Language</p>
                    <select onChange={e => this.setState({language: e.target.value})}>
                        <option>Python</option>
                        <option>Java</option>
                        <option>JavaScript</option>
                        <option>C</option>
                    </select>

                    <p>Deadline</p>
                    <input type="date" onChange={e => this.setState({deadline: e.target.value})}></input>

                    <br></br>

                    <button type="submit">Add new project</button>
                </form>
            </div>
        );
    }
}

export default CreateProject;
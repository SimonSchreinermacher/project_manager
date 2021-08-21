import React from 'react';

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

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.name);
        console.log(this.state.description);
        console.log(this.state.language);
        console.log(this.state.deadline);

        //DATABASE CALL

        this.props.history.push("/")
    }

    render(){
        return(
            <div>
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
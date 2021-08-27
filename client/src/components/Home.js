import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state={
            projects: []
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.history.push("/create");
    }

    componentDidMount(){
        axios.get("http://localhost:8080/projects")
        .then((res) => {
            this.setState({projects: res.data});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        const project_list = this.state.projects.map(project => 
            <div key={project.project_id.toString()}>
                <a href={"/project/" + project.project_id}>{project.name}</a>
            </div>
            );

        return(
        <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <button type= 'submit'>Add new project</button>
            </form>
            <h1>Your projects:</h1>
            {project_list}
        </div>);    
        }
}

export default Home;
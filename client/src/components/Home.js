import React from 'react';

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state={
            projects: [
                {id: 1234, name: "Project1"}, 
                {id: 5678, name: "Project2"}],
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.history.push("/create");
    }

    render(){
        const project_list = this.state.projects.map(project => 
            <div key={project.id.toString()}>
                <a href={"/project/" + project.id}>{project.name}</a>
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
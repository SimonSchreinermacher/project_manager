import React from 'react';

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state={
            projects: ["Project1", "Project2"],
        }
    }

    handleSubmit(event){
        event.preventDefault();
        console.log("TODO");
    }

    render(){
        const project_list = this.state.projects.map(project => 
            <div>
                <p>{project}</p>
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
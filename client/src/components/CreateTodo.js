import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class CreateTodo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            importance: "",
            chosenCategory: "",
            categories: ["Feature", "Bug", "Update", "Refactor"]
        };
    }

    cancelCreating(event){
        event.preventDefault();
        this.props.history.push('/project/' + this.props.match.params.id);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.title);
        console.log(this.state.importance);
        console.log(this.state.chosenCategory);

        const data = {title: this.state.title, importance: this.state.importance, category: this.state.chosenCategory};

        //DATABASE CALL
        axios.post("http://localhost:8080/projects/" + this.props.match.params.id + "/todos", data)
        .then((res) => {
            this.props.history.push("/project/" + this.props.match.params.id)
            window.location.reload();
        })
        .catch((err) => {
            console.log("err");
        })
    }

    render(){
        const allCategories = this.state.categories.map(category =>
            <option>{category}</option>
            );

        return(
            <div>
                <form onSubmit={this.cancelCreating.bind(this)}>
                    <button type="submit">Cancel</button>
                </form>

                <h1>Create new TODO:</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p>Title</p>
                    <input required onChange={e => this.setState({title: e.target.value})}></input>
                    <p>Importance</p>
                    <select required onChange={e => this.setState({importance: e.target.value})}>
                        <option selected disabled hidden></option>
                        <option>Minor</option>
                        <option>Medium</option>
                        <option>Major</option>
                        <option>Serious</option>
                        <option>Very Serious</option>
                    </select>
                    <p>Set category</p>
                    <select required onChange={e => this.setState({chosenCategory: e.target.value})}>
                        <option selected disabled hidden></option>
                        {allCategories}
                    </select>
                    <br></br>
                    <button type="submit">Add TODO</button>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateTodo);
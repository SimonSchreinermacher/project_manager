import React from 'react';

class CreateTodo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            importance: "",
            chosenCategory: "",
            categories: ["somecategory", "another", "evenmore"]
        };
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.title);
        console.log(this.state.importance);
        console.log(this.state.chosenCategory);

        //DATABASE CALL

        this.props.history.push("/project/" + this.props.match.params.id)
    }

    render(){
        const allCategories = this.state.categories.map(category =>
            <option>{category}</option>
            );

        return(
            <div>
                <h1>Create new TODO:</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p>Title</p>
                    <input onChange={e => this.setState({title: e.target.value})}></input>
                    <p>Importance</p>
                    <select onChange={e => this.setState({importance: e.target.value})}>
                        <option>Minor</option>
                        <option>Medium</option>
                        <option>Major</option>
                        <option>Serious</option>
                        <option>Very Serious</option>
                    </select>
                    <p>Set category</p>
                    <select onChange={e => this.setState({chosenCategory: e.target.value})}>
                        {allCategories}
                    </select>
                    <br></br>
                    <button type="submit">Add TODO</button>
                </form>
            </div>
        );
    }
}

export default CreateTodo;
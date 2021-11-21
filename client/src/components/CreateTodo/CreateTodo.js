import React from 'react';
import {withRouter} from 'react-router-dom';
import {axiosAuthenticatedCall} from '../../services/AxiosManager.js';
import {categories, importances} from '../Constants.js';
import './styles.css';

class CreateTodo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            importance: "",
            chosenCategory: "",
        };
    }

    cancelCreating(event){
        event.preventDefault();
        this.props.history.push('/project/' + this.props.match.params.id);
    }

    handleSubmit(event){
        event.preventDefault();
        const data = {title: this.state.title, importance: this.state.importance, category: this.state.chosenCategory};
        
        function onSuccess(res){
            this.props.history.push("/project/" + this.props.match.params.id)
            window.location.reload();
        }
        function onError(err){
            console.log(err);
            this.props.history.push("/login");
        }
        axiosAuthenticatedCall("post", "http://localhost:8080/projects/" + this.props.match.params.id + "/todos", data, onSuccess.bind(this), onError.bind(this))
    }

    render(){
        return(
            <div class="create-todo-body">
                <hr></hr>
                <form class="form-group" onSubmit={this.cancelCreating.bind(this)}>
                    <button class="btn btn-danger" type="submit">Cancel</button>
                </form>

                <h2 class="create-todo-header">Create new TODO:</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <p>Title</p>
                    <input class="form-control create-todo-form" required onChange={e => this.setState({title: e.target.value})}></input>
                    <p>Importance</p>
                    <select class="form-control create-todo-form" required onChange={e => this.setState({importance: e.target.value})}>
                        <option selected disabled hidden></option>
                        {importances.map(importance => <option>{importance}</option>)}
                    </select>
                    <p>Set category</p>
                    <select class="form-control create-todo-form" required onChange={e => this.setState({chosenCategory: e.target.value})}>
                        <option selected disabled hidden></option>
                        {categories.map(category => <option>{category}</option>)}
                    </select>
                    <br></br>
                    <button class="btn btn-primary" type="submit">Add TODO</button>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateTodo);
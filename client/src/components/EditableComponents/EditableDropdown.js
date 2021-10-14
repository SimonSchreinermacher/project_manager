import React from 'react';
import './styles.css';

class EditableDropdown extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editActive: false,
            selectedOption: this.props.selected,
        }
    }

    switchMode(event){
        event.preventDefault();
        this.setState({editActive: !this.state.editActive})
    }

    confirmEdit(event){
        event.preventDefault();
        this.switchMode(event);
        this.props.onConfirm(this.state.selectedOption);   
    }

    onChange(event){
        event.preventDefault();
        this.props.onChange(event.target.value);
    }

    render(){
        let html;
        if (this.state.editActive){
            html =  <div>
                        <form class="editable-body">
                            <button class="btn btn-primary" onClick= {this.confirmEdit.bind(this)}>Confirm</button>
                            <select class= "editable-dropdown" onChange={e => this.onChange(e)}>
                                {this.props.options.map(option => <option selected = {option === this.props.selected}>{option}</option>)}
                            </select>
                        </form>
                    </div>
        }
        else{
            html =  <div class="editable-body">
                        <form class="editable-button" onSubmit= {this.switchMode.bind(this)}>
                            <button class="btn btn-primary" type="submit">Edit</button>
                        </form>
                        <p class="editable-text">{this.props.prefix} {this.props.selected}</p>
                    </div>
        }
        return(
            <div>
                {html}
            </div>
        );
    }
}

export default EditableDropdown;
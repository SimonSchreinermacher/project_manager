import React from 'react';

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
        const allOptions = this.props.options.map(option =>
            <option selected = {option === this.props.selected}>{option}</option>
            );
        let html;
        if (this.state.editActive){
            html = <div>
                <form>
                    <select onChange={e => this.onChange(e)}>
                        {allOptions}
                    </select>
                    <button onClick= {this.confirmEdit.bind(this)}>Confirm changes</button>
                </form>
            </div>
        }
        else{
            html = <div>
                <p>{this.props.selected}</p>
                <form onSubmit= {this.switchMode.bind(this)}>
                    <button type="submit">Edit</button>
                </form>
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
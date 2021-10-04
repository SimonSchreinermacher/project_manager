import React from 'react';

class EditableInput extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editActive: false,
            text: this.props.text,
        }
    }

    switchMode(event){
        event.preventDefault();
        this.setState({editActive: !this.state.editActive})
    }

    confirmEdit(event){
        event.preventDefault();
        this.switchMode(event);
        this.props.onConfirm(this.state.text);   
    }

    onChange(event){
        event.preventDefault();
        this.props.onChange(event.target.value);
    }

    render(){
        let html;
        if (this.state.editActive){
            html = <div>
                <form>
                    <input type = {this.props.type} defaultValue={this.props.text} onChange={e => this.onChange(e)}></input>
                    <button onClick= {this.confirmEdit.bind(this)}>Confirm changes</button>
                </form>
            </div>
        }
        else{
            html = <div>
                <p>{this.props.text}</p>
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

export default EditableInput;
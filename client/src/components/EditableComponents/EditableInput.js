import React from 'react';
import './styles.css'

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
            html = <div >
                <form class="editable-body">
                    <button class="btn btn-primary editable-button" onClick= {this.confirmEdit.bind(this)}>Confirm</button>
                    <input class= "editable-input" type = {this.props.type} defaultValue={this.props.text} onChange={e => this.onChange(e)}></input>
                </form>
            </div>
        }
        else{
            let displayclass = (this.props.type==="header") ? "editable-header" : "editable-text";
            html =  <div class="editable-body">
                        <div class="editable-button">
                            <form onSubmit= {this.switchMode.bind(this)}>
                                <button class="btn btn-primary" type="submit">Edit</button>
                            </form>
                        </div>
                        <div class={displayclass}>
                            <p>{this.props.prefix} {this.props.text}</p>
                        </div>
                    </div>
        }
        return(
            <div >
                {html}
            </div>
        );
    }
}

export default EditableInput;
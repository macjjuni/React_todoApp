import React, {Component} from 'react';


class Todo_Add extends Component{		
    constructor(props){
        super(props)
        this.state = {
            todo : ''
        }

    }

    insert_todo = e =>{
        e.preventDefault();

        if(this.state.todo !== ''){
            this.props.onSubmit(this.state.todo);
            this.setState({todo : ''});
            this.input.value = '';
            this.input.focus();
        }
    }

    input_onChange = e =>{ 
        this.setState({todo : e.target.value})
    }
   

    render(){

        return (
            <form className="todo_add_wrap" onSubmit={this.insert_todo}>
                <input type="text" ref={(f) => { this.input = f; }} className="todo_input_txt" onChange={ this.input_onChange }></input>
                <button className="add_btn"></button>
            </form>          
        );
        }
    }

export default Todo_Add;
import React, { Component } from 'react';
import './App.css';



class App extends Component{		
  constructor(props){
    super(props);
    this.state = {
      todo_List:[{
        todo : '씻기',
        date : '2021-04-30'
      },
      {
      todo : '낮잠자기',
        date : '2021-05-01'
      },
      {
        todo : '공부하기',
        date : '2021-05-02'
      }
      ]
    }
  }

  render(){

    return(
      <main>
        <Todo todo={this.state.todo_List}/>
      </main>
    );
  }
}

class Todo extends Component{		
  

/*
    this.inputHandler = this.inputHandler.bind(this);
  inputHandler(e){ 
    this.setState({ [e.target.name] : e.target.value});
  }
*/
  render(){
    let list = [];
    let data = this.props.todo;
    
    for(let i = 0 ; i < data.length ; i++){
      list.push(<li key={data[i].date}><span>{data[i].todo}</span></li>);
    }
    
    return (
      <main>
          <div className="todo_add_wrap">
                <input type="text" className="todo_txt" onChange={  function (e){
                                  
                }}></input>
                <button className="add_btn"></button>
          </div>
          
          <div className="todo_list_wrap">
            <ul className="list">

              {list}
            
            </ul>
          </div>
      </main>
    );
  }
}



export default App;

import React, { Component } from 'react';
import './App.css';


class App extends Component{		

  constructor(props){
    super(props);
    this.state = {
      todo_list:[{
          todo : '씻기',
          date : '2021-04-30'
        },
        {
          todo : '책 읽기',
          date : '2021-04-30'
        },
        {
          todo : '운동하기',
          date : '2021-04-30'
        },
        {
          todo : '낮잠자기',
          date : '2021-04-30'
        }]
    }    
    this.insert_todo = this.insert_todo.bind(this);
    
  }

  insert_todo(todo) {
    
    const time = new Date()
    const year = time.getFullYear();
    const month = (time.getMonth()+1).toString.length === 1 ? ('0' + (time.getMonth()+1)) : (time.getMonth()+1);
    const date =  time.getDate().toString.length === 1 ? ('0' + time.getDate()) : (time.getMonth()+1);
    const todo_Date = year + '-' + month + '-' + date /* + ' ' + time.getHours() + ':' + time.getMinutes()*/;
    
    const _todo = {todo : todo, date : todo_Date};
    let _temp = [...this.state.todo_list];
    _temp.push(_todo);  

    this.setState({
      todo_list : [..._temp]
    })
  }

  render(){

    

    return(
      <main>
        <Todo_Add onSubmit={this.insert_todo}/>
        <Todo_List todo={this.state.todo_list}/>
      </main>
    );
  }
}


class Todo_Add extends Component{		
  
  state = { todo : ''};

  insert_todo = e =>{
    if(this.state.todo !== ''){
      e.preventDefault();
      this.props.onSubmit(this.state.todo);
      this.setState({todo : ''});
      e.target[0].value = '';
      e.target[0].focus();
    }
    else{
      e.preventDefault();
    }
  }

  render(){
    console.log('랜더링~');
    
    return (
      <form className="todo_add_wrap" onSubmit={this.insert_todo}>
            <input type="text" className="todo_input_txt" onChange={  function (e){
                              this.setState({todo : e.target.value})
            }.bind(this)}></input>
            <button className="add_btn"></button>
      </form>          
    );
  }
}


class Todo_List extends Component{

  render(){
  
  let list = [];
  let getData = this.props.todo;
  console.log('랜더링~');
  for(let i=0 ; i < getData.length ; i++){
    list.push(<li><span className="todo_txt">{getData[i].todo}</span><span className="date_txt">{getData[i].date}</span></li>)
  }
  
    return (
      <div className="todo_list_wrap">
        <ul className="list">
          {list}
        </ul>
      </div>     
    );
  }
}


export default App;



  /*
    let list = [];
    let data = this.props.todo;
    
    for(let i = 0 ; i < data.length ; i++){
      list.push(<li key={data[i].date}><span>{data[i].todo}</span></li>);
    }
  */


/*


  this.inputHandler = this.inputHandler.bind(this);
inputHandler(e){ 
  this.setState({ [e.target.name] : e.target.value});
}
*/
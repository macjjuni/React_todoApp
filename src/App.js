import React, { Component } from 'react';
import './App.css';


class App extends Component{		

  constructor(props){
    super(props);
    this.state = {
      todo_list:[
      /*  {
          todo : '씻기',
          date : '2021/04/30 - 13:11'
        },
        {
          todo : '책 읽기',
          date : '2021/04/21 - 15:47'
        },
        {
          todo : '운동하기',
          date : '2021/04/19 - 07:24'
        },
        {
          todo : '낮잠자기',
          date : '2021/04/16 - 01:49'
        }                                   */
      ]
    }    
    this.insert_todo = this.insert_todo.bind(this);
    
  }

  insert_todo(todo) {
    
    const time = new Date()
    const year = time.getFullYear();
    const month = (time.getMonth()+1).toString.length === 1 ? ('0' + (time.getMonth()+1)) : (time.getMonth()+1);
    const date =  time.getDate().toString.length === 1 ? ('0' + time.getDate()) : (time.getMonth()+1);
    const todo_Date = year + '/' + month + '/' + date + ' ' + time.getHours() + ':' + time.getMinutes();
    
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
  constructor(props){
    super(props)
    this.state = {
      todo : ''
    }
    this.input_onChange = this.input_onChange.bind(this);
    this.insert_todo = this.insert_todo.bind(this);
  }

  insert_todo = e =>{
      e.preventDefault();
    if(this.state.todo !== ''){
      this.props.onSubmit(this.state.todo);
      this.setState({todo : ''});
      e.target[0].value = '';
      e.target[0].focus();
    }
  }
  
  input_onChange = e =>{
    this.setState({todo : e.target.value})
  }

  render(){

    return (
      <form className="todo_add_wrap" onSubmit={this.insert_todo}>
            <input type="text" className="todo_input_txt" onChange={ this.input_onChange }></input>
            <button className="add_btn"></button>
      </form>          
    );
  }
}


class Todo_List extends Component{

check_todo = (e) =>{
  const len = this.props.todo.length;

  for(let i = 0 ; i < len ; i++){

    if(e.target.parentNode.children[i] === e.target){

      if(!e.target.classList.contains('done')){
        e.target.classList.add('done');
      }else{
        e.target.classList.remove('done');
      }
    }
  }
}

chk_todo_childEle = (e) =>{
  const len = this.props.todo.length;

  for(let j = 0 ; j < len ; j++){
    if(e.target.parentNode.parentNode.children[j] === e.target.parentNode){
      
      if(!e.target.parentNode.classList.contains('done')){
        e.target.parentNode.classList.add('done');
      }else{
        e.target.parentNode.classList.remove('done');
      }
    }
  }
}


  render(){

  let list = [];
  let getData = this.props.todo;
  
  for(let i=0 ; i < getData.length ; i++){
    list.push(<li key={getData[i] + i} onClick={this.check_todo}><span onClick={this.chk_todo_childEle} className="todo_txt">{getData[i].todo}</span>
    <span onClick={this.chk_todo_childEle} className="date_txt">{getData[i].date}</span></li>)
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
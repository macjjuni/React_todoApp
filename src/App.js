import React, { Component } from 'react';
import Todo_List from "./components/Todo_List";
import Todo_Add from "./components/Todo_Add";
import './App.css';


class App extends Component{		

  constructor(props){
    super(props);
    this.state = {
      todo_list:[
      /*  {
          todo : '씻기',
          date : '2021/04/30 - 13:11',
          done : 0
        },
        {
          todo : '책 읽기',
          date : '2021/04/21 - 15:47',
          done : 0
        },
        {
          todo : '운동하기',
          date : '2021/04/19 - 07:24',
          done : 0
        },
        {
          todo : '낮잠자기',
          date : '2021/04/16 - 01:49',
          done : 0
        }                                   */
      ]
    }    
    this.insert_todo = this.insert_todo.bind(this);
    this.delete_todo = this.delete_todo.bind(this);
    this.done_todo = this.done_todo.bind(this); 
	this.update_todo = this.update_todo.bind(this);
  }

  insert_todo(todo) { //todo 추가
    
    const time = new Date()
    const year = time.getFullYear();
    const month = (time.getMonth()+1).toString.length === 1 ? ('0' + (time.getMonth()+1)) : (time.getMonth()+1);
    const date =  time.getDate().toString.length === 1 ? ('0' + time.getDate()) : (time.getMonth()+1);
    const todo_Date = year + '/' + month + '/' + date + ' ' + time.getHours() + ':' + time.getMinutes();
    
    const _todo = {todo : todo, date : todo_Date, done : 0};
    let _temp = [...this.state.todo_list];
    _temp.push(_todo);  

    this.setState({
      todo_list : [..._temp]
    })
  }

  delete_todo(todo_index){ //todo 삭제
    
    let _temp = [...this.state.todo_list];
    _temp.splice(todo_index, 1);

      this.setState({
        todo_list : [..._temp]
      })
  }

  done_todo(todo_index){
    
    let _temp = [...this.state.todo_list];

    if(_temp[todo_index].done === 0){
      _temp[todo_index].done = 1;
    }else{
      _temp[todo_index].done = 0;
    }

    this.setState({
      todo_list : [..._temp]
    })

  }
		
  update_todo(todo_index, txt){
	  
	  let _temp = [...this.state.todo_list];
		
	  _temp[todo_index].todo = txt; 
	  this.setState({
        todo_list : [..._temp]
      })	  
	  
  }

  render(){

    return(
      <main>
			<Todo_Add onSubmit={this.insert_todo}></Todo_Add>
			<Todo_List todo={this.state.todo_list} del_todo={this.delete_todo} done_todo={this.done_todo} update_todo={this.update_todo}></Todo_List>
      </main>
    );
  }
}

export default App; 
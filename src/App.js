import React, { Component } from 'react';
import Todo_List from "./components/Todo_List";
import Todo_Add from "./components/Todo_Add";
import './App.css';


class App extends Component{		

  constructor(props){
    super(props);
    if(localStorage.key(0)){ //LocalStorage 데이터 유무 확인
      const _temp = JSON.parse(localStorage.getItem(localStorage.key(0)));

      this.state = {
        todo_list:[ ..._temp]
      }
    }else{ //LocalStorage 데이터 없을 때
      this.state = {
        todo_list:[                  
        /*{
            todo : '씻기',
            date : '2021/04/30 - 13:11',
            done : 0
          },
          {
            todo : '책 읽기',
            date : '2021/04/21 - 15:47',
            done : 0
          }*/                      
        ]
      }
    }

    this.insert_todo = this.insert_todo.bind(this);
    this.delete_todo = this.delete_todo.bind(this);
    this.done_todo = this.done_todo.bind(this); 
    this.update_todo = this.update_todo.bind(this);
    
  }


    // 리렌더링 후에 실행됨. 최초 렌더링시에는 실행X
    // 이전 props를 비교하여 네트워크 요청을 보내는 작업에 적절한 위치
    componentDidUpdate(preveProps, prevState){
      
      if(preveProps !== prevState){
        localStorage.setItem('todo', JSON.stringify(this.state.todo_list));
      }
      
  }

  insert_todo(todo) { //todo 추가

    const time = new Date() //날짜 시간 구하기
    const year = time.getFullYear();
    const month = (time.getMonth()+1).toString.length === 1 ? ('0' + (time.getMonth()+1)) : (time.getMonth()+1);
    const date =  time.getDate();
    const todo_Date = year + '-' + month + '-' + date + ' / ' + time.getHours() + ':' + time.getMinutes();
    const _todo = {todo : todo, date : todo_Date, done : 0};

    const _temp = this.state.todo_list.concat();
    _temp.push(_todo);  

    this.setState({
      todo_list : [..._temp]
    })
  }

  delete_todo(todo_index){ //todo 삭제
    
    const _temp = this.state.todo_list.concat();
    
    _temp.splice(todo_index, 1);

      this.setState({
        todo_list : [..._temp]
      })

      localStorage.setItem('todo', JSON.stringify(_temp));
  }

  done_todo(todo_index){ // todo 완료 처리
    
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
		
  update_todo(todo_index, txt){  // todo 내용 업데이트

    const _temp = this.state.todo_list.concat();
		
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
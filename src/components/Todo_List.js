import React, { Component } from 'react';


class Todo_List extends Component{

    constructor(props){
        super(props);

        this.show_btn = this.show_btn.bind(this);
        this.hide_btn = this.hide_btn.bind(this);
        this.del_todo = this.del_todo.bind(this);
    }

    check_todo = e =>{

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
    
    chk_todo_childEle = e =>{
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

    show_btn = e =>{
        const list = e.target.parentNode; 
        const len = list.childElementCount;

        for(let i = 0 ; i<len ; i++){
            list.children[i].classList.remove('show')
        }
        e.target.classList.add('show');
    }

    hide_btn = e =>{
        e.target.classList.remove('show');        
    }

    del_todo = e =>{

        const _target = e.target;
        const len = _target.parentNode.parentNode.childElementCount;
        
        for(let i=0 ; i<len ; i++){
            if(_target.parentNode.parentNode.children[i].children[0].textContent ===
                _target.parentNode.children[0].textContent){
         
                    this.props.del_todo(i) // 부모 컴포넌트에게 지울 todo의 index값 전송 
                    
                }
        }
    }
    
    render(){
        
        let list = [];
        let getData = this.props.todo;

        for(let i=0 ; i < getData.length ; i++){
        
            list.push(
                <li key={i} ref={this.list_li} onClick={this.check_todo} onMouseEnter={this.show_btn} onMouseLeave={this.hide_btn}>
                    <span onClick={this.chk_todo_childEle} className="todo_txt">{getData[i].todo}</span>
                    <span onClick={this.chk_todo_childEle} className="date_txt">{getData[i].date}</span>
                    <span className="rename_btn"></span>
                    <span className="delete_btn" onClick={this.del_todo}></span>
                </li>
            )

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

export default Todo_List;
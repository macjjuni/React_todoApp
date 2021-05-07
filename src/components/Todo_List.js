import React, { Component } from 'react';


class Todo_List extends Component{

    constructor(props){
        super(props);

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

    del_todo = e =>{

        const _target = e.target;
        const len = _target.parentNode.parentNode.childElementCount;

        for(let l=0 ; l<len ; l++){
            if(_target.parentNode.parentNode.children[l] ===
                _target.parentNode){

                   this.props.del_todo(l) // 부모 컴포넌트에게 지울 todo의 index값 전송 
                    
                }
        }
    }

    done_todo = e =>{
        
        const _target = e.target;
        const len = _target.parentNode.childElementCount;

        if( _target.tagName === 'LI'){
        
            for(let k=0 ; k<len ; k++){
                if(_target.parentNode.children[k] ===
                    _target){
    
                       this.props.done_todo(k) // 부모 컴포넌트에게 지울 todo의 index값 전송 
                        
                    }
            }
        }    
    }
    
    render(){
        
        let list = [];
        let getData = this.props.todo;

        for(let i=0 ; i < getData.length ; i++){
           
            const done = getData[i].done === 1 ? 'done' : '';
            
            list.push(
                <li key={i} ref={this.list_li} onClick={this.done_todo} className={done}>
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
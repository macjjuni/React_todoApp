import React, { Component } from 'react';


class Todo_List extends Component{
	 constructor(props){
        super(props)
        this.state = {
            class : '',
			index : 0,
			txt : ''
        }

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
	
	edit_todo = e =>{
		
		const _target = e.target.parentNode;
		const len = _target.parentNode.childElementCount;
		//텍스트박스 표시

        for(let m = 0 ; m < len ; m++){ //클릭한 todo를 제외한 나머지 수정상태 제거
			if(_target.parentNode.children[m] ===
				_target){

				this.setState({
					index : m
				})
				_target.children[0].value = this.props.todo[m].todo;

			}else{
                _target.parentNode.children[m].classList.remove('edit');
            }
		}

        if( !_target.classList.contains('edit')){ //수정상태가 아닐때

			this.setState({
				class : _target.className
			})
            _target.classList.add('edit');			
		
		}else{
				if(this.state.txt !== ''){ //내용 변경이 안됬을때 구분해서 todo 업데이트 실행x

					this.props.update_todo(this.state.index, this.state.txt);
					this.setState({
					txt : ''
				})
			}
			_target.classList.remove('edit')
			_target.children[0].value = '';
		}
		
		
		
		
			// <li>태그 클래스 변경
		

	}
	
	edit_onChange = e =>{ 
        this.setState({txt : e.target.value})
    }
	
	enter_keydown = e =>{
		if(e.keyCode === 13){

            if(this.state.txt !== ''){ //내용 변경이 안됬을때 구분해서 todo 업데이트 실행x
			    
                this.props.update_todo(this.state.index, this.state.txt);
            
            }
			e.target.parentNode.classList.replace('edit', this.state.class);
		}
	}
    
    render(){
        
        let list = [];
        let getData = this.props.todo;

        for(let i=0 ; i < getData.length ; i++){

            const done = getData[i].done === 1 ? 'done' : 'ing';
            
            list.push(
                <li key={i} ref={this.list_li} onClick={this.done_todo} className={done}>
					<input type="text" className={'edit_txt'} onChange={this.edit_onChange}  onKeyDown={this.enter_keydown}/>
                    <span onClick={this.chk_todo_childEle} className="todo_txt">{getData[i].todo}</span>
                    <span onClick={this.chk_todo_childEle} className="date_txt">{getData[i].date}</span>
                    <span className="edit_btn" onClick={this.edit_todo}></span>
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
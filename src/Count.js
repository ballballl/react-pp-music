import React from 'react';
import TodoList from './TodoList'
import{addAction , changeAction, delAction} from './Store/actionCreator'
import {connect} from 'react-redux'
import {getSearchHot} from './request'
const Count = (props)=>{
        return (
            <TodoList
                inputValue = {props.inputValue}
                data = {props.data}
                changeInput = {props.changeInput}
                addCount = {props.addCount}
                deleteItem = {props.deleteItem}
                />
        )
    
}


const stateToProps = (state)=>{
    return{
        inputValue: state.inputValue,
        data: state.data
    }
}

const dispatchToProps = (dispatch)=>{
    return{
        deleteItem(idx){
            console.log(idx);
            let action =  delAction(idx)
            dispatch(action)
        },
        changeInput(e){
            let action = changeAction(e.target.value);
            dispatch(action);
        },
        addCount(){
            getSearchHot().then(res=>{
                console.log(res);
            })
            dispatch(addAction());
        }

    }
}
 
export default connect(stateToProps, dispatchToProps)(Count);
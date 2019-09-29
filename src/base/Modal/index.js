import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {CSSTransition} from 'react-transition-group'
import './index.scss'
const Modal = forwardRef((props,ref)=>{
    const {confirmFunc,title,confirmText,cancelText} = props
    const [show, setShow] = useState(false)
    useImperativeHandle(ref,()=>({
        showConfirm(){
            setShow(true)
        }
    }))
    return (
        <CSSTransition
            in={show}
            classNames='modal'
            timeout={350}
            mountOnEnter
        >
            <div className='modal-mask'>
                <div className='modal-con'>
                    <p className='title-text'>{title}</p>
                    <div className='cancel-text' onClick={()=>{setShow(false)}}>{cancelText}</div>
                    <div className='confirm-text' onClick={()=>{setShow(false);confirmFunc()}} >{confirmText}</div>
                </div>
            </div>
            
        </CSSTransition>
    )
})

Modal.defaultProps={
    confirmText:'确定',
    cancelText: '取消',
    confirmFunc:()=>{},
}

export default Modal
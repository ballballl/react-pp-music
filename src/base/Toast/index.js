import React ,{forwardRef,useEffect, useState, useImperativeHandle} from 'react';
import { CSSTransition } from "react-transition-group";
import './index.scss'

const Toast = forwardRef((props,ref)=>{
    const {toastText} = props
    const [show, setShow] = useState(false)
    const [timer, setTimer] = useState(null)
    useImperativeHandle(ref,()=>({
        show(){
            if(timer)clearTimeout(timer)
            setShow(true)
            setTimer(setTimeout(()=>{
                setShow(false)
            },1500))
        }
    }))
    
    return(
        <CSSTransition
            in={show}
            classNames='toast'
            timeout={350}
            mountOnEnter

        >
            <div className='toast-con'>
                <div className='toast-text'>{toastText}</div>
            </div>
        </CSSTransition>
    )
})

export default Toast
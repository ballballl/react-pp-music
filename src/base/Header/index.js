import React, {useEffect,useRef, forwardRef, useImperativeHandle} from 'react';
import Icon from '@base/Icon/index'
import './index.scss'
const Header =forwardRef((props, ref)=>{
    const titleRef = useRef()
    const funcRef = useRef()
    useEffect(()=>{
        let titleWidth = titleRef.current.clientWidth
        let titleConWidth = titleRef.current.parentNode.clientWidth
        
        if(titleWidth>titleConWidth*1.05){
            titleRef.current.style['animation'] = `cycle ${titleWidth/titleConWidth*6}s linear infinite`
        }
        
    },[props.title])

    useImperativeHandle(ref,()=>({
        titleOpacity(value){
            titleRef.current.style['opacity'] = value
        },
        funcTitleOpacity(value){
            funcRef.current.style['opacity'] = value
        }
    }))

    return (
        <div className={'header-con'} ref={ref}>
            <div className={'back-btn'} onClick={props.backFunc}>
                <Icon type='left' size='25' color='#fff' />
            </div>
            <div className={'title-con'}>
                <p ref={funcRef} className={'func-text'}  >{props.func}</p>
                <p ref={titleRef} className={'title-text'} >{props.title}</p>
            </div>
        </div>
    )
})

export default Header
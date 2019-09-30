import React, {useEffect,useRef, forwardRef, useImperativeHandle} from 'react';
import Icon from '@base/Icon/index'
import RollingText from '@base/RollingText/index'
import './index.scss'
const Header =forwardRef((props, ref)=>{
    const titleRef = useRef()
    const funcRef = useRef()

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
                <div ref={funcRef} className={'func-text'}  >{props.func}</div>
                <div ref={titleRef} className={'title-text'} >
                    <RollingText text={props.title}/>
                </div>
            </div>
        </div>
    )
})

export default Header
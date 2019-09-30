import React,{useEffect, useRef} from 'react'
import './index.scss'
const RollingText = (props) => {
    const {text,size} = props
    const conRef = useRef()
    const textRef = useRef()
    useEffect(()=>{
        let textWidth = textRef.current.clientWidth
        let conWidth = conRef.current.clientWidth
        
        if(textWidth>conWidth*1.02){
            textRef.current.style['animation'] = `rollingText ${(textWidth/conWidth-0.5)*8}s linear infinite`
        }else{
            textRef.current.style['animation'] = ''
            textRef.current.style['transform'] = 'translate3d(0,0,0)'
            
        }
    },[text])
    return ( 
        <div className='rolling-con' ref={conRef} style={{fontSize:`${size/37.5}rem`}} >
            <div className='rolling-text' ref={textRef}>{text}</div>
        </div>
    )
}
 
export default RollingText
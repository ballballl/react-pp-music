import React, {useState,useRef, useEffect, forwardRef, useImperativeHandle} from 'react';
import './index.scss'
 const Progress = forwardRef((props,ref)=>{
    const { onProgressChange, onProgressChangeEnd,songPercent } = props
    const totalRef = useRef()
    const lengthRef = useRef()
    const [isPressed,setIsPressed] = useState(false)
    const [clickX,setClickX] = useState(0)
    const [clickLength,setClickLength] = useState(0)
    const [totalLength,setTotalLength] = useState(0)
    useImperativeHandle(ref,()=>({
        setProgress(percent){
            if(isPressed) return
            lengthRef.current.style['width'] = percent+'%';
            onProgressChange(percent)
        }
    }))

    useEffect(()=>{
        setTotalLength(totalRef.current.clientWidth)
    },[])

    // useEffect(()=>{
    //     if(isPressed) return
    //     lengthRef.current.style['width'] = songPercent+'%';
    //     onProgressChange(songPercent)
    // },[songPercent])

    const handleClick = (e)=>{
        // console.log(totalRef.current.offsetLeft,e.pageX)
        let percent = (e.pageX - totalRef.current.offsetLeft)/totalLength*100
        lengthRef.current.style['width'] = percent+'%';
        onProgressChangeEnd(percent)
    }

    const handleMoveStart = (e)=>{
        setClickLength(lengthRef.current.clientWidth)
        setClickX(e.touches[0].pageX)
        setIsPressed(true)
    }
    const handleMove = (e)=>{
        if(!isPressed)return;
        let moveLength = e.touches[0].pageX - clickX
        let percent = (clickLength+moveLength)/totalLength*100
        percent = percent<=100 ? percent: 100 
        lengthRef.current.style['width'] = percent+'%';
        onProgressChange(percent)
    }
    const handleMoveEnd =(e)=>{
        let percent = lengthRef.current.clientWidth/totalLength*100
        percent = percent<=100 ? percent: 100 
        onProgressChangeEnd(percent)
        setIsPressed(false)
    }
    
    
    return(
        <div className={`progress-con ${isPressed?'pressed':''}`} ref={totalRef} onClick={handleClick}>
            <div className='progress-length'ref={lengthRef} >
                <div className='progress-dot' 
                     onTouchStart={handleMoveStart} 
                     onTouchEnd={handleMoveEnd} 
                     onTouchMove={handleMove}
                     >
                </div>
            </div>
        </div>
    )
 })

 export default Progress
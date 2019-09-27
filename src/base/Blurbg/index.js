import React, {useState, useEffect,useRef, forwardRef, useImperativeHandle} from 'react';
import './index.scss'

const Blurbg = forwardRef((props, ref)=>{
    const bgRef = useRef()
    const [conHeight, setConHeight] = useState(0)
    // let conHeight = 0

    useEffect(()=>{
        setConHeight(bgRef.current.clientHeight)
        // conHeight = bgRef.current.clientHeight
        // console.log(conHeight)
    },[])

    useImperativeHandle(ref,()=>({
        scaleBg(part){
            let percent = part/conHeight
            bgRef.current.style['transform'] = `translate3d(0,0,0) scale(${1+percent})`
            bgRef.current.style['clip-path'] = `inset(0 0  0 0)`
            bgRef.current.style['height'] = `${conHeight}px`

        },
        cutHeight(part){
            let cut = conHeight-part
            if(cut<=55) cut=55
            // if(cut==55)return
            bgRef.current.style['height'] = `${cut}px`
            // let percent = part/conHeight
            // bgRef.current.style['clip-path'] = `inset(0 0  ${percent*100}% 0)`

        }
    }))

    return (  
            <div className={'blur-con'} ref={bgRef}>
                <div className={'blur-img'}>
                    <img src={props.bgImg} />
                </div>
            </div>
    )
})

export default Blurbg
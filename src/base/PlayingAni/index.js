import React from 'react';
import './index.scss'
const PlayingAni = (props)=>{
    return(
        <div className={`playing-ani ${props.pause?'pause' : ''}`}>
            <div></div>        
            <div></div>        
            <div></div>        
            <div></div>        
            <div></div>        
        </div>
    )
}

export default PlayingAni
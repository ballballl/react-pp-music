import React from 'react';
import './index.scss'
const Icon = (props)=>{
    const {type, size, color, isCenter} = props
    const cls = 'iconfont icon-'+type
    const ceneterStl={
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    }
    
    let stl = {fontSize:(size/37.5)+'rem'}

    if(isCenter){
        stl = {...stl,...ceneterStl}
    }

    if(size<12){
        var scale = size/12;
        stl.transform+=' scale('+scale+')'
    }

    if(color) {stl.color = color}
    
    return (
        <i className={cls} style={stl}>
            {props.children}
        </i>
    )
}

export default Icon
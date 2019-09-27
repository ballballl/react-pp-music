import React from 'react';
import Icon from '../Icon/index'
import Imgplaceholder from '../Imgplaceholder/index'
import LazyLoad from 'react-lazyload'
import {addUnit} from '@src/utils'
import './index.scss'
const Card = (props)=>{
    const {imgUrl,isSong,isCollection,listenCount,title,subTitle,width,height,placeHolder,...restProps} = props
    const conStl = {width:width/37.5+'rem',height:height/37.5+'rem'}
    const titleStl = {maxWidth:width/37.5+'rem'}
    
    return (
        <>
            <div className="card-con" style={conStl}>
                <LazyLoad placeholder={<div style={{width:'100%',height:'100%',background:'#999',borderRadius:'0.2rem'}}></div>}>
                     {placeHolder ? <Imgplaceholder imgUrl={imgUrl}  {...restProps}/> :  <img src={imgUrl}/>} 
                </LazyLoad>
                {listenCount && 
                    <div className="listen-count">
                        <Icon type="headphones" size="10" color="#f3f3f3">
                            {addUnit(listenCount)}
                        </Icon>
                    </div>
                    
                }
                {isSong && 
                    <div className="song-tag">
                        <Icon type="play-btn" size="25" color="#f3f3f3" isCenter={true}>
                        </Icon>
                    </div>
                }
                {isCollection && 
                    <div className="collection-tag">
                        <Icon type="play-btn" size="15" color="#f3f3f3" isCenter={true}>
                        </Icon>
                    </div>
                }
            </div>
            {title && 
                <p className="title" style={titleStl}>{title}</p>
            }
            {subTitle && 
                <p className="sub-title" style={titleStl}>{subTitle}</p>
            }
        </>
    )
}
Card.defaultProps={
    imgUrl:'',
    isSong:false,
    isCollection:false,
    listenCount:0,
    title:'',
    subTitle:'',
    width: '100px',
    height: '100px',
    type:'music',
    placeHolder: true
}
export default Card
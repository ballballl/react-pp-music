import React, {useState}from 'react';
import Icon from '../Icon/index'
import './index.scss'
const Imgplaceholder = (props)=>{
    const {imgUrl, type} = props
    const [loaded,setLoaded] = useState(false)
    return (
        <>   
            {
                !loaded && <div className={"img-placeholder"}><Icon type={type} size={35} isCenter={true} color={'#fff'} /></div>
            }
            <img  className={"real-img"} style={{opacity:(loaded?1:0)}} src={imgUrl} key={imgUrl} alt={type} onLoad={()=>{setLoaded(true)}} />
        </>
    )
}
Imgplaceholder.defaultProps={
    type:'music'
}
export default Imgplaceholder


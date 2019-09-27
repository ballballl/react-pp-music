import React,{useState,useEffect} from 'react';
import "swiper/dist/css/swiper.css";
import Imgplaceholder from '@base/Imgplaceholder/index'
import Swiper from "swiper";
import './index.scss'

const Slider = (props)=>{
    const [swiper, setSwiper] =useState(null)
    const {banners} = props
    
    useEffect(()=>{
        if(banners.length && !swiper){
            let swiper = new Swiper(".swiper-con", {
                loop: true,
                autoplay: true,
                autoplayDisableOnInteraction: false,
                pagination: {el:'.swiper-pagination'},
              })
            swiper = setSwiper(swiper)
        }
    },[banners.length, swiper])
    return (
        <div className="slider-con">
            <div className="swiper-con">
                <div className="swiper-wrapper">
                {
                    banners.map(banner => {
                        return (
                            <div className="swiper-slide" key={banner.imageUrl} >
                                <div className="banner-cell">
                                    <Imgplaceholder imgUrl={banner.imageUrl} />
                                    {/* <img src={banner.imageUrl} alt={'music'}/> */}
                                </div>
                            </div>
                        );
                    })
                }
                </div>
                <div className="swiper-pagination"></div>
            </div> 
        </div>
        
    )
}

export default Slider
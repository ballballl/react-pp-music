import React from 'react';
import { renderRoutes } from "react-router-config";
import './layout.scss'
import Icon from '@base/Icon/index'
import Skinswitcher from '@component/Skinswitcher'
import {Link} from 'react-router-dom'
import Player from '@component/Player'
const Indexheader= (props)=>{
    return(
        <div className="header">
            <div className="brand">
                <p>{props.title}</p>
            </div>
            <div className="search-con">
                <div className="search">
                    <Icon type="search" size="14"></Icon>
                    搜索
                    <Link to=""></Link>
                </div>
            </div>
            <Skinswitcher/>
        </div>
    )
}

const Layout = (props)=>{
    // console.log(props.location.pathname)
    return(
        <div className="layout" style={{visibility:props.location.pathname!='/recommend'?'hidden':'visible'}} >
            <Indexheader title="音乐馆" />
            { renderRoutes(props.route.routes) }
            <Player/>
        </div>
    )
}

export default Layout

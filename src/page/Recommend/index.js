import React,{useEffect} from 'react'
import { renderRoutes } from "react-router-config";
import {createPortal} from 'react-dom'
import Slider from '@component/Slider/index'
import Scroller from '@base/Scroller/index'
import Card from '@base/Card/index'
import { connect } from "react-redux"
import { getBannersAction, getSongListAction, getNewAlbumsAction, getNewSongsAction,getMvListAction} from './store/actionCreator'
import Icon from '@base/Icon/index'
import { forceCheck } from 'react-lazyload';
import './index.scss'


const Blocktitle = (props)=>{
    const {title, moreFunc} = props
    return (
        <div className="title-con">
            <p className="title-text">{title}</p>
            <p>更多<Icon type="right" size="10"/></p>
        </div>
    )
}

const Recommend = (props)=>{
    const { getBannersDispatch, getSongListDispatch,getNewAlbumsDispatch, getNewSongsDispatch,getMvListDispatch} = props
    const { banners, isUpLoading, songList, newAlbums, newSongs,mvList} = props


    useEffect(()=>{
        getBannersDispatch()
        getSongListDispatch()
        getNewAlbumsDispatch()
        getNewSongsDispatch()
        getMvListDispatch()
    },[])

    return(
        <div className="recommend-con">
            <Scroller direction="vertical" refresh={true} scrollFunc={()=>{forceCheck()}}>
                <Slider banners={banners}/>
                <Blocktitle title={'推荐歌单'} />
                <div className="recommend-list">
                    <Scroller direction="horizental" refresh={true}>
                            {songList.map((song,idx)=>{
                                if(idx<6){
                                    
                                    return(
                                        <div className="list-cell" key={song.id}>
                                            <Card 
                                                imgUrl={song.picUrl} 
                                                listenCount={song.playCount} 
                                                isCollection={true} 
                                                title={song.name}
                                            />
                                        </div>
                                    )
                                }
                            })}
                    </Scroller>
                </div>
                <Blocktitle title={'最新专辑'} />
                <div className="recommend-list">
                    <Scroller direction="horizental" refresh={true} >
                            {newAlbums.map((album,idx)=>{
                                if(idx<6){
                                    return(
                                        <div className="list-cell" key={album.id}>
                                            <Card 
                                                imgUrl={album.picUrl}  
                                                isCollection={true} 
                                                title={album.name}
                                                subTitle={album.artist.name}
                                            />
                                        </div>
                                    )
                                }
                            })}
                    </Scroller>
                </div>
                <Blocktitle title={'最新歌曲'} />
                <div className="recommend-list">
                    <Scroller direction="horizental" refresh={true} >
                            {newSongs.map((song,idx)=>{
                                if(idx<6){
                                    return(
                                        <div className="list-cell" key={song.id}>
                                            <Card 
                                                imgUrl={song.song.album.picUrl}  
                                                isSong={true} 
                                                title={song.name}
                                                subTitle={song.song.artists[0].name}
                                            />
                                        </div>
                                    )
                                }
                            })}
                    </Scroller>
                </div>

                <Blocktitle title={'精选视频'} />
                <div className="recommend-list">
                    <Scroller direction="horizental" refresh={true} >
                            {mvList.map((mv)=>{
                                
                                    return(
                                        <div className="list-cell" key={mv.id}>
                                            <Card 
                                                imgUrl={mv.picUrl}  
                                                isSong={true} 
                                                title={mv.name}
                                                subTitle={mv.artistName}
                                                listenCount={mv.playCount}
                                                width={'178'}
                                                type={'mv'}
                                            />
                                        </div>
                                    )    
                            })}
                    </Scroller>
                </div>
            </Scroller>
            {createPortal(
                <div>
                    { renderRoutes(props.route.routes) }
                </div>, 
                document.getElementById('root')
            )}
           
        </div>
    )
}

const stateToProps=({recommend})=>({
    banners:recommend.banners,
    isUpLoading:recommend.isUpLoading,
    songList: recommend.songList,
    newAlbums: recommend.newAlbums,
    newSongs: recommend.newSongs,
    mvList: recommend.mvList,
})

const dispatchToProps=(dispatch)=>{
    return{
        getBannersDispatch : ()=>{
            dispatch(getBannersAction())
        },
        getSongListDispatch: ()=>{
            dispatch( getSongListAction())
        },
        getNewAlbumsDispatch: ()=>{
            dispatch( getNewAlbumsAction())
        },
        getNewSongsDispatch: ()=>{
            dispatch(getNewSongsAction())
        },
        getMvListDispatch: ()=>{
            dispatch(getMvListAction())
        }
    }
    
}

export default connect(stateToProps,dispatchToProps)(Recommend)
import React, {useState,useEffect,useRef,}from 'react';
import { renderRoutes } from "react-router-config";
import {createPortal} from 'react-dom'
import './index.scss'
import Scroller from '@base/Scroller/index'
import Card from '@base/Card/index'
import {getSongListAction, updateCollectionAction,} from './store/actionCreator'
import {updateListDetailAction,} from '../Listdetail/store/actionCreator'
import InfiniteScroll from 'react-infinite-scroller';

import { forceCheck } from 'react-lazyload';
import {connect} from 'react-redux'

const categorylist = [
    "全部",
    "欧美",
    "华语",
    "流行",
    "说唱",
    "摇滚",
    "民谣",
    "电子",
    "轻音乐",
    "影视原声",
    "ACG",
    "怀旧",
    "治愈",
    "旅行"
  ]
const Collection = (props)=>{
    const {getSongListDispatch, updatePageDispatch, updateListDetailDispatch}= props
    const {songLists, page, isLoading, isUploading} = props
    const [cat,setCat] = useState('全部')
    Collection.scrollerRef = useRef()

    useEffect(()=>{
        // Collection.scrollerRef.current.refresh()
        updatePageDispatch(0)
        getSongListDispatch(cat)
    },[cat])
    return (
        <div className={'collection-con'}>
            <div className={'cats-con'}>
                <Scroller direction="horizental" refresh={true}>
                    {categorylist.map((cat,idx)=>{
                        return (<span className={'cat-cell'} key={cat+idx} onClick={()=>{setCat(cat);console.log(cat)}}>{cat}</span>)
                    })}
                </Scroller>
            </div>
            <div className={'song-list-con'}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={()=>{getSongListDispatch(cat)}}
                    hasMore={true}
                    loader={<div key={0}>Loading ...</div>}
                    getScrollParent={forceCheck}
                    useWindow={false}
                >
                    {songLists.map((songList)=>{
                                
                                let playCount = songList.playCount
                                if(playCount>100000000){
                                    playCount = (playCount/100000000).toFixed(1)+'亿'
                                }else if(playCount>10000){
                                    playCount = (playCount/10000).toFixed(1)+'万'
                                }
                                return(
                                    <div 
                                        className="list-cell" 
                                        key={songList.id} 
                                        onClick={()=>{
                                            updateListDetailDispatch(songList)
                                            props.history.push(`/recommend/collection/${songList.id}`)
                                        }}
                                    >
                                        <Card 
                                            imgUrl={songList.coverImgUrl} 
                                            listenCount={playCount} 
                                            isCollection={true} 
                                            title={songList.name}
                                        />
                                    </div>
                                )   
                        })}
                </InfiniteScroll>

                {/* <Scroller 
                    ref={Collection.scrollerRef}
                    direction="vertical" 
                    refresh={true}  
                    scrollFunc={()=>{forceCheck()}} 
                    pullUpFunc={()=>{getSongListDispatch(cat)}}  
                    isDownLoading={isLoading}
                    isUpLoading = {isUploading}
                    >
                            {songLists.map((songList)=>{
                                
                                    let playCount = songList.playCount
                                    if(playCount>100000000){
                                        playCount = (playCount/100000000).toFixed(1)+'亿'
                                    }else if(playCount>10000){
                                        playCount = (playCount/10000).toFixed(1)+'万'
                                    }
                                    return(
                                        <div 
                                            className="list-cell" 
                                            key={songList.id} 
                                            onClick={()=>{
                                                updateListDetailDispatch(songList)
                                                props.history.push(`/recommend/collection/${songList.id}`)
                                            }}
                                        >
                                            <Card 
                                                imgUrl={songList.coverImgUrl} 
                                                listenCount={playCount} 
                                                isCollection={true} 
                                                title={songList.name}
                                            />
                                        </div>
                                    )   
                            })}
                </Scroller> */}
            </div>
            {createPortal(
                <div>
                    { renderRoutes(props.route.routes) }
                </div>, 
                document.body
            )}
        </div>
    )
}
const stateToProps=({collection})=>({
    songLists: collection.songLists,
    isLoading: collection.isLoading,
    isUploading: collection.isUploading,
    page: collection.page
})

const dispatchToProps=(dispatch)=>({
    getSongListDispatch(cat){
        dispatch(getSongListAction(cat))
    },
    updatePageDispatch(page){
        dispatch(updateCollectionAction(page,'page'))
    },
    // 更新歌单详情的state
    updateListDetailDispatch(songList){
        dispatch(updateListDetailAction(songList,'listDetail'))
    }
})
export default connect(stateToProps,dispatchToProps)(Collection)
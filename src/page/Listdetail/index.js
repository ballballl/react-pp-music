import React, { useState, useEffect,useRef, forwardRef, useImperativeHandle} from 'react';
import Header from '@base/Header/index'
import Blurbg from '@base/Blurbg/index'
import Icon from '@base/Icon/index'
import Card from '@base/Card/index'
import {connect} from 'react-redux'
import {getListDetailAction,updateListDetailAction} from './store/actionCreator'
import {updatePlayerAction} from '@component/Player/store/actionCreator'
import Scroller from '@base/Scroller/index'
import {addUnit} from '@src/utils'
import './index.scss'


const Listdetail = (props)=>{
    const [page, setPage] = useState(null)
    const [renderList,setRenderList] = useState([])
    const {listDetail,match:{params:{id:listId}},tracks,currentSong} = props
    const {getListDetailDispatch,updateTracksDispatch,playSongDispatch} = props
    const blurRef = useRef()
    const headerRef = useRef()
    const infoRef = useRef()
    const limit = 50
    let renderFinish = false
    useEffect(()=>{
        getListDetailDispatch(listId)
        return ()=>{
            updateTracksDispatch([])
        }
    },[])
    useEffect(()=>{
        if(tracks.length>0){
            setPage(0)
        }  
    },[tracks])

    useEffect(()=>{
        if(renderList.length==tracks.length || page==null)return
        let start = limit*page
        let end = limit*(page+1)<tracks.length? limit*(page+1) : tracks.length
        if(end == tracks.length) renderFinish=true
        setRenderList([...renderList,...tracks.slice(start,end)]) 
    },[page])

    const scrollHandler = (pos)=>{
        let y = pos.y
        if(y>=0){
            blurRef.current.scaleBg(pos.y)
        }else{

            if(y>-30){
                headerRef.current.funcTitleOpacity('1')
                infoRef.current.style['opacity'] = '1'

            }else if(y>-70){
                headerRef.current.funcTitleOpacity('0')
                infoRef.current.style['opacity'] = '0'
            }

            if(y>-120){
                headerRef.current.titleOpacity('0')
            }else if(y>-160){
                headerRef.current.titleOpacity('1')
            }

            if(y>-300){
                infoRef.current.style['transform'] = `translate3d(0,${pos.y}px,0)`
            }
            blurRef.current.cutHeight(-pos.y)
        }
    }
    const listContent = (list)=>{
        return list.map((song,idx)=>{
            return (
                <div className={`song-cell ${(currentSong && currentSong.id==song.id)? 'playing':''}`} key={song.id} onClick={()=>{playSongDispatch(listId,tracks,idx)}}>
                    <p className={'song-idx'}>{idx+1}</p>
                    <div className={'song-info'}>
                        <div className={'song-name'}>{song.name}</div>
                        <div className={'song-artist'}>{song.ar.map((item)=>{return item.name}).join('/')} · {song.al.name}</div>
                    </div>
                </div>
            )
        })
    }
    const makePullUpHandler = ()=>{
        let page = 0
        return ()=>{
            page+=1
            setPage(page)
        }
        
    }
    return(
        <div className={'list-detail-con'}>
            <Header func={'歌单'} title={listDetail.name} backFunc={()=>{props.history.goBack()}} ref={headerRef} />
            <Blurbg bgImg={listDetail.coverImgUrl} ref={blurRef}/>   
            <div ref={infoRef} className={'list-info'}>
                <div className={'cover-img'}>
                    <Card imgUrl={listDetail.coverImgUrl} placeHolder={false} listenCount={listDetail.playCount} />
                </div>
                <div className={'info-con'}>
                    <p className={'list-name'}>{listDetail.name}</p>

                    {listDetail.creator && <p className={'list-creator'}>
                        <img src={listDetail.creator.avatarUrl} />
                        <span>{listDetail.creator.nickname}</span>
                    </p>}
                     <p className={'list-desc'}><span>简介：{listDetail.description}</span><Icon type={'right'} size={15} /></p>
                    
                </div>
                <div className={'list-data'}>
                    <div className={'data-cell'}>
                        <Icon type={'heart'} size={20}/>
                        <span>{addUnit(listDetail.subscribedCount)}</span>
                    </div>
                    <div className={'data-cell'}>
                        <Icon type={'comment'} size={21}/>
                        <span>{addUnit(listDetail.commentCount)}</span>
                    </div>
                    <div className={'data-cell'}  >
                        <Icon type={'share'} size={20}  />
                        <span>分享{page}</span>
                    </div>
                    
                </div>
            </div>
            <Scroller  direction='vertical' scrollFunc={scrollHandler} pullUpFunc={makePullUpHandler()}>   
                <div className={'song-list'} >
                    {listContent(renderList)}
                </div>
            </Scroller>
        </div>
    )
}
const stateToProps = ({listDetail,player})=>{
    return{
        listDetail: listDetail.listDetail,
        coverImg: listDetail.coverImg,
        tracks: listDetail.tracks,
        currentSong: player.currentSong,
    }
}

const dispatchToProps = (dispatch)=>{
    return{
        getListDetailDispatch(id){
            dispatch(getListDetailAction(id))
        },
        updateTracksDispatch(value){
            dispatch(updateListDetailAction(value,'tracks'))
        },
        playSongDispatch(listId,playList,idx){
            dispatch(updatePlayerAction(listId,'listId'))
            dispatch(updatePlayerAction(playList,'playList'))
            dispatch(updatePlayerAction(idx,'currentIndex'))
        }
    }
}

export default connect(stateToProps,dispatchToProps)(Listdetail)

